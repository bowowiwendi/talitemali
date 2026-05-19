import { NextResponse } from "next/server";
import { getPlayer, getPlayerRank } from "@/lib/kv";
import { kv } from "@vercel/kv";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params;
    const player = await getPlayer(name);

    if (!player) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 });
    }

    const [rank, totalPlayers] = await Promise.all([
      getPlayerRank(name),
      kv.zcard("leaderboard"),
    ]);

    return NextResponse.json({
      id: player.id,
      name: player.name,
      scores: player.scores,
      bestRank: rank,
      totalPlayers,
    });
  } catch (error) {
    console.error("GET /api/players/[name] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
