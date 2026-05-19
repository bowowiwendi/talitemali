import { NextResponse } from "next/server";
import { getPlayer, createPlayer, getPlayerRank, getTotalPlayers } from "@/lib/kv";

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

    let player = await getPlayer(trimmed);

    if (!player) {
      player = await createPlayer(trimmed);
    }

    const [rank, totalPlayers] = await Promise.all([
      getPlayerRank(trimmed),
      getTotalPlayers(),
    ]);

    return NextResponse.json({
      id: player.id,
      name: player.name,
      scores: player.scores.map(s => ({
        score: s.score,
        total: s.total,
        createdAt: s.createdAt,
      })),
      rank,
      totalPlayers,
    });
  } catch (error) {
    console.error("POST /api/players error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}
