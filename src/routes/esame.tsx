import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AlertTriangle, BookOpen, Clock, Award, Headphones, FileText } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Quiz } from "@/components/Quiz";
import { useUser } from "@/context/UserContext";
import { QUESTIONS, shuffle } from "@/lib/questions";
import { LEVELS, LEVEL_LABEL, type Level, type Question } from "@/lib/types";

export const Route = createFileRoute("/esame")({
  head: () => ({
    meta: [
      { title: "Simulazione d'esame — ТРКИ Master" },
      { name: "description", content: "Simulazione cronometrata dell'esame ТРКИ / TORFL con soglia di superamento al 66%." },
      { property: "og:title", content: "Simulazione d'esame — ТРКИ Master" },
      { property: "og:description", content: "Simula l'esame ТРКИ dal livello A1 al C1." },
    ],
  }),
  component: () => <AppShell><Exam /></AppShell>,
});

interface ActiveExam {
  testId: string;
  title: string;
  questions: Question[];
  timeLimit: number;
}

function Exam() {
  const { user } = useUser();
  const [activeExam, setActiveExam] = useState<ActiveExam | null>(null);

  const startLevelExam = (l: Level) => {
    const pool = QUESTIONS.filter((q) => q.level === l);
    const qs = shuffle(pool).slice(0, 30);
    setActiveExam({
      testId: `exam-${l}`,
      title: `Simulazione Ufficiale ТРКИ (${l})`,
      questions: qs,
      timeLimit: qs.length * 60,
    });
  };

  const startSpecialSubtest = (type: "b2-full" | "c1-full" | "reading-b2c1" | "audio-b2c1") => {
    if (type === "b2-full") {
      const pool = QUESTIONS.filter((q) => q.level === "B2" && (q.category === "grammar" || q.category === "lexicon"));
      const qs = shuffle(pool).slice(0, 50);
      setActiveExam({
        testId: "exam-b2-lexgram",
        title: "Субтест 1: Лексика и Грамматика (ТРКИ-2 / B2)",
        questions: qs,
        timeLimit: 50 * 60, // 50 min
      });
    } else if (type === "c1-full") {
      const pool = QUESTIONS.filter((q) => q.level === "C1" && (q.category === "grammar" || q.category === "lexicon"));
      const qs = shuffle(pool).slice(0, 50);
      setActiveExam({
        testId: "exam-c1-lexgram",
        title: "Субтест 1: Лексика и Грамматика (ТРКИ-3 / C1)",
        questions: qs,
        timeLimit: 50 * 60,
      });
    } else if (type === "reading-b2c1") {
      const pool = QUESTIONS.filter((q) => q.category === "reading");
      const qs = shuffle(pool).slice(0, 15);
      setActiveExam({
        testId: "exam-reading-subtest",
        title: "Субтест 2: Чтение (B2–C1)",
        questions: qs,
        timeLimit: 45 * 60, // 45 min
      });
    } else if (type === "audio-b2c1") {
      const pool = QUESTIONS.filter((q) => q.category === "audio");
      const qs = shuffle(pool).slice(0, 15);
      setActiveExam({
        testId: "exam-audio-subtest",
        title: "Субтест 3: Аудирование и диалоги (B2–C1)",
        questions: qs,
        timeLimit: 30 * 60,
      });
    }
  };

  if (activeExam) {
    return (
      <Quiz
        testId={activeExam.testId}
        title={activeExam.title}
        questions={activeExam.questions}
        passMark={66}
        timeLimit={activeExam.timeLimit}
        feedback={false}
        onExit={() => setActiveExam(null)}
      />
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">Simulazione d'esame ТРКИ / TORFL</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Modalità d'esame rigorosa: nessun riscontro durante la prova, cronometro attivo e calcolo punteggio secondo gli standard del Ministero dell'Istruzione Russo.
        </p>
      </div>

      <div className="flex items-center gap-2 rounded-md border border-warning/40 bg-warning/15 p-4 text-sm text-foreground">
        <AlertTriangle size={18} className="shrink-0 text-warning" />
        <div>
          <strong>Regole d'esame:</strong> 1 minuto a domanda, soglia di superamento al <strong>66%</strong>. Le risposte corrette e le spiegazioni saranno consultabili al termine del test.
        </div>
      </div>

      {/* 1. Prove Generali per Livello */}
      <section>
        <h2 className="text-xl font-semibold">Simulazioni Generali per Livello</h2>
        <p className="text-xs text-muted-foreground">30 quesiti a tempo calibrati per livello CEFR.</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LEVELS.map((l) => {
            const t = user?.completedTests[`exam-${l}`];
            const poolCount = QUESTIONS.filter((q) => q.level === l).length;
            return (
              <div key={l} className="panel flex flex-col justify-between p-5">
                <div>
                  <div className="flex items-baseline justify-between">
                    <span className="font-serif text-3xl font-semibold text-primary">{l}</span>
                    <span className="text-xs text-muted-foreground">{poolCount} quesiti in banca</span>
                  </div>
                  <div className="text-sm font-medium text-foreground">{LEVEL_LABEL[l]}</div>
                  <div className="mt-3 text-xs text-muted-foreground">
                    {t ? (
                      <>
                        Tentativi: {t.attempts} · Ultimo: {t.lastScore}% · Migliore:{" "}
                        <span className={`font-semibold ${t.passed ? "text-success" : "text-destructive"}`}>
                          {t.bestScore}% ({t.passed ? "Superato" : "Non superato"})
                        </span>
                      </>
                    ) : (
                      "Nessun tentativo registrato"
                    )}
                  </div>
                </div>
                <button className="btn btn-primary mt-5 w-full" onClick={() => startLevelExam(l)}>
                  Avvia simulazione {l}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. Subtest Specifici Ufficiali B2 & C1 */}
      <section>
        <h2 className="text-xl font-semibold">Subtest Monotematici Ufficiali (B2–C1)</h2>
        <p className="text-xs text-muted-foreground">
          Esercitati sulle prove specialistiche conformi alle certificazioni statali russe.
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="panel p-5">
            <div className="flex items-start gap-3">
              <span className="rounded-lg bg-primary/10 p-2 text-primary">
                <FileText size={22} />
              </span>
              <div>
                <h3 className="font-semibold text-base">Субтест 1: Лексика. Грамматика (ТРКИ-2 / B2)</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Reggenze verbali, paronimi, prefissi di moto, forme brevi, espressione di causa, tempo e scopo.
                </p>
                <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock size={14} /> 50 min</span>
                  <span>50 quesiti</span>
                  <span>Soglia: 66%</span>
                </div>
              </div>
            </div>
            <button className="btn btn-primary mt-4 w-full" onClick={() => startSpecialSubtest("b2-full")}>
              Inizia Subtest B2 Lessico/Grammatica
            </button>
          </div>

          <div className="panel p-5">
            <div className="flex items-start gap-3">
              <span className="rounded-lg bg-primary/10 p-2 text-primary">
                <Award size={22} />
              </span>
              <div>
                <h3 className="font-semibold text-base">Субтест 1: Лексика. Грамматика (ТРКИ-3 / C1)</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Sintassi complessa, sinonimia con gerundi/participi, registro pubblicistico e accademico, idiomi.
                </p>
                <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock size={14} /> 50 min</span>
                  <span>50 quesiti</span>
                  <span>Soglia: 66%</span>
                </div>
              </div>
            </div>
            <button className="btn btn-primary mt-4 w-full" onClick={() => startSpecialSubtest("c1-full")}>
              Inizia Subtest C1 Lessico/Grammatica
            </button>
          </div>

          <div className="panel p-5">
            <div className="flex items-start gap-3">
              <span className="rounded-lg bg-primary/10 p-2 text-primary">
                <BookOpen size={22} />
              </span>
              <div>
                <h3 className="font-semibold text-base">Субтест 2: Чтение (Comprensione del Testo B2–C1)</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Testi integrali di narrativa russa (Paustovsky, Chekhov, Bunin, Akunin, Ulitskaya) e saggistica socio-culturale.
                </p>
                <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock size={14} /> 45 min</span>
                  <span>15 brani & quesiti</span>
                  <span>Soglia: 66%</span>
                </div>
              </div>
            </div>
            <button className="btn btn-primary mt-4 w-full" onClick={() => startSpecialSubtest("reading-b2c1")}>
              Inizia Subtest Чтение
            </button>
          </div>

          <div className="panel p-5">
            <div className="flex items-start gap-3">
              <span className="rounded-lg bg-primary/10 p-2 text-primary">
                <Headphones size={22} />
              </span>
              <div>
                <h3 className="font-semibold text-base">Субтест 3: Аудирование и Диалоги (B2–C1)</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Comprensione di scambi orali, interviste a personalità pubbliche (Pozner, Rutberg, Zbruev) e речевой этикет.
                </p>
                <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock size={14} /> 30 min</span>
                  <span>15 dialoghi</span>
                  <span>Soglia: 66%</span>
                </div>
              </div>
            </div>
            <button className="btn btn-primary mt-4 w-full" onClick={() => startSpecialSubtest("audio-b2c1")}>
              Inizia Subtest Аудирование
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
