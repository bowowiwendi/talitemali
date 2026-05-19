import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Nama diperlukan" }, { status: 400 });
    }

    const trimmed = name.trim();
    if (!trimmed) {
      return NextResponse.json({ error: "Nama tidak boleh kosong" }, { status: 400 });
    }

    let player = await prisma.player.findUnique({
      where: { name: trimmed },
      include: {
        scores: {
          orderBy: { createdAt: "desc" },
          take: 10,
        },
      },
    });

    if (!player) {
      player = await prisma.player.create({
        data: { name: trimmed },
        include: {
          scores: {
            orderBy: { createdAt: "desc" },
            take: 10,
          },
        },
      });
    }

    const totalPlayers = await prisma.player.count();

    const bestScore = await prisma.score.findFirst({
      where: { playerId: player.id },
      orderBy: { score: "desc" },
    });

    let rank: number | null = null;
    if (bestScore) {
      const betterCount = await prisma.score.groupBy({
        by: ["playerId"],
        _max: { score: true },
        having: {
          score: { _max: { gt: bestScore.score } },
        },
      });
      rank = betterCount.length + 1;
    }

    return NextResponse.json({
      id: player.id,
      name: player.name,
      scores: player.scores.map(s => ({
        id: s.id,
        score: s.score,
        total: s.total,
        createdAt: s.createdAt.toISOString(),
      })),
      rank,
      totalPlayers,
    });
  } catch (error) {
    console.error("POST /api/players error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
