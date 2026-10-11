import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useUser } from "@/context/UserContext";
import { CATEGORY_LABEL, LEVELS, type Category } from "@/lib/types";
import { QUESTIONS } from "@/lib/questions";
import { explainWrongAnswer } from "@/lib/wrong-answer-explainer";
import { AlertTriangle, BookOpen, Lightbulb, XCircle, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/statistiche")({
  head: () => ({
    meta: [
      { title: "Statistiche & Errori — ТРКИ Master" },
      { name: "description", content: "Analisi dei tuoi progressi e spiegazione degli errori nei test ТРКИ." },
      { property: "og:title", content: "Statistiche & Errori — ТРКИ Master" },
      { property: "og:description", content: "Precisione, cronologia e spiegazioni dettagliate per ciascun errore." },
    ],
  }),
  component: () => <AppShell><Stats /></AppShell>,
});

function Bar({ label, ok, total }: { label: string; ok: number; total: number }) {
  const p = total ? Math.round((ok / total) * 100) : 0;
  const color = !total ? "bg-muted" : p >= 66 ? "bg-success" : p >= 40 ? "bg-warning" : "bg-destructive";
  return (
    <div>
      <div className="flex justify-between text-sm"><span>{label}</span><span className="text-muted-foreground">{total ? `${p}% (${ok}/${total})` : "—"}</span></div>
      <div className="mt-1 h-2 rounded bg-muted"><div className={`h-full rounded ${color}`} style={{ width: `${p}%` }} /></div>
    </div>
  );
}

function Stats() {
  const { user } = useUser();
  if (!user) return null;
  const all = Object.values(user.itemHistory).flat();
  const agg = (f: (a: (typeof all)[number]) => boolean) => { const s = all.filter(f); return { ok: s.filter((a) => a.isCorrect).length, total: s.length }; };
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Statistiche</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="panel space-y-4 p-6"><h2 className="text-lg font-semibold">Per categoria</h2>
          {(Object.keys(CATEGORY_LABEL) as Category[]).map((c) => <Bar key={c} label={CATEGORY_LABEL[c]} {...agg((a) => a.category === c)} />)}
        </div>
        <div className="panel space-y-4 p-6"><h2 className="text-lg font-semibold">Per livello</h2>
          {LEVELS.map((l) => <Bar key={l} label={l} {...agg((a) => a.level === l)} />)}
        </div>
      </div>
      <div className="panel p-6">
        <h2 className="text-lg font-semibold">Test completati</h2>
        {Object.keys(user.completedTests).length === 0 ? <p className="mt-2 text-sm text-muted-foreground">Nessun test ancora.</p> : (
          <table className="mt-3 w-full text-sm">
            <thead className="text-left text-muted-foreground"><tr><th className="py-1">Test</th><th>Tentativi</th><th>Ultimo</th><th>Migliore</th><th>Esito</th></tr></thead>
            <tbody>{Object.entries(user.completedTests).map(([k, t]) => (
              <tr key={k} className="border-t"><td className="py-2">{k}</td><td>{t.attempts}</td><td>{t.lastScore}%</td><td>{t.bestScore}%</td><td className={t.passed ? "text-success" : "text-destructive"}>{t.passed ? "Superato" : "Non superato"}</td></tr>
            ))}</tbody>
          </table>
        )}
      </div>

      {/* Registro degli Errori Recenti e Spiegazioni */}
      {(() => {
        const wrongEntries = Object.entries(user.itemHistory)
          .map(([id, attempts]) => {
            const last = attempts[attempts.length - 1];
            if (!last || last.isCorrect) return null;
            const q = QUESTIONS.find((x) => x.id === id);
            if (!q) return null;
            return { q, last };
          })
          .filter((x): x is { q: (typeof QUESTIONS)[number]; last: (typeof user.itemHistory)[string][number] } => x !== null);

        if (wrongEntries.length === 0) return null;

        return (
          <div className="panel p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <XCircle className="text-destructive" size={20} />
                  Registro Errori Recenti ({wrongEntries.length})
                </h2>
                <p className="text-xs text-muted-foreground">
                  Spiegazione approfondita del perché le risposte selezionate erano errate.
                </p>
              </div>
              <Link to="/pratica" className="btn btn-outline text-xs !py-1.5 !px-3 self-start sm:self-auto flex items-center gap-1.5">
                <RotateCcw size={13} /> Allenati su questi errori
              </Link>
            </div>

            <div className="space-y-3">
              {wrongEntries.slice(0, 10).map(({ q, last }) => {
                const userChoiceIdx = last.chosenAnswer != null ? last.chosenAnswer : (q.answer === 0 ? 1 : 0);
                const info = explainWrongAnswer(q, userChoiceIdx);

                return (
                  <div key={q.id} className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-xs space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-semibold text-foreground text-sm">{q.prompt}</span>
                      <span className="shrink-0 text-[10px] uppercase font-bold text-destructive bg-destructive/15 px-2 py-0.5 rounded">
                        {q.level} · {q.category}
                      </span>
                    </div>

                    <div className="grid gap-1 bg-background/80 p-2.5 rounded border border-destructive/20 text-xs">
                      <div>
                        <span className="font-semibold text-destructive">❌ Risposta errata: </span>
                        <span className="line-through">{q.options[userChoiceIdx]}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-success">✅ Risposta corretta: </span>
                        <span className="font-semibold">{q.options[q.answer]}</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="font-semibold text-destructive uppercase tracking-wider text-[10px] flex items-center gap-1">
                        <AlertTriangle size={12} /> Perché la risposta è sbagliata:
                      </div>
                      <p className="text-foreground leading-relaxed text-xs">{info.whyWrong}</p>
                    </div>

                    <div className="space-y-1 pt-1.5 border-t border-destructive/20">
                      <div className="font-semibold text-primary uppercase tracking-wider text-[10px] flex items-center gap-1">
                        <BookOpen size={12} /> Regola grammaticale & spiegazione:
                      </div>
                      <p className="text-foreground leading-relaxed text-xs">{info.ruleSummary}</p>
                    </div>

                    {info.mnemonicTip && (
                      <div className="rounded bg-accent/40 p-2 text-foreground border border-primary/20 flex items-start gap-1.5 text-[11px]">
                        <Lightbulb size={13} className="text-primary shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-primary">Suggerimento: </strong>
                          {info.mnemonicTip}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}
    </div>
  );
}
