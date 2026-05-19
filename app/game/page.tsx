"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { Question } from "@/data/knots";
import { generateQuestions } from "@/data/knots";

export default function GamePage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [finished, setFinished] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [saving, setSaving] = useState(false);
  const [resultData, setResultData] = useState<{
    score: number;
    total: number;
    rank: number;
    totalPlayers: number;
  } | null>(null);

  useEffect(() => {
    const name = localStorage.getItem("playerName");
    if (!name) {
      router.push("/");
      return;
    }
    setPlayerName(name);
    setQuestions(generateQuestions(10));
  }, [router]);

  const handleAnswer = (knotId: number) => {
    if (selected !== null) return;
    setSelected(knotId);
    if (knotId === questions[current].knot.id) {
      setScore(s => s + 1);
    }
    setTimeout(() => {
      if (current < questions.length - 1) {
        setCurrent(c => c + 1);
        setSelected(null);
      } else {
        setFinished(true);
      }
    }, 800);
  };

  const saveScore = useCallback(async () => {
    if (saving || !playerName) return;
    setSaving(true);
    try {
      const res = await fetch("/api/scores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: playerName,
          score,
          total: questions.length,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setResultData(data);
      }
    } catch {
      // silently fail
    } finally {
      setSaving(false);
    }
  }, [playerName, score, questions.length, saving]);

  useEffect(() => {
    if (finished && !resultData) {
      saveScore();
    }
  }, [finished, saveScore, resultData]);

  if (questions.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-gray-500">Memuat soal...</p>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-md animate-slide-up text-center">
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-green-100">
            <div className="text-5xl mb-4">
              {score === questions.length ? "🏆" : score >= questions.length / 2 ? "🎉" : "💪"}
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">Game Selesai!</h2>
            <p className="text-gray-500 mb-6">{playerName}</p>

            <div className="flex justify-center items-baseline gap-2 mb-6">
              <span className="text-6xl font-bold text-green-600">{score}</span>
              <span className="text-2xl text-gray-400">/ {questions.length}</span>
            </div>

            {resultData && (
              <div className="space-y-2 mb-6">
                <div className="bg-green-50 rounded-xl px-4 py-3">
                  <p className="text-sm text-gray-500">Peringkat Kamu</p>
                  <p className="text-2xl font-bold text-green-700">
                    #{resultData.rank} dari {resultData.totalPlayers} pemain
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <button
                onClick={() => router.push("/game")}
                className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Main Lagi
              </button>
              <button
                onClick={() => router.push("/scoreboard")}
                className="w-full py-3 bg-white hover:bg-gray-50 text-green-700 font-semibold rounded-xl border-2 border-green-200 transition-colors cursor-pointer"
              >
                Lihat Peringkat
              </button>
              <button
                onClick={() => router.push("/")}
                className="w-full py-2 text-gray-400 hover:text-gray-600 text-sm transition-colors cursor-pointer"
              >
                Kembali ke Beranda
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[current];
  const progress = ((current + 1) / questions.length) * 100;

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-6">
      <div className="w-full max-w-md animate-fade-in">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-green-700">
            {playerName}
          </span>
          <span className="text-sm font-medium text-gray-500">
            {current + 1} / {questions.length}
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg border border-green-100 mb-4">
          <div className="flex justify-center mb-4" dangerouslySetInnerHTML={{ __html: q.knot.svg }} />

          <p className="text-gray-600 text-sm text-center mb-1">Simpul ini digunakan untuk:</p>
          <p className="text-gray-800 font-medium text-center mb-6">
            &ldquo;{q.knot.usage}&rdquo;
          </p>

          <div className="space-y-3">
            {q.options.map(opt => {
              const isCorrect = opt.id === q.knot.id;
              const isSelected = selected === opt.id;
              let btnClass = "w-full py-3 px-4 rounded-xl border-2 text-left font-medium transition-all duration-300 cursor-pointer ";

              if (selected === null) {
                btnClass += "border-gray-200 hover:border-green-400 hover:bg-green-50 text-gray-700";
              } else if (isCorrect) {
                btnClass += "border-green-500 bg-green-50 text-green-800";
              } else if (isSelected && !isCorrect) {
                btnClass += "border-red-400 bg-red-50 text-red-700";
              } else {
                btnClass += "border-gray-200 text-gray-400";
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleAnswer(opt.id)}
                  disabled={selected !== null}
                  className={btnClass}
                >
                  {opt.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="text-center">
          <span className="inline-flex items-center gap-1 text-sm text-gray-400">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            Skor: {score}
          </span>
        </div>
      </div>
    </div>
  );
}
