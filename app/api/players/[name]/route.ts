import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params;
    const player = await prisma.player.findUnique({
      where: { name },
      include: {
        scores: {
          orderBy: { createdAt: "desc" },
          take: 20,
        },
      },
    });

    if (!player) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 });
    }

    const allScores = await prisma.score.findMany({
      include: { player: true },
      orderBy: { score: "desc" },
    });

    const rankMap = new Map<string, number>();
    allScores.forEach((s, i) => {
      if (!rankMap.has(s.player.name)) {
        rankMap.set(s.player.name, i + 1);
      }
    });

    return NextResponse.json({
      id: player.id,
      name: player.name,
      scores: player.scores.map(s => ({
        id: s.id,
        score: s.score,
        total: s.total,
        createdAt: s.createdAt.toISOString(),
      })),
      bestRank: rankMap.get(player.name) || null,
      totalPlayers: new Set(allScores.map(s => s.player.name)).size,
    });
  } catch (error) {
    console.error("GET /api/players/[name] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
