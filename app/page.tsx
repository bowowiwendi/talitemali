"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface PlayerData {
  id: number;
  name: string;
  scores: { id: number; score: number; total: number; createdAt: string }[];
  rank?: number;
}

export default function Home() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [player, setPlayer] = useState<PlayerData | null>(null);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("playerName");
    if (saved) setName(saved);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/players", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmed }),
      });

      if (!res.ok) throw new Error("Gagal memuat data");

      const data: PlayerData = await res.json();
      setPlayer(data);
      setSubmitted(true);
      localStorage.setItem("playerName", trimmed);

      if (data.scores.length === 0) {
        router.push("/game");
      }
    } catch {
      setError("Terjadi kesalahan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center px-4 py-8">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
            <span className="text-4xl">🪢</span>
          </div>
          <h1 className="text-3xl font-bold text-green-800">
            Tali Temali
          </h1>
          <p className="text-green-600 mt-1">Pramuka Indonesia</p>
          <p className="text-gray-500 text-sm mt-3">
            Uji pengetahuanmu tentang simpul-simpul tali pramuka!
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Masukkan Nama Pramuka
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Contoh: Adi Pratama"
                className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors text-center text-lg"
                autoFocus
                maxLength={50}
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button
              type="submit"
              disabled={loading || !name.trim()}
              className="w-full py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-semibold rounded-xl transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              {loading ? "Memuat..." : "Mulai Bermain"}
            </button>
          </form>
        ) : player ? (
          <div className="space-y-4 animate-slide-up">
            <div className="bg-white rounded-2xl p-6 shadow-md border border-green-100">
              <div className="text-center mb-4">
                <p className="text-sm text-gray-500">Selamat datang kembali!</p>
                <h2 className="text-2xl font-bold text-green-800">{player.name}</h2>
                {player.rank && (
                  <div className="mt-2 inline-block bg-amber-100 text-amber-800 px-4 py-1 rounded-full text-sm font-semibold">
                    Peringkat #{player.rank}
                  </div>
                )}
              </div>

              {player.scores.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-600 mb-2">Riwayat Skor:</p>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {player.scores.map((s, i) => (
                      <div
                        key={s.id}
                        className="flex justify-between items-center bg-gray-50 rounded-lg px-4 py-2 text-sm"
                      >
                        <span className="text-gray-500">Game #{i + 1}</span>
                        <span className="font-semibold text-green-700">
                          {s.score}/{s.total}
                        </span>
                        <span className="text-gray-400 text-xs">
                          {new Date(s.createdAt).toLocaleDateString("id-ID")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => router.push("/game")}
                className="w-full mt-4 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Mulai Game Baru
              </button>
            </div>

            <button
              onClick={() => router.push("/scoreboard")}
              className="w-full py-3 bg-white hover:bg-gray-50 text-green-700 font-semibold rounded-xl border-2 border-green-200 transition-colors cursor-pointer"
            >
              Lihat Peringkat
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
