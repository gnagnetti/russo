import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BookOpen, Search, FileText, CheckCircle2, AlertCircle, Info, Award, Copy, Check } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import {
  VERB_GOVERNANCE,
  PARONYMS_LIST,
  VERB_ASPECT_RULES,
  LETTER_TEMPLATES,
  TORFL_LEVELS_INFO,
} from "@/lib/theory-data";

export const Route = createFileRoute("/teoria")({
  head: () => ({
    meta: [
      { title: "Teoria & Prontuario — ТРКИ Master" },
      { name: "description", content: "Compendio grammaticale e lessicale per gli esami ТРКИ / TORFL: reggenze verbali, paronimi, aspetto e modelli di scrittura." },
      { property: "og:title", content: "Teoria & Prontuario — ТРКИ Master" },
      { property: "og:description", content: "Guida teorica ufficiale ТРКИ: tabelle di reggenza, aspetti verbali, stili e modelli di lettere." },
    ],
  }),
  component: () => <AppShell><TheoryPage /></AppShell>,
});

type TabType = "verbs" | "aspect" | "paronyms" | "letters" | "levels";

function TheoryPage() {
  const [activeTab, setActiveTab] = useState<TabType>("verbs");
  const [verbQuery, setVerbQuery] = useState("");
  const [paronymQuery, setParonymQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredVerbs = VERB_GOVERNANCE.filter(
    (v) =>
      v.verb.toLowerCase().includes(verbQuery.toLowerCase()) ||
      v.cases.toLowerCase().includes(verbQuery.toLowerCase()) ||
      v.meaning.toLowerCase().includes(verbQuery.toLowerCase()) ||
      v.example.toLowerCase().includes(verbQuery.toLowerCase())
  );

  const filteredParonyms = PARONYMS_LIST.filter(
    (p) =>
      p.word1.toLowerCase().includes(paronymQuery.toLowerCase()) ||
      p.word2.toLowerCase().includes(paronymQuery.toLowerCase()) ||
      (p.word3 && p.word3.toLowerCase().includes(paronymQuery.toLowerCase())) ||
      p.meaning1.toLowerCase().includes(paronymQuery.toLowerCase()) ||
      p.meaning2.toLowerCase().includes(paronymQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">Справочные материалы</span>
        <h1 className="mt-1 text-3xl sm:text-4xl font-semibold">Teoria & Prontuario Ufficiale ТРКИ</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Tabelle sinottiche, reggenze complesse, coppie aspettuali, distinzione tra paronimi e modelli di corrispondenza tratti dai programmi ministeriali russi (B2–C1).
        </p>
      </div>

      {/* Navigazione tra le sezioni */}
      <div className="flex flex-wrap gap-2 border-b pb-3">
        {[
          { id: "verbs", label: "Reggenza Verbale", icon: BookOpen },
          { id: "aspect", label: "Aspetto del Verbo (СВ / НСВ)", icon: Info },
          { id: "paronyms", label: "Dizionario Paronimi", icon: FileText },
          { id: "letters", label: "Modelli di Scrittura & Stile", icon: FileText },
          { id: "levels", label: "Quadro Livelli ТРКИ (A1–C1)", icon: Award },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as TabType)}
            className={`btn text-xs sm:text-sm ${
              activeTab === id ? "btn-primary shadow-sm" : "btn-outline"
            }`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </div>

      {/* SEZIONE 1: REGGEnZA VERBALE */}
      {activeTab === "verbs" && (
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Глагольное управление (Reggenze Verbali Tricky)</h2>
              <p className="text-xs text-muted-foreground">
                I verbi con reggenze più frequentemente testate negli esami ТРКИ-2 e ТРКИ-3.
              </p>
            </div>
            <div className="relative w-full sm:w-72">
              <Search size={16} className="absolute left-3 top-3 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cerca verbo, caso o traduzione..."
                value={verbQuery}
                onChange={(e) => setVerbQuery(e.target.value)}
                className="w-full rounded-md border bg-card pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {filteredVerbs.map((v) => (
              <div key={v.verb} className="panel p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-serif text-lg font-semibold text-primary">{v.verb}</h3>
                  <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
                    {v.cases}
                  </span>
                </div>
                <p className="text-sm text-foreground font-medium">{v.meaning}</p>
                <div className="rounded-md bg-muted/60 p-3 text-xs font-serif leading-relaxed text-foreground">
                  {v.example}
                </div>
                {v.notes && <p className="text-xs text-muted-foreground italic">Nota: {v.notes}</p>}
              </div>
            ))}
          </div>

          {filteredVerbs.length === 0 && (
            <p className="panel p-6 text-center text-sm text-muted-foreground">
              Nessun verbo trovato per "{verbQuery}". Prova un termine diverso.
            </p>
          )}
        </section>
      )}

      {/* SEZIONE 2: ASPETTO DEL VERBO */}
      {activeTab === "aspect" && (
        <section className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold">Семантика видов глагола (Guida all'Aspetto Verbale)</h2>
            <p className="text-xs text-muted-foreground">
              Le distinzioni semantiche più sottili del sistema aspettuale russo: significati concreti vs generali, negazione e modali.
            </p>
          </div>

          {/* Valori principali */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-foreground">Valori Semantici di Base nel Passato e Futuro</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {VERB_ASPECT_RULES.pastFuture.map((rule, idx) => (
                <div key={idx} className="panel p-5 space-y-3">
                  <h4 className="font-semibold text-primary text-sm">{rule.title}</h4>
                  <div className="space-y-2 text-xs">
                    <div className="rounded bg-muted/50 p-2.5">
                      <strong className="text-foreground block mb-0.5">НСВ (Imperfettivo):</strong>
                      <span className="text-muted-foreground leading-relaxed">{rule.nsv}</span>
                    </div>
                    <div className="rounded bg-accent/40 p-2.5">
                      <strong className="text-accent-foreground block mb-0.5">СВ (Perfettivo):</strong>
                      <span className="text-foreground leading-relaxed">{rule.sv}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Regole per НЕЛЬЗЯ */}
          <div className="panel p-6 border-l-4 border-l-primary space-y-4">
            <div className="flex items-center gap-2">
              <AlertCircle size={20} className="text-primary" />
              <h3 className="font-semibold text-base">{VERB_ASPECT_RULES.nelzyaRules.title}</h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 text-xs">
              <div className="rounded-lg bg-destructive/10 p-4 border border-destructive/20">
                <span className="font-semibold text-destructive uppercase tracking-wider block text-xs">
                  {VERB_ASPECT_RULES.nelzyaRules.nsvMeaning}
                </span>
                <p className="mt-2 text-foreground font-medium">
                  {VERB_ASPECT_RULES.nelzyaRules.nsvExample}
                </p>
                <p className="mt-2 text-muted-foreground">
                  Quando è una norma o divieto di comportamento, si usa <strong>sempre l'imperfettivo</strong>.
                </p>
              </div>

              <div className="rounded-lg bg-warning/15 p-4 border border-warning/30">
                <span className="font-semibold text-warning-foreground uppercase tracking-wider block text-xs">
                  {VERB_ASPECT_RULES.nelzyaRules.svMeaning}
                </span>
                <p className="mt-2 text-foreground font-medium">
                  {VERB_ASPECT_RULES.nelzyaRules.svExample}
                </p>
                <p className="mt-2 text-muted-foreground">
                  Quando l'azione è tecnicamente o fisicamente irrealizzabile, si usa <strong>il perfettivo</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Infinito e Imperativo */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="panel p-5 space-y-3">
              <h3 className="font-semibold text-sm">Вид глагола в инфинитиве (Infinito)</h3>
              <ul className="space-y-2.5 text-xs">
                {VERB_ASPECT_RULES.infinitiveRules.map((r, i) => (
                  <li key={i} className="border-b pb-2 last:border-0">
                    <div className="font-medium text-foreground">{r.context}</div>
                    <div className="text-primary font-semibold mt-0.5">{r.aspect}</div>
                    <div className="text-muted-foreground italic mt-0.5">{r.example}</div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="panel p-5 space-y-3">
              <h3 className="font-semibold text-sm">Императив с отрицанием (Imperativo Negativo)</h3>
              <ul className="space-y-3 text-xs">
                {VERB_ASPECT_RULES.imperativeRules.map((r, i) => (
                  <li key={i} className="rounded-md bg-muted/50 p-3">
                    <div className="font-semibold text-foreground">{r.context}</div>
                    <div className="text-muted-foreground mt-1">{r.aspect}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* SEZIONE 3: PARONIMI */}
      {activeTab === "paronyms" && (
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Различение сходных слов (Dizionario dei Paronimi)</h2>
              <p className="text-xs text-muted-foreground">
                Termini con radici comuni o assonanze che generano frequenti errori a livello B2 e C1.
              </p>
            </div>
            <div className="relative w-full sm:w-72">
              <Search size={16} className="absolute left-3 top-3 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cerca paronimi..."
                value={paronymQuery}
                onChange={(e) => setParonymQuery(e.target.value)}
                className="w-full rounded-md border bg-card pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <div className="grid gap-4">
            {filteredParonyms.map((p, idx) => (
              <div key={idx} className="panel p-5 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  <div className="rounded-md bg-muted/40 p-3">
                    <span className="font-serif font-semibold text-primary text-base">{p.word1}</span>
                    <p className="mt-1 text-xs text-foreground">{p.meaning1}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {p.collocations1.map((c, i) => (
                        <span key={i} className="rounded bg-card border px-1.5 py-0.5 text-[11px] text-muted-foreground">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-md bg-accent/30 p-3">
                    <span className="font-serif font-semibold text-primary text-base">{p.word2}</span>
                    <p className="mt-1 text-xs text-foreground">{p.meaning2}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {p.collocations2.map((c, i) => (
                        <span key={i} className="rounded bg-card border px-1.5 py-0.5 text-[11px] text-muted-foreground">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  {p.word3 && (
                    <div className="rounded-md bg-muted/60 p-3 sm:col-span-2 md:col-span-1">
                      <span className="font-serif font-semibold text-primary text-base">{p.word3}</span>
                      <p className="mt-1 text-xs text-foreground">{p.meaning3}</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {p.collocations3?.map((c, i) => (
                          <span key={i} className="rounded bg-card border px-1.5 py-0.5 text-[11px] text-muted-foreground">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SEZIONE 4: MODELLI DI LETTERE E STILI */}
      {activeTab === "letters" && (
        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Официально-деловой стиль (Modelli di Lettere e Prontuario)</h2>
            <p className="text-xs text-muted-foreground">
              Formulari ufficiali e modelli standard richiesti nel Subtest di Scrittura (Письмо) per i livelli B2 e C1.
            </p>
          </div>

          <div className="grid gap-6">
            {LETTER_TEMPLATES.map((tmpl) => (
              <div key={tmpl.id} className="panel p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3">
                  <div>
                    <h3 className="text-lg font-semibold">{tmpl.title}</h3>
                    <span className="text-xs text-primary font-medium">{tmpl.type}</span>
                  </div>
                  <button
                    className="btn btn-outline text-xs"
                    onClick={() => handleCopy(tmpl.id, `${tmpl.recipient}\n\n${tmpl.sender}\n\n${tmpl.body}\n\n${tmpl.closing}`)}
                  >
                    {copiedId === tmpl.id ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                    {copiedId === tmpl.id ? "Copiato!" : "Copia modello"}
                  </button>
                </div>

                <p className="text-sm text-muted-foreground">{tmpl.description}</p>

                {/* Box Documento */}
                <div className="rounded-lg border bg-card p-5 font-serif text-sm shadow-inner space-y-4">
                  <div className="whitespace-pre-line text-right text-xs leading-relaxed text-muted-foreground">
                    {tmpl.recipient}
                  </div>
                  <div className="text-center font-bold tracking-wider text-base text-primary">
                    {tmpl.sender}
                  </div>
                  <div className="whitespace-pre-line leading-relaxed text-foreground text-sm">
                    {tmpl.body}
                  </div>
                  <div className="whitespace-pre-line pt-2 text-xs text-muted-foreground">
                    {tmpl.closing}
                  </div>
                </div>

                {/* Consigli di etichetta */}
                <div className="rounded-md bg-muted/60 p-4 space-y-1.5">
                  <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-success" /> Regole di stile e formalità:
                  </span>
                  <ul className="list-disc list-inside space-y-1 text-xs text-muted-foreground pl-1">
                    {tmpl.etiquetteTips.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SEZIONE 5: QUADRO DEI LIVELLI ТРКИ */}
      {activeTab === "levels" && (
        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Standard Statale ТРКИ / TORFL (Quadro A1–C1)</h2>
            <p className="text-xs text-muted-foreground">
              Requisiti ufficiali del Ministero dell'Istruzione Russo e del Quadro Comune Europeo di Riferimento.
            </p>
          </div>

          <div className="grid gap-6">
            {TORFL_LEVELS_INFO.map((lvl) => (
              <div key={lvl.level} className="panel p-6 space-y-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b pb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-3xl font-semibold text-primary">{lvl.level}</span>
                    <div>
                      <h3 className="font-semibold text-base">{lvl.nameRu}</h3>
                      <span className="text-xs text-muted-foreground">{lvl.nameIt}</span>
                    </div>
                  </div>
                  <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                    Lessico minimo: {lvl.vocabSize}
                  </span>
                </div>

                <p className="text-sm leading-relaxed text-foreground">{lvl.description}</p>

                {/* Tabella Subtest */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    Composizione dei 5 Subtest d'Esame:
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b text-left text-muted-foreground">
                          <th className="py-2">Subtest</th>
                          <th>Durata</th>
                          <th>Posizioni</th>
                          <th>Soglia minima</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {lvl.subtests.map((st, i) => (
                          <tr key={i}>
                            <td className="py-2 font-medium text-foreground">{st.name}</td>
                            <td>{st.duration}</td>
                            <td>{st.items}</td>
                            <td className="font-semibold text-success">{st.threshold}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Competenze target */}
                <div className="rounded-md bg-muted/50 p-3.5 space-y-1.5">
                  <span className="text-xs font-semibold text-foreground">Competenze chiave richieste:</span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {lvl.targetSkills.map((sk, idx) => (
                      <span key={idx} className="rounded bg-card border px-2 py-1 text-[11px] text-muted-foreground">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
