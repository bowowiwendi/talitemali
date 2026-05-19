export interface ScoreEntry {
  score: number;
  total: number;
  createdAt: string;
}

export interface PlayerData {
  id: string;
  name: string;
  createdAt: string;
  scores: ScoreEntry[];
  rank?: number;
  totalPlayers?: number;
}

const useRemote = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

let vercelKv: import("@vercel/kv").VercelKV | null = null;
if (useRemote) {
  vercelKv = new (require("@vercel/kv").VercelKV)({
    url: process.env.KV_REST_API_URL!,
    token: process.env.KV_REST_API_TOKEN!,
  });
} else {
  console.warn("⚠️  KV_REST_API_URL / KV_REST_API_TOKEN belum di-set. Pakai in-memory (data hilang saat restart).");
}

// --- In-memory fallback ---
const memStore = new Map<string, string>();
const memLists = new Map<string, string[]>();
const memSorted = new Map<string, Map<string, number>>();

async function get<T = unknown>(key: string): Promise<T | null> {
  if (vercelKv) return vercelKv.get(key) as Promise<T | null>;
  const raw = memStore.get(key);
  return raw ? JSON.parse(raw) : null;
}

async function set(key: string, value: unknown) {
  if (vercelKv) return vercelKv.set(key, value);
  memStore.set(key, JSON.stringify(value));
}

async function lpush(key: string, value: unknown) {
  if (vercelKv) return vercelKv.lpush(key, value as any);
  const arr = memLists.get(key) ?? [];
  arr.unshift(JSON.stringify(value));
  memLists.set(key, arr);
  return arr.length;
}

async function ltrim(key: string, start: number, end: number) {
  if (vercelKv) return vercelKv.ltrim(key, start, end);
  const arr = memLists.get(key) ?? [];
  const trimmed = arr.slice(start, end + 1);
  memLists.set(key, trimmed);
}

async function lrange<T>(key: string, start: number, end: number): Promise<T[]> {
  if (vercelKv) return vercelKv.lrange(key, start, end) as Promise<T[]>;
  const arr = memLists.get(key) ?? [];
  const sliced = arr.slice(start, end === -1 ? undefined : end + 1);
  return sliced.map(s => JSON.parse(s));
}

async function zadd(key: string, opts: { score: number; member: string }) {
  if (vercelKv) return vercelKv.zadd(key, opts as any);
  const map = memSorted.get(key) ?? new Map();
  map.set(opts.member, opts.score);
  memSorted.set(key, map);
  return 1;
}

async function zscore(key: string, member: string) {
  if (vercelKv) return vercelKv.zscore(key, member);
  const map = memSorted.get(key);
  return map?.get(member) ?? null;
}

async function zrevrank(key: string, member: string) {
  if (vercelKv) return vercelKv.zrevrank(key, member);
  const map = memSorted.get(key);
  if (!map) return null;
  const sorted = [...map.entries()].sort((a, b) => b[1] - a[1]);
  const idx = sorted.findIndex(([m]) => m === member);
  return idx >= 0 ? idx : null;
}

async function zcard(key: string) {
  if (vercelKv) return vercelKv.zcard(key);
  return memSorted.get(key)?.size ?? 0;
}

async function zrange(key: string, min: number, max: number, opts?: { rev?: boolean; withScores?: boolean }) {
  if (vercelKv) return vercelKv.zrange(key, min, max, opts as any) as Promise<unknown[]>;
  const map = memSorted.get(key);
  if (!map) return [];
  let sorted = [...map.entries()].sort((a, b) => b[1] - a[1]);
  if (opts?.rev) sorted = sorted.reverse();
  const sliced = sorted.slice(min, max + 1);
  if (!opts?.withScores) return sliced.map(([m]) => m);
  return sliced.flatMap(([m, s]) => [m, s]);
}

// --- Public API ---

function playerKey(name: string) {
  return `player:${name.toLowerCase()}`;
}

function scoresKey(name: string) {
  return `scores:${name.toLowerCase()}`;
}

export async function getPlayer(name: string): Promise<PlayerData | null> {
  const key = playerKey(name);
  const data = await get<{ name: string; createdAt: string }>(key);
  if (!data) return null;

  const scores = await lrange<ScoreEntry>(scoresKey(name), 0, -1);
  return {
    id: key,
    name: data.name,
    createdAt: data.createdAt,
    scores: scores.reverse(),
  };
}

export async function createPlayer(name: string): Promise<PlayerData> {
  const key = playerKey(name);
  const data = { name, createdAt: new Date().toISOString() };
  await set(key, data);
  return { id: key, ...data, scores: [] };
}

export async function saveScore(
  name: string,
  score: number,
  total: number
): Promise<{ rank: number; totalPlayers: number }> {
  const entry: ScoreEntry = { score, total, createdAt: new Date().toISOString() };

  const player = await getPlayer(name);
  if (!player) await createPlayer(name);

  await lpush(scoresKey(name), entry);
  await ltrim(scoresKey(name), 0, 99);

  const currentBest = (await zscore("leaderboard", name.toLowerCase())) ?? 0;
  if (score > currentBest) {
    await zadd("leaderboard", { score, member: name.toLowerCase() });
  }

  const totalPlayers = await zcard("leaderboard");
  const rank = (await zrevrank("leaderboard", name.toLowerCase())) ?? 0;

  return { rank: rank + 1, totalPlayers };
}

export async function getLeaderboard(limit: number = 20) {
  const members = await zrange("leaderboard", 0, limit - 1, {
    rev: true,
    withScores: true,
  });

  const result: {
    name: string;
    score: number;
    total: number;
    createdAt: string;
    rank: number;
  }[] = [];

  for (let i = 0; i < members.length; i += 2) {
    const name = members[i] as string;
    const score = members[i + 1] as number;
    const scores = await lrange<ScoreEntry>(scoresKey(name), 0, 0);
    const entry = scores[0];

    result.push({
      name,
      score,
      total: entry?.total ?? 0,
      createdAt: entry?.createdAt ?? new Date().toISOString(),
      rank: i / 2 + 1,
    });
  }

  return result;
}

export async function getPlayerRank(name: string): Promise<number | null> {
  const rank = await zrevrank("leaderboard", name.toLowerCase());
  return rank !== null ? rank + 1 : null;
}

export async function getTotalPlayers(): Promise<number> {
  return zcard("leaderboard");
}
