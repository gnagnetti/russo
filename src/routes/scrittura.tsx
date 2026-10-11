import { useState, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  PenTool,
  Volume2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Clipboard,
  Check,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { CyrillicKeyboard } from "@/components/CyrillicKeyboard";
import { SpeakButton } from "@/components/SpeakButton";
import {
  WRITING_EXERCISES,
  compareRussianInput,
  type WritingExercise,
} from "@/lib/writing-exercises-data";
import { useUser } from "@/context/UserContext";

export const Route = createFileRoute("/scrittura")({
  head: () => ({
    meta: [
      { title: "Laboratorio di Scrittura & Tastiera Cirillica — ТРКИ Master" },
      { name: "description", content: "Esercitati nella digitazione cirillica, dettati e completamenti di frasi con tastiera virtuale fonetica e standard." },
    ],
  }),
  component: () => (
    <AppShell>
      <WritingLabView />
    </AppShell>
  ),
});

function WritingLabView() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<"exercises" | "notepad">("exercises");

  // Exercise mode state
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [inputVal, setInputVal] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Free Notepad mode state
  const [notepadText, setNotepadText] = useState("");
  const [copied, setCopied] = useState(false);
  const notepadRef = useRef<HTMLTextAreaElement>(null);

  const currentEx: WritingExercise = WRITING_EXERCISES[exerciseIndex] || WRITING_EXERCISES[0];

  const handleKeyboardInsert = (char: string) => {
    if (activeTab === "exercises") {
      setInputVal((prev) => prev + char);
      inputRef.current?.focus();
    } else {
      setNotepadText((prev) => prev + char);
      notepadRef.current?.focus();
    }
  };

  const handleKeyboardBackspace = () => {
    if (activeTab === "exercises") {
      setInputVal((prev) => prev.slice(0, -1));
      inputRef.current?.focus();
    } else {
      setNotepadText((prev) => prev.slice(0, -1));
      notepadRef.current?.focus();
    }
  };

  const handleKeyboardClear = () => {
    if (activeTab === "exercises") {
      setInputVal("");
    } else {
      setNotepadText("");
    }
  };

  const handleSubmitExercise = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputVal.trim()) return;

    const { isMatch } = compareRussianInput(inputVal, currentEx.targetAnswer);
    setIsCorrect(isMatch);
    setSubmitted(true);
  };

  const handleNextExercise = () => {
    setSubmitted(false);
    setIsCorrect(false);
    setShowHint(false);
    setInputVal("");
    setExerciseIndex((i) => (i < WRITING_EXERCISES.length - 1 ? i + 1 : 0));
  };

  const copyNotepad = () => {
    navigator.clipboard.writeText(notepadText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <PenTool className="text-primary" size={26} />
            <h1 className="text-3xl font-serif font-bold">Laboratorio di Scrittura & Cirillico</h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Dettati ortografici, flessione attiva e digitazione assistita (layout Fonetico o Standard russo).
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex rounded-lg border bg-muted/40 p-1 text-xs">
          <button
            onClick={() => setActiveTab("exercises")}
            className={`rounded-md px-3 py-1.5 font-medium transition-colors ${
              activeTab === "exercises"
                ? "bg-card text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Esercizi & Dettati ({WRITING_EXERCISES.length})
          </button>
          <button
            onClick={() => setActiveTab("notepad")}
            className={`rounded-md px-3 py-1.5 font-medium transition-colors ${
              activeTab === "notepad"
                ? "bg-card text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Blocco Note & Tastiera Libera
          </button>
        </div>
      </div>

      {activeTab === "exercises" ? (
        /* EXERCISE MODE */
        <div className="space-y-6">
          <div className="panel p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="badge badge-outline">Livello {currentEx.level}</span>
                <span className="font-medium text-foreground">{currentEx.title}</span>
              </div>
              <span>Esercizio {exerciseIndex + 1} di {WRITING_EXERCISES.length}</span>
            </div>

            {/* Prompt & Dictation Audio */}
            <div className="space-y-3">
              <p className="text-base sm:text-lg font-medium text-foreground leading-relaxed">
                {currentEx.prompt}
              </p>

              {currentEx.audioText && (
                <div className="rounded-xl border bg-primary/5 p-4 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-primary block">
                      Audio Dettato (ascolta e digita ciò che senti):
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Usa la velocità rallentata per distinguere le vocali atone e le consonanti dolci.
                    </span>
                  </div>
                  <SpeakButton
                    text={currentEx.audioText}
                    size={22}
                    showSlowToggle
                    label="Ascolta Dettato"
                  />
                </div>
              )}

              {/* Hint button */}
              {currentEx.hint && (
                <div className="text-xs">
                  {!showHint ? (
                    <button
                      type="button"
                      onClick={() => setShowHint(true)}
                      className="text-muted-foreground hover:text-primary flex items-center gap-1"
                    >
                      <HelpCircle size={14} />
                      <span>Mostra suggerimento</span>
                    </button>
                  ) : (
                    <div className="rounded-md bg-amber-500/10 border border-amber-500/20 p-2.5 text-amber-800 dark:text-amber-200">
                      💡 <strong>Suggerimento:</strong> {currentEx.hint}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmitExercise} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">
                  La tua risposta in cirillico (digita o clicca sulla tastiera qui sotto):
                </label>
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    disabled={submitted}
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="Digita qui in cirillico..."
                    className="flex-1 rounded-xl border bg-background px-4 py-3 text-lg font-serif focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                  {!submitted ? (
                    <button
                      type="submit"
                      disabled={!inputVal.trim()}
                      className="btn btn-primary px-6 text-sm"
                    >
                      Verifica
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleNextExercise}
                      className="btn btn-primary px-6 text-sm flex items-center gap-1.5"
                    >
                      <span>Prossimo</span>
                      <ArrowRight size={16} />
                    </button>
                  )}
                </div>
              </div>
            </form>

            {/* Submission Result Banner */}
            {submitted && (
              <div
                className={`rounded-xl border p-4 space-y-3 ${
                  isCorrect
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-950 dark:text-emerald-100"
                    : "bg-destructive/10 border-destructive/30 text-destructive-foreground"
                }`}
              >
                <div className="flex items-center gap-2 font-semibold">
                  {isCorrect ? (
                    <>
                      <CheckCircle2 className="text-emerald-600 dark:text-emerald-400" size={20} />
                      <span>Eccellente! Risposta corretta e ortografia esatta.</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="text-destructive" size={20} />
                      <span>Risposta non esatta: analizziamo le differenze.</span>
                    </>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-3 text-xs bg-card/60 p-3 rounded-lg border">
                  <div>
                    <span className="text-muted-foreground block mb-0.5">La tua risposta:</span>
                    <span className="font-mono text-sm font-semibold">{inputVal || "(vuoto)"}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block mb-0.5">Forma corretta attesa:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                        {currentEx.targetAnswer}
                      </span>
                      <SpeakButton text={currentEx.targetAnswer} size={15} />
                    </div>
                  </div>
                </div>

                <div className="text-xs leading-relaxed text-muted-foreground pt-1">
                  <strong>Spiegazione grammaticale:</strong> {currentEx.explanation}
                </div>
              </div>
            )}
          </div>

          {/* Integrated Interactive Keyboard */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground text-center">
              💡 Consiglio: Puoi usare sia i tasti a schermo sia la tastiera fisica del tuo computer!
            </p>
            <CyrillicKeyboard
              onInsert={handleKeyboardInsert}
              onBackspace={handleKeyboardBackspace}
              onClear={handleKeyboardClear}
              onEnter={!submitted ? () => handleSubmitExercise() : handleNextExercise}
            />
          </div>
        </div>
      ) : (
        /* NOTEPAD MODE */
        <div className="space-y-6">
          <div className="panel p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-semibold text-lg">Blocco Note Cirillico & Pratica Libera</h3>
                <p className="text-xs text-muted-foreground">
                  Componi testi in russo, prova la digitazione a mano libera e ascolta la sintesi vocale di ciò che scrivi.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={copyNotepad}
                  disabled={!notepadText}
                  className="btn btn-outline text-xs flex items-center gap-1.5"
                  title="Copia testo negli appunti"
                >
                  {copied ? <Check size={14} className="text-emerald-600" /> : <Clipboard size={14} />}
                  <span>{copied ? "Copiato!" : "Copia"}</span>
                </button>
                {notepadText && (
                  <SpeakButton text={notepadText} size={18} showSlowToggle label="Leggi ad alta voce" />
                )}
              </div>
            </div>

            <textarea
              ref={notepadRef}
              rows={6}
              value={notepadText}
              onChange={(e) => setNotepadText(e.target.value)}
              placeholder="Scrivi qui qualsiasi frase in cirillico usando la tastiera sottostante..."
              className="w-full rounded-xl border bg-background p-4 text-lg font-serif focus:ring-2 focus:ring-primary focus:outline-none"
            />

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{notepadText.length} caratteri · {notepadText.trim() ? notepadText.trim().split(/\s+/).length : 0} parole</span>
              <button
                type="button"
                onClick={() => setNotepadText("")}
                className="text-xs hover:text-destructive underline"
              >
                Cancella tutto
              </button>
            </div>
          </div>

          <CyrillicKeyboard
            onInsert={handleKeyboardInsert}
            onBackspace={handleKeyboardBackspace}
            onClear={handleKeyboardClear}
          />
        </div>
      )}
    </div>
  );
}
