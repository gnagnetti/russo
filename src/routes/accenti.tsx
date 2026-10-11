import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Sparkles,
  Volume2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  BookOpen,
  Award,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { SpeakButton } from "@/components/SpeakButton";
import {
  STRESS_CHALLENGES,
  HOMOGRAPH_PAIRS,
  type StressWordChallenge,
  type HomographPair,
} from "@/lib/accents-data";

export const Route = createFileRoute("/accenti")({
  head: () => ({
    meta: [
      { title: "Laboratorio di Accenti Tonici & Paronimi (Ударение) — ТРКИ Master" },
      { name: "description", content: "Esercitati sulle sillabe toniche, accenti mobili e coppie di omografi che cambiano significato in russo." },
    ],
  }),
  component: () => (
    <AppShell>
      <AccentsLabView />
    </AppShell>
  ),
});

function AccentsLabView() {
  const [activeTab, setActiveTab] = useState<"challenge" | "homographs">("challenge");

  // Challenge tab state
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [selectedVowelIndex, setSelectedVowelIndex] = useState<number | null>(null);
  const [submittedChallenge, setSubmittedChallenge] = useState(false);
  const [score, setScore] = useState(0);

  // Homograph tab state
  const [homographIdx, setHomographIdx] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<"A" | "B" | null>(null);
  const [submittedHomograph, setSubmittedHomograph] = useState(false);

  const currentChallenge = STRESS_CHALLENGES[challengeIdx] || STRESS_CHALLENGES[0];
  const currentHomograph = HOMOGRAPH_PAIRS[homographIdx] || HOMOGRAPH_PAIRS[0];

  const handleVowelClick = (charIndex: number) => {
    if (submittedChallenge) return;
    setSelectedVowelIndex(charIndex);
    setSubmittedChallenge(true);

    const isCorrect = currentChallenge.vowelIndices.find((v) => v.index === charIndex)?.isCorrect;
    if (isCorrect) setScore((s) => s + 10);
  };

  const nextChallenge = () => {
    setSelectedVowelIndex(null);
    setSubmittedChallenge(false);
    setChallengeIdx((i) => (i < STRESS_CHALLENGES.length - 1 ? i + 1 : 0));
  };

  const handleHomographSelect = (variant: "A" | "B") => {
    if (submittedHomograph) return;
    setSelectedVariant(variant);
    setSubmittedHomograph(true);
  };

  const nextHomograph = () => {
    setSelectedVariant(null);
    setSubmittedHomograph(false);
    setHomographIdx((i) => (i < HOMOGRAPH_PAIRS.length - 1 ? i + 1 : 0));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="text-primary" size={26} />
            <h1 className="text-3xl font-serif font-bold">Laboratorio di Accenti Tonici & Paronimi</h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            In russo l'accento (*Ударение*) è mobile e imprevedibile: un errore di accento può stravolgere il significato!
          </p>
        </div>

        <div className="flex rounded-lg border bg-muted/40 p-1 text-xs">
          <button
            onClick={() => setActiveTab("challenge")}
            className={`rounded-md px-3 py-1.5 font-medium transition-colors ${
              activeTab === "challenge"
                ? "bg-card text-foreground shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Indovina la Sillaba Tonica
          </button>
          <button
            onClick={() => setActiveTab("homographs")}
            className={`rounded-md px-3 py-1.5 font-medium transition-colors ${
              activeTab === "homographs"
                ? "bg-card text-foreground shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Omografi & Paronimi (Омографы)
          </button>
        </div>
      </div>

      {/* --- TAB 1: STRESS CHALLENGE --- */}
      {activeTab === "challenge" && (
        <div className="space-y-6">
          <div className="panel p-6 space-y-6">
            <div className="flex items-center justify-between border-b pb-3 text-xs text-muted-foreground">
              <span>Quesito {challengeIdx + 1} di {STRESS_CHALLENGES.length}</span>
              <div className="flex items-center gap-2">
                <Award size={15} className="text-primary" />
                <span>Punteggio accenti: <strong>{score}</strong> pt</span>
              </div>
            </div>

            <div className="text-center space-y-3">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">
                Clicca sulla vocale corretta su cui cade l'accento tonico:
              </span>
              <div className="text-sm font-medium text-muted-foreground">
                Significato: «{currentChallenge.translation}»
              </div>

              {/* Word Letters clickable */}
              <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 py-6">
                {currentChallenge.wordNoStress.split("").map((char, idx) => {
                  const vowelData = currentChallenge.vowelIndices.find((v) => v.index === idx);
                  const isVowel = !!vowelData;

                  let btnStyle = "border bg-card text-muted-foreground";
                  if (isVowel) {
                    if (!submittedChallenge) {
                      btnStyle = "border-primary/40 bg-primary/5 hover:bg-primary/20 text-primary cursor-pointer active:scale-95";
                    } else {
                      if (vowelData.isCorrect) {
                        btnStyle = "border-emerald-500 bg-emerald-500 text-white font-bold animate-bounce";
                      } else if (selectedVowelIndex === idx) {
                        btnStyle = "border-destructive bg-destructive text-destructive-foreground";
                      } else {
                        btnStyle = "opacity-40";
                      }
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={!isVowel || submittedChallenge}
                      onClick={() => handleVowelClick(idx)}
                      className={`h-12 w-10 sm:h-16 sm:w-14 rounded-xl text-2xl sm:text-3xl font-serif font-bold transition-all flex items-center justify-center ${btnStyle}`}
                      title={isVowel ? `Seleziona '${char}' come vocale tonica` : undefined}
                    >
                      {char}
                      {submittedChallenge && vowelData?.isCorrect && (
                        <span className="absolute -top-3 text-xs text-emerald-600 font-sans">́</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Explanation & Result */}
            {submittedChallenge && (
              <div className="rounded-xl border bg-muted/40 p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b pb-3">
                  <div className="flex items-center gap-2">
                    {currentChallenge.vowelIndices.find((v) => v.index === selectedVowelIndex)?.isCorrect ? (
                      <>
                        <CheckCircle2 className="text-emerald-600" size={22} />
                        <span className="font-semibold text-emerald-800 dark:text-emerald-200">
                          Accento Esatto! La pronuncia corretta è:
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle className="text-destructive" size={22} />
                        <span className="font-semibold text-destructive">
                          Accento errato. La forma corretta è:
                        </span>
                      </>
                    )}
                    <span className="text-xl font-serif font-bold text-primary ml-1">
                      {currentChallenge.wordWithStress}
                    </span>
                  </div>

                  <SpeakButton text={currentChallenge.wordWithStress} size={18} showSlowToggle label="Ascolta Accento" />
                </div>

                <div className="text-xs leading-relaxed text-muted-foreground space-y-2">
                  <p>
                    <strong>Regola ortoepica:</strong> {currentChallenge.ruleExplanation}
                  </p>
                  <p className="font-serif italic text-foreground text-sm pt-1">
                    «{currentChallenge.exampleSentence}»
                  </p>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={nextChallenge}
                    className="btn btn-primary text-xs flex items-center gap-1.5"
                  >
                    <span>Prossima Parola</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- TAB 2: HOMOGRAPHS & PARONYMS --- */}
      {activeTab === "homographs" && (
        <div className="space-y-6">
          <div className="panel p-6 space-y-6">
            <div className="flex items-center justify-between border-b pb-3 text-xs text-muted-foreground">
              <span>Coppia {homographIdx + 1} di {HOMOGRAPH_PAIRS.length}</span>
              <span className="badge badge-outline">Parola Base: {currentHomograph.baseWord}</span>
            </div>

            {/* Context Quiz Prompt */}
            <div className="space-y-3">
              <h3 className="text-base sm:text-lg font-semibold text-foreground">
                {currentHomograph.quizPrompt}
              </h3>
              <p className="text-xs text-muted-foreground">
                Scegli la variante con l'accento tonico e il significato adeguato al contesto:
              </p>
            </div>

            {/* Two Choices */}
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { key: "A", data: currentHomograph.variantA },
                { key: "B", data: currentHomograph.variantB },
              ].map(({ key, data }) => {
                const isChosen = selectedVariant === key;
                const isCorrect = currentHomograph.correctVariant === key;

                let borderCls = "border-border hover:border-primary/50";
                if (submittedHomograph) {
                  if (isCorrect) borderCls = "border-emerald-500 bg-emerald-500/10";
                  else if (isChosen) borderCls = "border-destructive bg-destructive/10";
                  else borderCls = "opacity-50";
                }

                return (
                  <button
                    key={key}
                    type="button"
                    disabled={submittedHomograph}
                    onClick={() => handleHomographSelect(key as "A" | "B")}
                    className={`rounded-xl border p-5 text-left transition-all space-y-3 ${borderCls}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-serif font-bold text-primary">
                        {data.stressedWord}
                      </span>
                      <div onClick={(e) => e.stopPropagation()}>
                        <SpeakButton text={data.stressedWord} size={16} />
                      </div>
                    </div>
                    <p className="text-xs font-medium text-foreground">
                      Significato: {data.meaning}
                    </p>
                    <div className="rounded-md bg-muted/60 p-2 text-[11px] text-muted-foreground italic font-serif">
                      «{data.exampleRu}»
                      <div className="text-[10px] text-muted-foreground/80 not-italic mt-0.5">
                        {data.exampleIt}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Homograph Explanation */}
            {submittedHomograph && (
              <div className="rounded-xl border bg-muted/40 p-4 space-y-3">
                <div className="flex items-center gap-2 font-semibold text-xs sm:text-sm">
                  {selectedVariant === currentHomograph.correctVariant ? (
                    <>
                      <CheckCircle2 className="text-emerald-600" size={18} />
                      <span className="text-emerald-800 dark:text-emerald-200">
                        Perfetto! Hai selezionato l'omografo corretto per questo contesto.
                      </span>
                    </>
                  ) : (
                    <>
                      <XCircle className="text-destructive" size={18} />
                      <span className="text-destructive">
                        Attenzione allo spostamento d'accento che cambia totalmente il significato!
                      </span>
                    </>
                  )}
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {currentHomograph.explanation}
                </p>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={nextHomograph}
                    className="btn btn-primary text-xs flex items-center gap-1.5"
                  >
                    <span>Prossima Coppia</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
