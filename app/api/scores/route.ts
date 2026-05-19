import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, score, total } = await req.json();

    if (!name || typeof score !== "number" || typeof total !== "number") {
      return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
    }

    let player = await prisma.player.findUnique({ where: { name } });
    if (!player) {
      player = await prisma.player.create({ data: { name } });
    }

    await prisma.score.create({
      data: {
        playerId: player.id,
        score,
        total,
      },
    });

    const allScores = await prisma.score.findMany({
      include: { player: true },
      orderBy: [
        { score: "desc" },
        { createdAt: "asc" },
      ],
    });

    const bestPerPlayer = new Map<string, number>();
    allScores.forEach(s => {
      const playerName = s.player.name;
      const current = bestPerPlayer.get(playerName) ?? -1;
      if (s.score > current) {
        bestPerPlayer.set(playerName, s.score);
      }
    });

    const sorted = [...bestPerPlayer.entries()]
      .sort(([, a], [, b]) => b - a);

    const playerBest = bestPerPlayer.get(name) ?? score;
    const rank = sorted.findIndex(([n]) => n === name) + 1;

    return NextResponse.json({
      score,
      total,
      rank,
      totalPlayers: sorted.length,
    });
  } catch (error) {
    console.error("POST /api/scores error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const limit = Math.min(parseInt(url.searchParams.get("limit") || "20"), 100);

    const scores = await prisma.score.findMany({
      include: { player: true },
      orderBy: [
        { score: "desc" },
        { createdAt: "asc" },
      ],
      take: 200,
    });

    const seen = new Set<string>();
    const unique: { name: string; score: number; total: number; createdAt: Date }[] = [];

    for (const s of scores) {
      if (!seen.has(s.player.name)) {
        seen.add(s.player.name);
        unique.push({
          name: s.player.name,
          score: s.score,
          total: s.total,
          createdAt: s.createdAt,
        });
      }
    }

    const result = unique.slice(0, limit).map((entry, i) => ({
      ...entry,
      createdAt: entry.createdAt.toISOString(),
      rank: i + 1,
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("GET /api/scores error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
