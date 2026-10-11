import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, Clock, Award, Lightbulb, HelpCircle } from "lucide-react";
import type { Question } from "@/lib/types";
import { CATEGORY_LABEL } from "@/lib/types";
import { BADGES } from "@/lib/badges";
import { useUser } from "@/context/UserContext";

interface Props { testId: string; title: string; questions: Question[]; passMark: number; timeLimit?: number; feedback: boolean; onExit: () => void }

export function Quiz({ testId, title, questions, passMark, timeLimit, feedback, onExit }: Props) {
  const { recordTest } = useUser();
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null));
  const [revealed, setRevealed] = useState(false);
  const [left, setLeft] = useState(timeLimit ?? 0);
  const [result, setResult] = useState<ReturnType<typeof recordTest> | null>(null);

  const finish = () => {
    if (result) return;
    setResult(recordTest(testId, questions.map((q, k) => ({ q, correct: answers[k] === q.answer })), passMark));
  };

  useEffect(() => {
    if (!timeLimit || result) return;
    if (left <= 0) { finish(); return; }
    const t = setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  });

  const q = questions[i]!;
  const choose = (k: number) => {
    if (feedback && revealed) return;
    setAnswers((a) => a.map((v, j) => (j === i ? k : v)));
    if (feedback) setRevealed(true);
  };
  const next = () => { setRevealed(false); if (i < questions.length - 1) setI(i + 1); else finish(); };

  if (result) {
    const passed = result.score >= passMark;
    return (
      <div className="space-y-6">
        <div className="panel p-8 text-center">
          <div className={`text-6xl font-serif font-semibold ${passed ? "text-success" : "text-destructive"}`}>{result.score}%</div>
          <p className="mt-2 text-lg font-medium">{passed ? "Сда́но! Test superato con successo." : `Non superato — soglia minima ${passMark}%`}</p>
          <p className="mt-1 text-sm text-muted-foreground">Variazione Elo: {result.eloDelta >= 0 ? "+" : ""}{result.eloDelta}</p>
          {result.newBadges.length > 0 && (
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {result.newBadges.map((b) => <span key={b} className="flex items-center gap-1 rounded-full bg-warning px-3 py-1 text-sm text-warning-foreground font-medium"><Award size={14} />{BADGES.find((x) => x.id === b)?.name}</span>)}
            </div>
          )}
          <button className="btn btn-primary mt-6" onClick={onExit}>Torna al menu</button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-lg font-semibold">Riepilogo e Spiegazioni Dettagliate</h2>
            <span className="text-xs text-muted-foreground">{questions.length} quesiti</span>
          </div>
          {questions.map((x, k) => {
            const ok = answers[k] === x.answer;
            return (
              <div key={x.id} className="panel p-4 text-sm space-y-2">
                <div className="flex items-start gap-2.5">
                  {ok ? <CheckCircle2 className="shrink-0 text-success mt-0.5" size={18} /> : <XCircle className="shrink-0 text-destructive mt-0.5" size={18} />}
                  <span className="font-medium text-foreground">{x.prompt}</span>
                </div>
                {x.passage && (
                  <div className="ml-7 rounded bg-muted/50 p-2.5 text-xs font-serif text-muted-foreground max-h-32 overflow-y-auto whitespace-pre-line border">
                    {x.passage}
                  </div>
                )}
                <div className="ml-7 text-xs text-muted-foreground">
                  Risposta corretta: <span className="text-success font-semibold">{x.options[x.answer]}</span>
                  {!ok && answers[k] != null && <> · La tua risposta: <span className="text-destructive font-semibold">{x.options[answers[k]!]}</span></>}
                </div>
                <div className="ml-7 rounded-md bg-accent/40 p-3 text-xs border border-primary/20 space-y-1">
                  <div className="font-semibold text-primary flex items-center gap-1 text-[11px] uppercase tracking-wider">
                    <Lightbulb size={13} /> Spiegazione grammaticale & regola:
                  </div>
                  <p className="text-foreground leading-relaxed">{x.explanation}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{title} · Domanda {i + 1} di {questions.length}</span>
        {timeLimit ? <span className={`flex items-center gap-1 font-mono ${left < 60 ? "text-warning font-semibold" : ""}`}><Clock size={14} />{Math.floor(left / 60)}:{String(left % 60).padStart(2, "0")}</span> : null}
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div className="h-full bg-primary transition-all duration-300" style={{ width: `${(i / questions.length) * 100}%` }} />
      </div>

      <div className="panel p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
            {q.level} · {CATEGORY_LABEL[q.category]}
          </span>
          {feedback && (
            <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded font-medium">
              Correzione istantanea attiva
            </span>
          )}
        </div>

        {q.passage && (
          <div className="rounded-md bg-muted/70 p-4 font-serif text-sm leading-relaxed whitespace-pre-line max-h-96 overflow-y-auto border text-foreground">
            {q.passage}
          </div>
        )}

        <p className="text-lg font-medium text-foreground">{q.prompt}</p>

        <div className="grid gap-2.5">
          {q.options.map((o, k) => {
            let cls = "btn-outline";
            if (feedback && revealed) {
              cls = k === q.answer ? "!bg-success !text-success-foreground border-success" : k === answers[i] ? "!bg-destructive !text-destructive-foreground border-destructive" : "btn-outline opacity-60";
            } else if (answers[i] === k) {
              cls = "btn-primary";
            }
            return (
              <button
                key={k}
                onClick={() => choose(k)}
                disabled={feedback && revealed}
                className={`btn ${cls} !justify-start text-left text-base py-3 px-4 transition-all`}
              >
                <span className="font-semibold mr-2">{String.fromCharCode(1040 + k)})</span> {o}
              </button>
            );
          })}
        </div>

        {/* Spiegazione immediata con feedback attivo */}
        {feedback && revealed && (
          <div className="rounded-lg border border-primary/30 bg-accent/35 p-4 space-y-1.5 animate-in fade-in duration-200">
            <div className="flex items-center gap-1.5 font-semibold text-xs text-primary uppercase tracking-wider">
              <Lightbulb size={16} /> Spiegazione grammaticale & regola:
            </div>
            <p className="text-foreground text-sm leading-relaxed">{q.explanation}</p>
          </div>
        )}

        <div className="flex justify-between pt-2 border-t">
          <button className="btn btn-outline" onClick={onExit}>Esci</button>
          <button className="btn btn-primary" disabled={answers[i] == null} onClick={next}>
            {i < questions.length - 1 ? "Domanda successiva" : "Termina test"}
          </button>
        </div>
      </div>
    </div>
  );
}
