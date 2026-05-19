import { NextResponse } from "next/server";
import { saveScore, getLeaderboard } from "@/lib/kv";

export async function POST(req: Request) {
  try {
    const { name, score, total } = await req.json();

    if (!name || typeof score !== "number" || typeof total !== "number") {
      return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
    }

    const result = await saveScore(name, score, total);

    return NextResponse.json({
      score,
      total,
      rank: result.rank,
      totalPlayers: result.totalPlayers,
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

    const leaderboard = await getLeaderboard(limit);
    return NextResponse.json(leaderboard);
  } catch (error) {
    console.error("GET /api/scores error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
