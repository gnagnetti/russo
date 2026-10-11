import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Compass,
  Search,
  BookOpen,
  Sparkles,
  ArrowRight,
  Layers,
  HelpCircle,
  Volume2,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { SpeakButton } from "@/components/SpeakButton";
import {
  NOUN_PARADIGMS,
  VERB_PARADIGMS,
  MOTION_VERB_PAIRS,
  MOTION_PREFIXES,
  type NounDeclension,
  type VerbConjugation,
} from "@/lib/declensions-data";

export const Route = createFileRoute("/declinatore")({
  head: () => ({
    meta: [
      { title: "Declinatore & Coniugatore Universale Russo — ТРКИ Master" },
      { name: "description", content: "Tabelle dei 6 casi russi, genitivo plurale, coniugazioni verbali e matrice dei verbi di moto." },
    ],
  }),
  component: () => (
    <AppShell>
      <DeclensionEngineView />
    </AppShell>
  ),
});

const CASES = [
  { code: "nom", name: "Именительный (Nominativo)", question: "Кто? Что?", prep: "—" },
  { code: "gen", name: "Родительный (Genitivo)", question: "Кого? Чего?", prep: "без, для, до, из, от, у, с" },
  { code: "dat", name: "Дательный (Dativo)", question: "Кому? Чему?", prep: "к (ко), по, благодаря" },
  { code: "acc", name: "Винительный (Accusativo)", question: "Кого? Что?", prep: "в, на, за, под (moto a luogo)" },
  { code: "ins", name: "Творительный (Strumentale)", question: "Кем? Чем?", prep: "с (со), над, под, перед, за" },
  { code: "prep", name: "Предложный (Prepositivo)", question: "О ком? О чём? Где?", prep: "в, на (stato in luogo), о (об/обо)" },
] as const;

function DeclensionEngineView() {
  const [activeTab, setActiveTab] = useState<"nouns" | "verbs" | "motion">("nouns");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNounId, setSelectedNounId] = useState<string>(NOUN_PARADIGMS[0].id);
  const [selectedVerbId, setSelectedVerbId] = useState<string>(VERB_PARADIGMS[0].id);

  const selectedNoun = useMemo(() => {
    return NOUN_PARADIGMS.find((n) => n.id === selectedNounId) || NOUN_PARADIGMS[0];
  }, [selectedNounId]);

  const selectedVerb = useMemo(() => {
    return VERB_PARADIGMS.find((v) => v.id === selectedVerbId) || VERB_PARADIGMS[0];
  }, [selectedVerbId]);

  const filteredNouns = useMemo(() => {
    if (!searchTerm.trim()) return NOUN_PARADIGMS;
    const q = searchTerm.toLowerCase();
    return NOUN_PARADIGMS.filter(
      (n) => n.word.toLowerCase().includes(q) || n.translation.toLowerCase().includes(q)
    );
  }, [searchTerm]);

  const filteredVerbs = useMemo(() => {
    if (!searchTerm.trim()) return VERB_PARADIGMS;
    const q = searchTerm.toLowerCase();
    return VERB_PARADIGMS.filter(
      (v) => v.infinitive.toLowerCase().includes(q) || v.translation.toLowerCase().includes(q)
    );
  }, [searchTerm]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="text-primary" size={26} />
            <h1 className="text-3xl font-serif font-bold">Declinatore & Coniugatore Universale</h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Tavole complete dei 6 casi russi, analisi del Genitivo Plurale e matrice dei Verbi di Moto.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex rounded-lg border bg-muted/40 p-1 text-xs">
          <button
            onClick={() => { setActiveTab("nouns"); setSearchTerm(""); }}
            className={`rounded-md px-3 py-1.5 font-medium transition-colors ${
              activeTab === "nouns" ? "bg-card text-foreground shadow-xs font-semibold" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Declinazione Sostantivi
          </button>
          <button
            onClick={() => { setActiveTab("verbs"); setSearchTerm(""); }}
            className={`rounded-md px-3 py-1.5 font-medium transition-colors ${
              activeTab === "verbs" ? "bg-card text-foreground shadow-xs font-semibold" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Coniugazione Verbi
          </button>
          <button
            onClick={() => { setActiveTab("motion"); setSearchTerm(""); }}
            className={`rounded-md px-3 py-1.5 font-medium transition-colors ${
              activeTab === "motion" ? "bg-card text-foreground shadow-xs font-semibold" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Verbi di Moto & Prefissi
          </button>
        </div>
      </div>

      {/* --- TAB 1: NOUNS --- */}
      {activeTab === "nouns" && (
        <div className="space-y-6">
          {/* Quick Select & Search */}
          <div className="panel p-4 space-y-3">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Seleziona paradigma o cerca sostantivo:
              </span>
              <div className="relative w-full sm:w-64">
                <Search size={14} className="absolute left-3 top-2.5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Cerca parola o significato..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-md border bg-background pl-8 pr-3 py-1.5 text-xs"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {filteredNouns.map((n) => (
                <button
                  key={n.id}
                  onClick={() => setSelectedNounId(n.id)}
                  className={`rounded-md border px-3 py-1 text-xs font-medium transition-all ${
                    selectedNoun.id === n.id
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background hover:bg-muted text-foreground"
                  }`}
                >
                  {n.word} <span className="opacity-70 text-[10px]">({n.gender[0]})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Noun Declension Card */}
          <div className="panel p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b pb-4">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-3xl font-serif font-bold text-primary">{selectedNoun.word}</h2>
                  <SpeakButton text={selectedNoun.word} size={20} showSlowToggle />
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">
                  👉 {selectedNoun.translation} · <span className="font-medium text-foreground">{selectedNoun.gender}</span> ({selectedNoun.declensionType})
                </p>
              </div>

              <div className="text-xs text-muted-foreground bg-muted/60 p-2.5 rounded-lg max-w-sm">
                <strong>Caratteristica:</strong> {selectedNoun.notes}
              </div>
            </div>

            {/* Cases Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b bg-muted/40 text-muted-foreground font-semibold">
                    <th className="py-2.5 px-3">Caso Russo</th>
                    <th className="py-2.5 px-3">Domanda</th>
                    <th className="py-2.5 px-3">Singolare</th>
                    <th className="py-2.5 px-3">Plurale</th>
                    <th className="py-2.5 px-3 hidden md:table-cell">Preposizioni d'uso</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {CASES.map((c) => {
                    const sing = selectedNoun.singular[c.code as keyof typeof selectedNoun.singular];
                    const plur = selectedNoun.plural[c.code as keyof typeof selectedNoun.plural];
                    return (
                      <tr key={c.code} className="hover:bg-muted/30 transition-colors">
                        <td className="py-2.5 px-3 font-semibold text-foreground">
                          {c.name}
                        </td>
                        <td className="py-2.5 px-3 text-muted-foreground italic">
                          {c.question}
                        </td>
                        <td className="py-2.5 px-3 font-serif font-medium text-primary">
                          <div className="flex items-center gap-1.5">
                            <span>{sing}</span>
                            <SpeakButton text={sing} size={13} />
                          </div>
                        </td>
                        <td className="py-2.5 px-3 font-serif font-medium text-primary">
                          <div className="flex items-center gap-1.5">
                            <span>{plur}</span>
                            <SpeakButton text={plur} size={13} />
                          </div>
                        </td>
                        <td className="py-2.5 px-3 text-xs text-muted-foreground hidden md:table-cell">
                          {c.prep}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Genitive Plural Special Focus Card */}
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 space-y-1.5">
              <div className="flex items-center gap-2 text-amber-800 dark:text-amber-200 font-semibold text-xs sm:text-sm">
                <Sparkles size={16} />
                <span>Focus ТРКИ: Come si forma il Genitivo Plurale di questo termine?</span>
              </div>
              <p className="text-xs text-amber-900/90 dark:text-amber-200/90 leading-relaxed">
                Forma: <strong className="font-serif text-sm">{selectedNoun.plural.gen}</strong>. {selectedNoun.genitivePluralRule}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 2: VERBS --- */}
      {activeTab === "verbs" && (
        <div className="space-y-6">
          <div className="panel p-4 space-y-3">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Seleziona o cerca verbo:
              </span>
              <div className="relative w-full sm:w-64">
                <Search size={14} className="absolute left-3 top-2.5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Cerca verbo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-md border bg-background pl-8 pr-3 py-1.5 text-xs"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {filteredVerbs.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVerbId(v.id)}
                  className={`rounded-md border px-3 py-1 text-xs font-medium transition-all ${
                    selectedVerb.id === v.id
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background hover:bg-muted text-foreground"
                  }`}
                >
                  {v.infinitive}
                </button>
              ))}
            </div>
          </div>

          <div className="panel p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b pb-4">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-3xl font-serif font-bold text-primary">{selectedVerb.infinitive}</h2>
                  <SpeakButton text={selectedVerb.infinitive} size={20} showSlowToggle />
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">
                  👉 {selectedVerb.translation} · <span className="font-medium text-foreground">{selectedVerb.aspect}</span>
                </p>
                {selectedVerb.pair && (
                  <div className="text-xs text-primary font-medium mt-1">
                    Coppia aspettuale: <strong>{selectedVerb.pair}</strong>
                  </div>
                )}
              </div>

              <div className="text-xs text-muted-foreground bg-muted/60 p-2.5 rounded-lg max-w-sm">
                <strong>Paradigma:</strong> {selectedVerb.notes}
              </div>
            </div>

            {/* Conjugation tables */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Present / Future */}
              <div className="rounded-xl border bg-card p-4 space-y-3">
                <h3 className="font-semibold text-sm border-b pb-2 flex items-center justify-between">
                  <span>Presente / Futuro Semplice</span>
                  <span className="text-xs text-muted-foreground font-normal">{selectedVerb.conjugationType}</span>
                </h3>

                <div className="space-y-2 text-sm font-serif">
                  {[
                    ["я (io)", selectedVerb.presentOrFuture.ya],
                    ["ты (tu)", selectedVerb.presentOrFuture.ty],
                    ["он/она (lui/lei)", selectedVerb.presentOrFuture.on],
                    ["мы (noi)", selectedVerb.presentOrFuture.my],
                    ["вы (voi / Lei)", selectedVerb.presentOrFuture.vy],
                    ["они (loro)", selectedVerb.presentOrFuture.oni],
                  ].map(([person, form]) => (
                    <div key={person} className="flex items-center justify-between py-1 border-b border-border/50">
                      <span className="text-xs font-sans text-muted-foreground">{person}</span>
                      <div className="flex items-center gap-1.5 font-semibold text-primary">
                        <span>{form}</span>
                        <SpeakButton text={form} size={13} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Past & Imperative */}
              <div className="space-y-4">
                <div className="rounded-xl border bg-card p-4 space-y-3">
                  <h3 className="font-semibold text-sm border-b pb-2">
                    Passato (Прошедшее время)
                  </h3>
                  <div className="space-y-2 text-sm font-serif">
                    {[
                      ["Maschile (он)", selectedVerb.past.m],
                      ["Femminile (она)", selectedVerb.past.f],
                      ["Neutro (оно)", selectedVerb.past.n],
                      ["Plurale (они)", selectedVerb.past.pl],
                    ].map(([gender, form]) => (
                      <div key={gender} className="flex items-center justify-between py-1 border-b border-border/50">
                        <span className="text-xs font-sans text-muted-foreground">{gender}</span>
                        <div className="flex items-center gap-1.5 font-semibold text-primary">
                          <span>{form}</span>
                          <SpeakButton text={form} size={13} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border bg-card p-4 space-y-2">
                  <h3 className="font-semibold text-sm border-b pb-2">
                    Imperativo (Повелительное наклонение)
                  </h3>
                  <div className="flex items-center justify-around py-2 text-sm font-serif">
                    <div className="text-center">
                      <span className="text-xs font-sans text-muted-foreground block">Tu (ты):</span>
                      <div className="flex items-center gap-1 justify-center font-bold text-primary mt-1">
                        <span>{selectedVerb.imperative.ty}</span>
                        <SpeakButton text={selectedVerb.imperative.ty} size={13} />
                      </div>
                    </div>
                    <div className="text-center">
                      <span className="text-xs font-sans text-muted-foreground block">Voi / Cortesia (вы):</span>
                      <div className="flex items-center gap-1 justify-center font-bold text-primary mt-1">
                        <span>{selectedVerb.imperative.vy}</span>
                        <SpeakButton text={selectedVerb.imperative.vy} size={13} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 3: MOTION VERBS & PREFIXES --- */}
      {activeTab === "motion" && (
        <div className="space-y-6">
          {/* Unidirectional vs Pluridirectional Table */}
          <div className="panel p-6 space-y-4">
            <div>
              <h2 className="text-xl font-serif font-bold text-primary">
                Coppie Base dei Verbi di Moto (Глаголы движения)
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                La distinzione fondamentale tra moto in una direzione (unidirezionale) e moto ripetuto / andata e ritorno (pluridirezionale).
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b bg-muted/40 text-muted-foreground font-semibold">
                    <th className="py-2.5 px-3">Tipo / Mezzo</th>
                    <th className="py-2.5 px-3">Unidirezionale (&rarr;)</th>
                    <th className="py-2.5 px-3">Pluridirezionale (&harr;)</th>
                    <th className="py-2.5 px-3">Significato</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {MOTION_VERB_PAIRS.map((pair) => (
                    <tr key={pair.id} className="hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-3 font-medium text-muted-foreground">
                        {pair.transportType}
                      </td>
                      <td className="py-3 px-3 font-serif font-semibold text-primary">
                        <div className="flex items-center gap-1.5">
                          <span>{pair.unidirectional}</span>
                          <SpeakButton text={pair.unidirectional.split(" ")[0]} size={13} />
                        </div>
                        <div className="text-[11px] font-sans font-normal text-muted-foreground mt-0.5">
                          {pair.exampleUni}
                        </div>
                      </td>
                      <td className="py-3 px-3 font-serif font-semibold text-primary">
                        <div className="flex items-center gap-1.5">
                          <span>{pair.multidirectional}</span>
                          <SpeakButton text={pair.multidirectional.split(" ")[0]} size={13} />
                        </div>
                        <div className="text-[11px] font-sans font-normal text-muted-foreground mt-0.5">
                          {pair.exampleMulti}
                        </div>
                      </td>
                      <td className="py-3 px-3 text-xs text-foreground font-medium">
                        {pair.translation}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Prefixes Matrix */}
          <div className="panel p-6 space-y-4">
            <div>
              <h2 className="text-xl font-serif font-bold text-primary">
                Matrice dei Prefissi Spaziali (Приставки движения)
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                Aggiungendo un prefisso a un verbo unidirezionale si ottiene un verbo perfettivo (СВ); a un pluridirezionale si ottiene un imperfettivo (НСВ).
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 text-xs">
              {MOTION_PREFIXES.map((p) => (
                <div key={p.prefix} className="rounded-xl border bg-card p-3.5 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-base font-bold text-primary">{p.prefix}</span>
                    <span className="badge badge-outline text-[10px]">Regge: {p.regency}</span>
                  </div>
                  <p className="font-medium text-foreground">{p.meaning}</p>
                  <div className="flex items-center justify-between pt-1 border-t text-muted-foreground italic font-serif">
                    <span>«{p.example}»</span>
                    <SpeakButton text={p.example} size={14} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
