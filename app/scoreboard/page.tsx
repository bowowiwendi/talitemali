"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface ScoreEntry {
  name: string;
  score: number;
  total: number;
  createdAt: string;
  rank: number;
}

export default function ScoreboardPage() {
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [playerName, setPlayerName] = useState("");
  const router = useRouter();

  useEffect(() => {
    setPlayerName(localStorage.getItem("playerName") || "");
    fetch("/api/scores?limit=50")
      .then(res => res.json())
      .then(data => setScores(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const getMedal = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return null;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
    });
  };

  return (
    <div className="flex flex-col flex-1 items-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-green-800">Peringkat</h1>
          <p className="text-gray-500 text-sm mt-1">Pramuka Siaga & Penggalang</p>
        </div>

        <button
          onClick={() => router.push("/")}
          className="mb-4 text-sm text-green-600 hover:text-green-700 transition-colors cursor-pointer"
        >
          ← Kembali
        </button>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-400">Memuat peringkat...</p>
          </div>
        ) : scores.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-md border border-green-100">
            <p className="text-gray-400">Belum ada skor tercatat.</p>
            <button
              onClick={() => router.push("/game")}
              className="mt-4 px-6 py-2 bg-green-600 text-white rounded-xl cursor-pointer"
            >
              Mulai Bermain
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {scores.map((entry) => {
              const isMe = entry.name === playerName;
              const medal = getMedal(entry.rank);

              return (
                <div
                  key={`${entry.name}-${entry.createdAt}`}
                  className={`rounded-2xl px-4 py-3 border-2 transition-all ${
                    isMe
                      ? "border-green-500 bg-green-50 shadow-md"
                      : "border-transparent bg-white/80 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 text-center flex-shrink-0">
                      {medal ? (
                        <span className="text-xl">{medal}</span>
                      ) : (
                        <span className="text-sm font-bold text-gray-400">
                          #{entry.rank}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-semibold truncate ${isMe ? "text-green-800" : "text-gray-800"}`}>
                        {entry.name}
                        {isMe && (
                          <span className="ml-2 text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded-full">
            Kamu
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-gray-400">
                        {formatDate(entry.createdAt)}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-lg font-bold text-green-700">
                        {entry.score}
                      </span>
                      <span className="text-sm text-gray-400">
                        /{entry.total}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => router.push("/game")}
            className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Mulai Game Baru
          </button>
        </div>
      </div>
    </div>
  );
}
