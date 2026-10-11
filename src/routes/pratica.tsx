import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Quiz } from "@/components/Quiz";
import { useUser } from "@/context/UserContext";
import { QUESTIONS, shuffle } from "@/lib/questions";
import { CATEGORY_LABEL, LEVELS, type Category, type Level, type Question } from "@/lib/types";

export const Route = createFileRoute("/pratica")({
  head: () => ({
    meta: [
      { title: "Pratica — ТРКИ Master" },
      { name: "description", content: "Esercizi di grammatica, lessico e lettura russa per livello con correzione immediata." },
      { property: "og:title", content: "Pratica — ТРКИ Master" },
      { property: "og:description", content: "Esercizi ТРКИ per livello e categoria con spiegazioni." },
    ],
  }),
  component: () => <AppShell><Practice /></AppShell>,
});

function Practice() {
  const { user } = useUser();
  const [level, setLevel] = useState<Level>(user?.currentLevel ?? "A1");
  const [cat, setCat] = useState<Category | "all">("all");
  const [count, setCount] = useState<number>(10);
  const [run, setRun] = useState<Question[] | null>(null);

  if (run) return <Quiz testId={`practice-${level}-${cat}`} title={`Pratica ${level} — ${cat === "all" ? "Tutte le categorie" : CATEGORY_LABEL[cat]}`} questions={run} passMark={66} feedback onExit={() => setRun(null)} />;

  const pool = QUESTIONS.filter((q) => q.level === level && (cat === "all" || q.category === cat));
  const start = () => {
    const hist = user?.itemHistory ?? {};
    // prioritise items answered wrong last time or never seen
    const weight = (q: Question) => { const h = hist[q.id]; return !h ? 1 : h[h.length - 1]!.isCorrect ? 0 : 2; };
    setRun(shuffle(pool).sort((a, b) => weight(b) - weight(a)).slice(0, count));
  };

  const categories: (Category | "all")[] = ["all", "grammar", "lexicon", "reading", "audio", "writing"];

  return (
    <div className="panel mx-auto max-w-2xl p-6">
      <h1 className="text-3xl font-semibold">Pratica guidata</h1>
      <p className="mt-2 text-sm text-muted-foreground">Esercizi mirati con spiegazioni e correzione immediata dopo ogni risposta.</p>

      <div className="mt-6 text-sm font-medium">Livello di certificazione</div>
      <div className="mt-2 flex flex-wrap gap-2">
        {LEVELS.map((l) => {
          const c = QUESTIONS.filter((q) => q.level === l).length;
          return (
            <button key={l} className={`btn ${l === level ? "btn-primary" : "btn-outline"}`} onClick={() => setLevel(l)}>
              {l} <span className="text-xs opacity-70">({c})</span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 text-sm font-medium">Categoria / Sezione</div>
      <div className="mt-2 flex flex-wrap gap-2">
        {categories.map((c) => {
          const countInCat = QUESTIONS.filter((q) => q.level === level && (c === "all" || q.category === c)).length;
          return (
            <button
              key={c}
              className={`btn ${c === cat ? "btn-primary" : "btn-outline"} ${countInCat === 0 ? "opacity-50" : ""}`}
              onClick={() => setCat(c)}
            >
              {c === "all" ? "Tutte" : CATEGORY_LABEL[c]}
              <span className="text-xs opacity-75">({countInCat})</span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 text-sm font-medium">Numero di domande per sessione</div>
      <div className="mt-2 flex gap-2">
        {[10, 20, 30].map((n) => (
          <button
            key={n}
            className={`btn ${count === n ? "btn-primary" : "btn-outline"} !px-4`}
            onClick={() => setCount(n)}
          >
            {n} quesiti
          </button>
        ))}
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        {pool.length} domande disponibili in questa selezione · l'algoritmo dà priorità agli errori recenti.
      </p>
      <button className="btn btn-primary mt-6 w-full sm:w-auto" disabled={!pool.length} onClick={start}>
        Inizia sessione di pratica
      </button>
    </div>
  );
}
