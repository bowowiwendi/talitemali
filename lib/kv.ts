import { kv } from "@vercel/kv";

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

function playerKey(name: string) {
  return `player:${name.toLowerCase()}`;
}

function scoresKey(name: string) {
  return `scores:${name.toLowerCase()}`;
}

export async function getPlayer(name: string): Promise<PlayerData | null> {
  const key = playerKey(name);
  const data = await kv.get<{ name: string; createdAt: string }>(key);
  if (!data) return null;

  const scores = await kv.lrange<ScoreEntry>(scoresKey(name), 0, -1);
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
  await kv.set(key, data);
  return { id: key, ...data, scores: [] };
}

export async function saveScore(
  name: string,
  score: number,
  total: number
): Promise<{ rank: number; totalPlayers: number }> {
  const entry: ScoreEntry = {
    score,
    total,
    createdAt: new Date().toISOString(),
  };

  const player = await getPlayer(name);
  if (!player) {
    await createPlayer(name);
  }

  await kv.lpush(scoresKey(name), entry);
  await kv.ltrim(scoresKey(name), 0, 99);

  const currentBest = (await kv.zscore("leaderboard", name.toLowerCase())) ?? 0;
  if (score > currentBest) {
    await kv.zadd("leaderboard", {
      score,
      member: name.toLowerCase(),
    });
  }

  const totalPlayers = await kv.zcard("leaderboard");
  const rank = (await kv.zrevrank("leaderboard", name.toLowerCase())) ?? 0;

  return { rank: rank + 1, totalPlayers };
}

export async function getLeaderboard(limit: number = 20) {
  const members = await kv.zrange("leaderboard", 0, limit - 1, {
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

    const scores = await kv.lrange<ScoreEntry>(scoresKey(name), 0, 0);
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

export async function getPlayerBestScore(
  name: string
): Promise<number | null> {
  return kv.zscore("leaderboard", name.toLowerCase());
}

export async function getPlayerRank(name: string): Promise<number | null> {
  const rank = await kv.zrevrank("leaderboard", name.toLowerCase());
  return rank !== null ? rank + 1 : null;
}
