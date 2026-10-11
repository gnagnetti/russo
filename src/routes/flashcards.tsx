import { useState, useEffect, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  RotateCcw,
  Sparkles,
  Layers,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Shuffle,
  Volume2,
  HelpCircle,
  Filter,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useUser } from "@/context/UserContext";
import { SpeakButton } from "@/components/SpeakButton";
import { INITIAL_FLASHCARDS, type Flashcard } from "@/lib/flashcards-data";
import { LEVELS, type Level } from "@/lib/types";

export const Route = createFileRoute("/flashcards")({
  head: () => ({
    meta: [
      { title: "Flashcard Vocabolario ТРКИ — Ripetizione Spaziata (SRS)" },
      { name: "description", content: "Memorizza il vocabolario russo con il sistema Leitner SRS e audio nativo senza API key." },
    ],
  }),
  component: () => (
    <AppShell>
      <FlashcardsView />
    </AppShell>
  ),
});

interface UserCardProgress {
  box: number; // 1 to 5
  lastReviewed: number;
}

const STORAGE_KEY = "trki-master:flashcards-progress";
const CUSTOM_CARDS_KEY = "trki-master:custom-flashcards";

function FlashcardsView() {
  const { user } = useUser();
  const [selectedLevel, setSelectedLevel] = useState<string>("ALL");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // Load progress & custom cards from localStorage
  const [progressMap, setProgressMap] = useState<Record<string, UserCardProgress>>({});
  const [customCards, setCustomCards] = useState<Flashcard[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setProgressMap(JSON.parse(saved));
    } catch {
      // ignore
    }

    try {
      const savedCustom = localStorage.getItem(CUSTOM_CARDS_KEY);
      if (savedCustom) setCustomCards(JSON.parse(savedCustom));
    } catch {
      // ignore
    }
  }, []);

  const allCards = useMemo(() => {
    return [...INITIAL_FLASHCARDS, ...customCards];
  }, [customCards]);

  const filteredCards = useMemo(() => {
    return allCards.filter((card) => {
      if (selectedLevel !== "ALL" && card.level !== selectedLevel) return false;
      if (selectedCategory !== "ALL" && card.category !== selectedCategory) return false;
      return true;
    });
  }, [allCards, selectedLevel, selectedCategory]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    allCards.forEach((c) => set.add(c.category));
    return Array.from(set);
  }, [allCards]);

  // Current card
  const currentCard = filteredCards[cardIndex] || filteredCards[0];
  const currentBox = currentCard ? progressMap[currentCard.id]?.box || 1 : 1;

  // Box statistics
  const boxStats = useMemo(() => {
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    filteredCards.forEach((c) => {
      const b = (progressMap[c.id]?.box || 1) as 1 | 2 | 3 | 4 | 5;
      counts[b] = (counts[b] || 0) + 1;
    });
    return counts;
  }, [filteredCards, progressMap]);

  const updateCardBox = (delta: "reset" | "stay" | "advance" | "master") => {
    if (!currentCard) return;

    let newBox = currentBox;
    if (delta === "reset") newBox = 1;
    else if (delta === "stay") newBox = currentBox;
    else if (delta === "advance") newBox = Math.min(5, currentBox + 1);
    else if (delta === "master") newBox = 5;

    const nextProgress = {
      ...progressMap,
      [currentCard.id]: { box: newBox, lastReviewed: Date.now() },
    };

    setProgressMap(nextProgress);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextProgress));

    // Advance to next card
    setIsFlipped(false);
    if (cardIndex < filteredCards.length - 1) {
      setCardIndex((i) => i + 1);
    } else {
      setCardIndex(0);
    }
  };

  const shuffleCards = () => {
    setIsFlipped(false);
    setCardIndex(Math.floor(Math.random() * Math.max(1, filteredCards.length)));
  };

  // Add custom card
  const [newTerm, setNewTerm] = useState("");
  const [newTranslation, setNewTranslation] = useState("");
  const [newLevel, setNewLevel] = useState<Level>("A2");
  const [newCategory, setNewCategory] = useState("Vocabolario Personale");
  const [newExampleRu, setNewExampleRu] = useState("");
  const [newExampleIt, setNewExampleIt] = useState("");
  const [newGrammar, setNewGrammar] = useState("");

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTerm || !newTranslation) return;

    const newCard: Flashcard = {
      id: "custom-" + Date.now(),
      level: newLevel,
      category: newCategory,
      term: newTerm,
      partOfSpeech: "termine personalizzato",
      translation: newTranslation,
      exampleRu: newExampleRu || newTerm,
      exampleIt: newExampleIt || newTranslation,
      grammarNotes: newGrammar || "Nota aggiunta dall'utente.",
    };

    const updated = [newCard, ...customCards];
    setCustomCards(updated);
    localStorage.setItem(CUSTOM_CARDS_KEY, JSON.stringify(updated));
    setShowAddModal(false);
    setNewTerm("");
    setNewTranslation("");
    setNewExampleRu("");
    setNewExampleIt("");
    setNewGrammar("");
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="text-primary" size={26} />
            <h1 className="text-3xl font-serif font-bold">Flashcard & Ripetizione Spaziata</h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Algoritmo Leitner a 5 livelli (SRS) con audio nativo integrato · Zero API key necessarie.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="btn btn-outline text-xs flex items-center gap-1.5"
          >
            <Plus size={15} />
            <span>Nuova Carta</span>
          </button>
          <button
            onClick={shuffleCards}
            className="btn btn-outline text-xs flex items-center gap-1.5"
            title="Mescola l'ordine delle carte"
          >
            <Shuffle size={15} />
            <span>Mescola</span>
          </button>
        </div>
      </div>

      {/* Leitner Box Progress Bar */}
      <div className="panel p-4 bg-muted/30">
        <div className="flex items-center justify-between text-xs font-medium text-muted-foreground mb-2">
          <span>Stato Scatole Leitner (SRS)</span>
          <span>{filteredCards.length} carte in questa selezione</span>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {[
            { box: 1, label: "Box 1: Nuove / Da ripassare", color: "bg-red-500/20 text-red-700 dark:text-red-300 border-red-500/30" },
            { box: 2, label: "Box 2: Inizio studio", color: "bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30" },
            { box: 3, label: "Box 3: Consolidamento", color: "bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/30" },
            { box: 4, label: "Box 4: Memoria stabile", color: "bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-500/30" },
            { box: 5, label: "Box 5: Padroneggiate", color: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30" },
          ].map(({ box, label, color }) => (
            <div
              key={box}
              className={`rounded-lg border p-2 text-center text-xs transition-all ${color}`}
            >
              <div className="font-bold text-base sm:text-lg">{boxStats[box as 1|2|3|4|5] || 0}</div>
              <div className="text-[10px] truncate" title={label}>B{box}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 text-xs">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Filter size={14} />
          <span>Filtri:</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => { setSelectedLevel("ALL"); setCardIndex(0); }}
            className={`px-2.5 py-1 rounded-md border ${
              selectedLevel === "ALL" ? "bg-primary text-primary-foreground font-semibold" : "bg-card hover:bg-muted"
            }`}
          >
            Tutti i Livelli
          </button>
          {LEVELS.map((lvl) => (
            <button
              key={lvl}
              onClick={() => { setSelectedLevel(lvl); setCardIndex(0); }}
              className={`px-2 py-1 rounded-md border ${
                selectedLevel === lvl ? "bg-primary text-primary-foreground font-semibold" : "bg-card hover:bg-muted"
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => { setSelectedCategory(e.target.value); setCardIndex(0); }}
          className="rounded-md border bg-card px-2 py-1 text-xs"
        >
          <option value="ALL">Tutte le categorie</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Interactive Card */}
      {filteredCards.length === 0 ? (
        <div className="panel p-12 text-center text-muted-foreground space-y-3">
          <p>Nessuna carta corrisponde ai filtri selezionati.</p>
          <button
            onClick={() => { setSelectedLevel("ALL"); setSelectedCategory("ALL"); }}
            className="btn btn-primary text-xs"
          >
            Mostra tutte le carte
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
            <span>Carta {cardIndex + 1} di {filteredCards.length}</span>
            <div className="flex items-center gap-2">
              <span className="badge badge-outline">Livello {currentCard.level}</span>
              <span className="badge bg-primary/10 text-primary border-primary/20">Box Leitner {currentBox}</span>
            </div>
          </div>

          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="relative cursor-pointer min-h-[340px] rounded-2xl border-2 bg-gradient-to-br from-card via-card to-muted/30 p-6 sm:p-8 shadow-md hover:shadow-lg transition-all flex flex-col justify-between"
          >
            {/* Top info */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {currentCard.category} · {currentCard.partOfSpeech}
              </span>
              <div onClick={(e) => e.stopPropagation()}>
                <SpeakButton text={currentCard.term} size={20} showSlowToggle label="Pronuncia" />
              </div>
            </div>

            {/* Main content: Front or Back */}
            <div className="py-6 text-center space-y-4">
              {!isFlipped ? (
                /* FRONTE */
                <div className="space-y-4">
                  <h2 className="text-4xl sm:text-5xl font-serif font-bold tracking-wide text-foreground">
                    {currentCard.term}
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Clicca ovunque sulla carta per scoprire la traduzione e le note grammaticali
                  </p>

                  <div className="mt-6 rounded-xl border bg-muted/40 p-4 max-w-lg mx-auto text-left space-y-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Esempio d'uso in contesto:</span>
                      <div onClick={(e) => e.stopPropagation()}>
                        <SpeakButton text={currentCard.exampleRu} size={15} />
                      </div>
                    </div>
                    <p className="text-base font-serif italic text-foreground">
                      «{currentCard.exampleRu}»
                    </p>
                  </div>
                </div>
              ) : (
                /* RETRO */
                <div className="space-y-4 text-left max-w-xl mx-auto">
                  <div className="text-center pb-2 border-b">
                    <div className="text-2xl sm:text-3xl font-serif font-bold text-primary">
                      {currentCard.term}
                    </div>
                    <div className="text-lg font-medium text-foreground mt-1">
                      👉 {currentCard.translation}
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="rounded-lg bg-muted/60 p-3">
                      <div className="text-xs font-semibold text-muted-foreground mb-1">Traduzione Esempio:</div>
                      <div className="italic text-foreground">«{currentCard.exampleIt}»</div>
                    </div>

                    <div className="rounded-lg bg-primary/5 border border-primary/20 p-3">
                      <div className="text-xs font-semibold text-primary mb-1 flex items-center gap-1.5">
                        <Sparkles size={14} />
                        <span>Note Grammatiche & Reggenza ТРКИ:</span>
                      </div>
                      <div className="text-xs text-muted-foreground leading-relaxed">
                        {currentCard.grammarNotes}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom prompt */}
            <div className="flex items-center justify-center text-xs text-muted-foreground pt-4 border-t">
              <span className="flex items-center gap-1.5">
                <RotateCcw size={14} />
                <span>{isFlipped ? "Clicca per tornare al fronte" : "Clicca per mostrare il retro"}</span>
              </span>
            </div>
          </div>

          {/* Leitner Actions (Only visible after flip or always accessible) */}
          <div className="panel p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-muted-foreground text-center sm:text-left">
              Come ricordavi questa parola?
            </span>
            <div className="flex flex-wrap items-center gap-2 justify-center">
              <button
                type="button"
                onClick={() => updateCardBox("reset")}
                className="btn btn-outline border-destructive/40 text-destructive hover:bg-destructive/10 text-xs px-3 py-1.5"
                title="Non la sapevo: ricomincia da Box 1"
              >
                ❌ Non la so (Box 1)
              </button>
              <button
                type="button"
                onClick={() => updateCardBox("stay")}
                className="btn btn-outline border-amber-500/40 text-amber-700 dark:text-amber-300 hover:bg-amber-500/10 text-xs px-3 py-1.5"
                title="Incerto: resta nel Box attuale"
              >
                ⚠️ Difficile
              </button>
              <button
                type="button"
                onClick={() => updateCardBox("advance")}
                className="btn btn-outline border-primary/40 text-primary hover:bg-primary/10 text-xs px-3 py-1.5 font-semibold"
                title="Ricordata bene: avanza di 1 Box"
              >
                ✅ Buono (+1 Box)
              </button>
              <button
                type="button"
                onClick={() => updateCardBox("master")}
                className="btn btn-primary text-xs px-3 py-1.5"
                title="La so alla perfezione: sposta in Box 5"
              >
                🏆 Padroneggiato
              </button>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between text-xs">
            <button
              onClick={() => {
                setIsFlipped(false);
                setCardIndex((i) => (i > 0 ? i - 1 : filteredCards.length - 1));
              }}
              className="btn btn-outline text-xs"
            >
              ← Carta precedente
            </button>
            <button
              onClick={() => {
                setIsFlipped(false);
                setCardIndex((i) => (i < filteredCards.length - 1 ? i + 1 : 0));
              }}
              className="btn btn-outline text-xs"
            >
              Carta successiva →
            </button>
          </div>
        </div>
      )}

      {/* Add Custom Card Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-lg rounded-2xl border bg-card p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-semibold text-lg">Crea Nuova Flashcard</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="rounded p-1 hover:bg-muted text-muted-foreground"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddCard} className="space-y-3 text-xs">
              <div>
                <label className="font-medium text-foreground block mb-1">
                  Parola o Espressione in Russo (con accenti se desideri):
                </label>
                <input
                  type="text"
                  required
                  placeholder="Es. соба́ка"
                  value={newTerm}
                  onChange={(e) => setNewTerm(e.target.value)}
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="font-medium text-foreground block mb-1">Traduzione in Italiano:</label>
                <input
                  type="text"
                  required
                  placeholder="Es. cane (sostantivo femminile)"
                  value={newTranslation}
                  onChange={(e) => setNewTranslation(e.target.value)}
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-medium text-foreground block mb-1">Livello:</label>
                  <select
                    value={newLevel}
                    onChange={(e) => setNewLevel(e.target.value as Level)}
                    className="w-full rounded-md border bg-background px-3 py-2"
                  >
                    {LEVELS.map((lvl) => (
                      <option key={lvl} value={lvl}>{lvl}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-medium text-foreground block mb-1">Categoria:</label>
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full rounded-md border bg-background px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="font-medium text-foreground block mb-1">Frase di esempio in russo:</label>
                <input
                  type="text"
                  placeholder="Es. У меня́ есть ма́ленькая соба́ка."
                  value={newExampleRu}
                  onChange={(e) => setNewExampleRu(e.target.value)}
                  className="w-full rounded-md border bg-background px-3 py-2"
                />
              </div>

              <div>
                <label className="font-medium text-foreground block mb-1">Traduzione dell'esempio:</label>
                <input
                  type="text"
                  placeholder="Es. Ho un cane piccolo."
                  value={newExampleIt}
                  onChange={(e) => setNewExampleIt(e.target.value)}
                  className="w-full rounded-md border bg-background px-3 py-2"
                />
              </div>

              <div>
                <label className="font-medium text-foreground block mb-1">Note grammaticali / Reggenza:</label>
                <textarea
                  placeholder="Es. I declinazione femminile, Genitivo plurale: соба́к (desinenza zero)."
                  value={newGrammar}
                  onChange={(e) => setNewGrammar(e.target.value)}
                  rows={2}
                  className="w-full rounded-md border bg-background px-3 py-2"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn btn-outline"
                >
                  Annulla
                </button>
                <button type="submit" className="btn btn-primary">
                  Salva Carta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
