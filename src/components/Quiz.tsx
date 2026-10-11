import { useEffect, useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Award,
  Lightbulb,
  AlertTriangle,
  BookOpen,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import type { Question } from "@/lib/types";
import { CATEGORY_LABEL } from "@/lib/types";
import { BADGES } from "@/lib/badges";
import { useUser } from "@/context/UserContext";
import { explainWrongAnswer } from "@/lib/wrong-answer-explainer";

interface Props {
  testId: string;
  title: string;
  questions: Question[];
  passMark: number;
  timeLimit?: number;
  feedback: boolean;
  onExit: () => void;
}

export function Quiz({
  testId,
  title,
  questions: initialQuestions,
  passMark,
  timeLimit,
  feedback,
  onExit,
}: Props) {
  const { recordTest } = useUser();
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    initialQuestions.map(() => null)
  );
  const [revealed, setRevealed] = useState(false);
  const [left, setLeft] = useState(timeLimit ?? 0);
  const [result, setResult] = useState<ReturnType<typeof recordTest> | null>(
    null
  );
  const [filterMode, setFilterMode] = useState<"all" | "wrong" | "correct">(
    "all"
  );
  const [liveFeedback, setLiveFeedback] = useState<boolean>(feedback);

  const finish = () => {
    if (result) return;
    setResult(
      recordTest(
        testId,
        questions.map((q, k) => ({
          q,
          correct: answers[k] === q.answer,
          chosenAnswer: answers[k] ?? undefined,
        })),
        passMark
      )
    );
  };

  useEffect(() => {
    if (!timeLimit || result) return;
    if (left <= 0) {
      finish();
      return;
    }
    const t = setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  });

  const q = questions[i]!;
  const currentAnswer = answers[i];

  const choose = (k: number) => {
    if (liveFeedback && revealed) return;
    setAnswers((a) => a.map((v, j) => (j === i ? k : v)));
    if (liveFeedback) setRevealed(true);
  };

  const next = () => {
    setRevealed(false);
    if (i < questions.length - 1) setI(i + 1);
    else finish();
  };

  const retryWrongOnly = () => {
    const wrongIndices = questions
      .map((item, idx) => (answers[idx] !== item.answer ? idx : -1))
      .filter((idx) => idx !== -1);
    if (wrongIndices.length === 0) return;

    const wrongQuestions = wrongIndices.map((idx) => questions[idx]!);
    setQuestions(wrongQuestions);
    setAnswers(wrongQuestions.map(() => null));
    setI(0);
    setRevealed(false);
    setResult(null);
    setLiveFeedback(true);
    setLeft((timeLimit ? Math.round(timeLimit * (wrongQuestions.length / questions.length)) : 0));
  };

  if (result) {
    const passed = result.score >= passMark;
    const wrongCount = questions.filter((x, k) => answers[k] !== x.answer).length;
    const correctCount = questions.length - wrongCount;

    const displayedQuestions = questions
      .map((item, idx) => ({ item, idx, ok: answers[idx] === item.answer }))
      .filter(({ ok }) => {
        if (filterMode === "wrong") return !ok;
        if (filterMode === "correct") return ok;
        return true;
      });

    return (
      <div className="space-y-6">
        <div className="panel p-8 text-center space-y-4">
          <div
            className={`text-6xl font-serif font-semibold ${
              passed ? "text-success" : "text-destructive"
            }`}
          >
            {result.score}%
          </div>
          <p className="text-xl font-medium">
            {passed
              ? "Сда́но! Test superato con successo."
              : `Non superato — soglia minima del ${passMark}%`}
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <span>
              Esatte: <strong className="text-success">{correctCount}</strong>
            </span>
            <span>·</span>
            <span>
              Errori: <strong className="text-destructive">{wrongCount}</strong>
            </span>
            <span>·</span>
            <span>
              Variazione Elo:{" "}
              <strong>
                {result.eloDelta >= 0 ? "+" : ""}
                {result.eloDelta}
              </strong>
            </span>
          </div>

          {result.newBadges.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {result.newBadges.map((b) => (
                <span
                  key={b}
                  className="flex items-center gap-1.5 rounded-full bg-warning px-3 py-1 text-sm text-warning-foreground font-medium"
                >
                  <Award size={16} />
                  {BADGES.find((x) => x.id === b)?.name}
                </span>
              ))}
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-3 pt-3">
            {wrongCount > 0 && (
              <button
                className="btn btn-primary bg-destructive text-destructive-foreground hover:opacity-90 flex items-center gap-2"
                onClick={retryWrongOnly}
              >
                <RotateCcw size={16} />
                Riprova solo i {wrongCount} quesiti sbagliati
              </button>
            )}
            <button className="btn btn-outline" onClick={onExit}>
              Torna al menu
            </button>
          </div>
        </div>

        {/* Section Review with Filters */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
            <div>
              <h2 className="text-xl font-semibold">
                Revisione con spiegazione degli errori
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Consulta il motivo grammaticale e lessicale di ciascuna risposta.
              </p>
            </div>

            <div className="flex rounded-lg border bg-muted/40 p-1 text-xs font-medium">
              <button
                onClick={() => setFilterMode("all")}
                className={`rounded px-3 py-1.5 transition-all ${
                  filterMode === "all"
                    ? "bg-background text-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Tutti ({questions.length})
              </button>
              <button
                onClick={() => setFilterMode("wrong")}
                className={`rounded px-3 py-1.5 transition-all flex items-center gap-1 ${
                  filterMode === "wrong"
                    ? "bg-destructive text-destructive-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-destructive"
                }`}
              >
                <XCircle size={13} />
                Errori ({wrongCount})
              </button>
              <button
                onClick={() => setFilterMode("correct")}
                className={`rounded px-3 py-1.5 transition-all flex items-center gap-1 ${
                  filterMode === "correct"
                    ? "bg-success text-success-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-success"
                }`}
              >
                <CheckCircle2 size={13} />
                Corretti ({correctCount})
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {displayedQuestions.map(({ item: x, idx: k, ok }) => {
              const userAnswerIndex = answers[k];
              const wrongInfo =
                !ok && userAnswerIndex != null
                  ? explainWrongAnswer(x, userAnswerIndex)
                  : null;

              return (
                <div
                  key={x.id}
                  className={`panel p-5 text-sm space-y-3 transition-all border-l-4 ${
                    ok
                      ? "border-l-success border-success/30"
                      : "border-l-destructive border-destructive/40 bg-destructive/5"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      {ok ? (
                        <CheckCircle2
                          className="shrink-0 text-success mt-0.5"
                          size={20}
                        />
                      ) : (
                        <XCircle
                          className="shrink-0 text-destructive mt-0.5"
                          size={20}
                        />
                      )}
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                          Quesito {k + 1} · {x.level} · {CATEGORY_LABEL[x.category]}
                        </div>
                        <span className="font-medium text-base text-foreground leading-snug">
                          {x.prompt}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-semibold shrink-0 ${
                        ok
                          ? "bg-success/15 text-success"
                          : "bg-destructive/15 text-destructive"
                      }`}
                    >
                      {ok ? "Corretto" : "Errore"}
                    </span>
                  </div>

                  {x.passage && (
                    <div className="ml-7 rounded bg-muted/60 p-3 text-xs font-serif text-muted-foreground max-h-36 overflow-y-auto whitespace-pre-line border">
                      {x.passage}
                    </div>
                  )}

                  {/* Answers comparison */}
                  <div className="ml-7 rounded-md bg-background/80 p-3 border text-xs grid gap-1.5">
                    <div className="flex items-baseline gap-2">
                      <span className="font-semibold text-success shrink-0">
                        ✅ Risposta corretta:
                      </span>
                      <span className="font-semibold text-foreground">
                        {x.options[x.answer]}
                      </span>
                    </div>
                    {!ok && userAnswerIndex != null && (
                      <div className="flex items-baseline gap-2">
                        <span className="font-semibold text-destructive shrink-0">
                          ❌ La tua risposta:
                        </span>
                        <span className="line-through text-destructive font-medium">
                          {x.options[userAnswerIndex]}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Detailed explanation for wrong answers */}
                  {!ok && wrongInfo ? (
                    <div className="ml-7 rounded-lg border border-destructive/30 bg-destructive/10 p-3.5 space-y-2.5 text-xs">
                      <div>
                        <div className="font-semibold text-destructive uppercase tracking-wider flex items-center gap-1.5 text-[11px] mb-1">
                          <AlertTriangle size={14} /> Perché la tua risposta «
                          {x.options[userAnswerIndex!]}» è sbagliata:
                        </div>
                        <p className="text-foreground leading-relaxed text-xs">
                          {wrongInfo.whyWrong}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-destructive/20">
                        <div className="font-semibold text-primary uppercase tracking-wider flex items-center gap-1.5 text-[11px] mb-1">
                          <BookOpen size={14} /> Regola grammaticale & spiegazione:
                        </div>
                        <p className="text-foreground leading-relaxed text-xs">
                          {wrongInfo.ruleSummary}
                        </p>
                      </div>

                      {wrongInfo.mnemonicTip && (
                        <div className="rounded bg-accent/50 p-2.5 text-foreground border border-primary/20 flex items-start gap-1.5">
                          <Lightbulb
                            size={14}
                            className="text-primary shrink-0 mt-0.5"
                          />
                          <div>
                            <strong className="text-primary">
                              Suggerimento chiave:{" "}
                            </strong>
                            {wrongInfo.mnemonicTip}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="ml-7 rounded-md bg-accent/30 p-3 text-xs border border-primary/20 space-y-1">
                      <div className="font-semibold text-primary flex items-center gap-1 text-[11px] uppercase tracking-wider">
                        <Lightbulb size={13} /> Spiegazione grammaticale & regola:
                      </div>
                      <p className="text-foreground leading-relaxed">
                        {x.explanation}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // During Question Answering
  const selectedK = answers[i];
  const isWrong =
    liveFeedback && revealed && selectedK != null && selectedK !== q.answer;
  const isCorrect =
    liveFeedback && revealed && selectedK != null && selectedK === q.answer;
  const liveWrongInfo = isWrong ? explainWrongAnswer(q, selectedK!) : null;

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span className="font-medium">
          {title} · Domanda {i + 1} di {questions.length}
        </span>
        {timeLimit ? (
          <span
            className={`flex items-center gap-1 font-mono ${
              left < 60 ? "text-warning font-semibold animate-pulse" : ""
            }`}
          >
            <Clock size={14} />
            {Math.floor(left / 60)}:{String(left % 60).padStart(2, "0")}
          </span>
        ) : null}
      </div>

      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${(i / questions.length) * 100}%` }}
        />
      </div>

      <div className="panel p-6 space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
            {q.level} · {CATEGORY_LABEL[q.category]}
          </span>
          <button
            type="button"
            onClick={() => setLiveFeedback(!liveFeedback)}
            className={`text-xs px-2.5 py-1 rounded-md font-medium border transition-all flex items-center gap-1.5 ${
              liveFeedback
                ? "bg-primary/10 border-primary/30 text-primary"
                : "bg-muted/50 border-border text-muted-foreground hover:text-foreground"
            }`}
            title="Attiva o disattiva le spiegazioni immediate durante il test"
          >
            <Sparkles size={13} />
            {liveFeedback ? "Tutor attivo (spiegazioni)" : "Modalità Esame (senza aiuti)"}
          </button>
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
            if (liveFeedback && revealed) {
              if (k === q.answer) {
                cls = "!bg-success !text-success-foreground border-success font-semibold shadow-sm";
              } else if (k === answers[i]) {
                cls = "!bg-destructive !text-destructive-foreground border-destructive font-semibold shadow-sm";
              } else {
                cls = "btn-outline opacity-50";
              }
            } else if (answers[i] === k) {
              cls = "btn-primary";
            }

            return (
              <button
                key={k}
                onClick={() => choose(k)}
                disabled={liveFeedback && revealed}
                className={`btn ${cls} !justify-start text-left text-base py-3.5 px-4 transition-all`}
              >
                <span className="font-bold mr-2 text-sm opacity-90">
                  {String.fromCharCode(1040 + k)})
                </span>
                <span>{o}</span>
              </button>
            );
          })}
        </div>

        {/* Live Feedback: EXPLANATION WHEN WRONG */}
        {isWrong && liveWrongInfo && (
          <div className="rounded-lg border-2 border-destructive/40 bg-destructive/10 p-4 space-y-3 animate-in fade-in duration-200 text-sm">
            <div className="flex items-center gap-2 font-semibold text-base text-destructive">
              <XCircle size={20} className="shrink-0" />
              <span>Risposta errata! Ecco perché la tua scelta non è corretta:</span>
            </div>

            <div className="grid gap-1.5 rounded-md bg-background/90 p-3 border border-destructive/20 text-xs">
              <div className="flex items-baseline gap-2">
                <span className="font-semibold text-destructive shrink-0">
                  ❌ La tua risposta:
                </span>
                <span className="line-through font-semibold text-foreground">
                  {q.options[selectedK!]}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-semibold text-success shrink-0">
                  ✅ Risposta corretta:
                </span>
                <span className="font-semibold text-foreground">
                  {q.options[q.answer]}
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="font-semibold text-xs text-destructive uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle size={14} /> Perché la tua risposta è sbagliata:
              </div>
              <p className="text-foreground text-sm leading-relaxed font-sans">
                {liveWrongInfo.whyWrong}
              </p>
            </div>

            <div className="space-y-1 pt-2 border-t border-destructive/20">
              <div className="font-semibold text-xs text-primary uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen size={14} /> Regola grammaticale & spiegazione:
              </div>
              <p className="text-foreground text-sm leading-relaxed font-sans">
                {liveWrongInfo.ruleSummary}
              </p>
            </div>

            {liveWrongInfo.mnemonicTip && (
              <div className="rounded bg-accent/40 p-2.5 text-xs text-foreground border border-primary/20 flex items-start gap-2">
                <Lightbulb size={16} className="text-primary shrink-0 mt-0.5" />
                <div>
                  <strong className="text-primary">Suggerimento chiave: </strong>
                  {liveWrongInfo.mnemonicTip}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Live Feedback: EXPLANATION WHEN CORRECT */}
        {isCorrect && (
          <div className="rounded-lg border border-success/40 bg-success/10 p-4 space-y-2 animate-in fade-in duration-200 text-sm">
            <div className="flex items-center gap-2 font-semibold text-success">
              <CheckCircle2 size={18} />
              <span>Risposta corretta! Отлично!</span>
            </div>
            <p className="text-foreground text-sm leading-relaxed">
              {q.explanation}
            </p>
          </div>
        )}

        <div className="flex justify-between pt-2 border-t">
          <button className="btn btn-outline" onClick={onExit}>
            Esci
          </button>
          <button
            className="btn btn-primary"
            disabled={answers[i] == null}
            onClick={next}
          >
            {i < questions.length - 1 ? "Domanda successiva" : "Termina test"}
          </button>
        </div>
      </div>
    </div>
  );
}
