import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Printer,
  Download,
  FileText,
  Layers,
  BookOpen,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { QUESTIONS } from "@/lib/questions";

export const Route = createFileRoute("/stampa")({
  head: () => ({
    meta: [
      { title: "Schede di Studio Stampabili & Esportazione PDF — ТРКИ Master" },
      { name: "description", content: "Genera schede di grammatica russa e simulazioni d'esame cartacee stampabili ad alta risoluzione." },
    ],
  }),
  component: () => (
    <AppShell>
      <PrintableView />
    </AppShell>
  ),
});

function PrintableView() {
  const [selectedSheet, setSelectedSheet] = useState<"cases" | "motion" | "mock-exam">("cases");

  const handlePrint = () => {
    window.print();
  };

  // Sample 15 print exam questions
  const printExamQuestions = QUESTIONS.slice(0, 12);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Screen-only UI controls */}
      <div className="print:hidden space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Printer className="text-primary" size={26} />
              <h1 className="text-3xl font-serif font-bold">Schede di Studio Stampabili & PDF</h1>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Prontuari e test formattati per la stampa su carta A4 o per il salvataggio in PDF · Zero API key necessarie.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="btn btn-primary text-xs flex items-center gap-2 px-4 py-2 shadow-md"
            >
              <Printer size={16} />
              <span>Stampa / Salva come PDF</span>
            </button>
          </div>
        </div>

        {/* Sheet Selector */}
        <div className="panel p-3 flex flex-wrap gap-2 text-xs">
          <span className="font-semibold text-muted-foreground px-2 py-1.5 uppercase tracking-wider">
            Seleziona scheda:
          </span>
          {[
            { id: "cases", label: "Tavola dei 6 Casi Russi" },
            { id: "motion", label: "Verbi di Moto & Prefissi" },
            { id: "mock-exam", label: "Simulazione d'Esame Cartacea con Soluzioni" },
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedSheet(s.id as any)}
              className={`rounded-md px-3 py-1.5 font-medium transition-all ${
                selectedSheet === s.id
                  ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                  : "bg-background hover:bg-muted text-foreground border"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* --- PRINTABLE CANVAS --- */}
      <div className="rounded-2xl border bg-white text-slate-900 p-6 sm:p-10 shadow-lg print:border-none print:shadow-none print:p-0 print:m-0">
        {/* Header of Printable Sheet */}
        <div className="border-b-2 border-slate-900 pb-4 mb-6 flex items-baseline justify-between">
          <div>
            <h2 className="text-2xl font-serif font-bold tracking-tight text-slate-900">
              ТРКИ Master — Scheda di Studio Ufficiale
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Materiale didattico preparatorio per gli esami di certificazione statale TORFL (A1–C1)
            </p>
          </div>
          <div className="text-right text-xs text-slate-500 font-mono">
            {new Date().toLocaleDateString("it-IT")}
          </div>
        </div>

        {/* SHEET 1: CASES */}
        {selectedSheet === "cases" && (
          <div className="space-y-6 text-xs text-slate-800">
            <div className="space-y-1">
              <h3 className="text-lg font-bold font-serif text-slate-950 uppercase tracking-wide">
                Tavola Sinottica delle Desinenze dei 6 Casi Russi
              </h3>
              <p className="text-slate-600">
                Sintesi schematica per sostantivi maschili, femminili e neutri al singolare e plurale.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-slate-300 text-left text-[11px]">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-300 text-slate-900 font-bold">
                    <th className="p-2 border border-slate-300">Caso</th>
                    <th className="p-2 border border-slate-300">Domande</th>
                    <th className="p-2 border border-slate-300">Maschile</th>
                    <th className="p-2 border border-slate-300">Femminile</th>
                    <th className="p-2 border border-slate-300">Neutro</th>
                    <th className="p-2 border border-slate-300">Plurale</th>
                    <th className="p-2 border border-slate-300">Preposizioni Tipiche</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="p-2 font-bold border border-slate-300 bg-slate-50">1. Nominativo (Им.)</td>
                    <td className="p-2 border border-slate-300">Кто? Что?</td>
                    <td className="p-2 border border-slate-300 font-serif">consonante / -ь / -й</td>
                    <td className="p-2 border border-slate-300 font-serif">-а / -я / -ь</td>
                    <td className="p-2 border border-slate-300 font-serif">-о / -е / -мя</td>
                    <td className="p-2 border border-slate-300 font-serif">-ы / -и / -а / -я</td>
                    <td className="p-2 border border-slate-300 italic">—</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold border border-slate-300 bg-slate-50">2. Genitivo (Род.)</td>
                    <td className="p-2 border border-slate-300">Кого? Чего? Откуда?</td>
                    <td className="p-2 border border-slate-300 font-serif">-а / -я</td>
                    <td className="p-2 border border-slate-300 font-serif">-ы / -и</td>
                    <td className="p-2 border border-slate-300 font-serif">-а / -я</td>
                    <td className="p-2 border border-slate-300 font-serif font-bold text-slate-950">-ов / -ев / zero / -ей</td>
                    <td className="p-2 border border-slate-300 italic">без, для, до, из, от, у, с, около, после</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold border border-slate-300 bg-slate-50">3. Dativo (Дат.)</td>
                    <td className="p-2 border border-slate-300">Кому? Чему?</td>
                    <td className="p-2 border border-slate-300 font-serif">-у / -ю</td>
                    <td className="p-2 border border-slate-300 font-serif">-е / -и</td>
                    <td className="p-2 border border-slate-300 font-serif">-у / -ю</td>
                    <td className="p-2 border border-slate-300 font-serif">-ам / -ям</td>
                    <td className="p-2 border border-slate-300 italic">к (ко), по, благодаря, вопреки</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold border border-slate-300 bg-slate-50">4. Accusativo (Вин.)</td>
                    <td className="p-2 border border-slate-300">Кого? Что? Куда?</td>
                    <td className="p-2 border border-slate-300 font-serif">Inan. = Nom. / Anim. = Gen.</td>
                    <td className="p-2 border border-slate-300 font-serif">-у / -ю / -ь</td>
                    <td className="p-2 border border-slate-300 font-serif">= Nominativo (-о/-е)</td>
                    <td className="p-2 border border-slate-300 font-serif">Inan. = Nom. / Anim. = Gen.</td>
                    <td className="p-2 border border-slate-300 italic">в, на (moto a luogo), за, через, под</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold border border-slate-300 bg-slate-50">5. Strumentale (Твор.)</td>
                    <td className="p-2 border border-slate-300">Кем? Чем? С кем?</td>
                    <td className="p-2 border border-slate-300 font-serif">-ом / -ем / -ём</td>
                    <td className="p-2 border border-slate-300 font-serif">-ой / -ей / -ью</td>
                    <td className="p-2 border border-slate-300 font-serif">-ом / -ем</td>
                    <td className="p-2 border border-slate-300 font-serif">-ами / -ями</td>
                    <td className="p-2 border border-slate-300 italic">с (со), над, под, перед, за, между</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold border border-slate-300 bg-slate-50">6. Prepositivo (Предл.)</td>
                    <td className="p-2 border border-slate-300">О ком? О чём? Где?</td>
                    <td className="p-2 border border-slate-300 font-serif">-е / -ии / -у́ (loc.)</td>
                    <td className="p-2 border border-slate-300 font-serif">-е / -ии / -и</td>
                    <td className="p-2 border border-slate-300 font-serif">-е / -ии</td>
                    <td className="p-2 border border-slate-300 font-serif">-ах / -ях</td>
                    <td className="p-2 border border-slate-300 italic">в, на (stato in luogo), о (об, обо), при</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="border border-slate-300 p-3 rounded bg-slate-50">
                <span className="font-bold block text-slate-900 mb-1">Regola d'Oro del Genitivo Plurale:</span>
                <ul className="list-disc pl-4 space-y-0.5 text-[10px]">
                  <li>Maschili in consonante dura: terminano in <strong>-ов</strong> (студентов).</li>
                  <li>Femminili in -а e Neutri in -о: prendono <strong>desinenza ZERO</strong> (книг, окон).</li>
                  <li>Sostantivi in -ь (III decl. femm. e maschili deboli): prendono <strong>-ей</strong> (ночей, рублей).</li>
                  <li>Attenzione alle vocali mobili (о/е) che compaiono per facilitare la pronuncia (девушка &rarr; девушек).</li>
                </ul>
              </div>

              <div className="border border-slate-300 p-3 rounded bg-slate-50">
                <span className="font-bold block text-slate-900 mb-1">Regola delle 7 lettere ortografiche:</span>
                <p className="text-[10px] leading-relaxed">
                  Dopo <strong>г, к, х, ж, ч, ш, щ</strong> non si scrive MAI <strong>ы</strong>, ma sempre <strong>и</strong>.
                  <br />
                  Dopo <strong>ж, ч, ш, щ, ц</strong> non si scrive mai <strong>о</strong> atona, ma sempre <strong>е</strong>.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SHEET 2: MOTION VERBS */}
        {selectedSheet === "motion" && (
          <div className="space-y-6 text-xs text-slate-800">
            <div className="space-y-1">
              <h3 className="text-lg font-bold font-serif text-slate-950 uppercase tracking-wide">
                Tavola Comparativa dei Verbi di Moto & Prefissi Spaziali
              </h3>
              <p className="text-slate-600">
                Coppie unidirezionali / pluridirezionali e trasformazione aspettuale con prefissi.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-slate-300 text-left text-[11px]">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-300 text-slate-900 font-bold">
                    <th className="p-2 border border-slate-300">Mezzo</th>
                    <th className="p-2 border border-slate-300">Unidirezionale (&rarr;)</th>
                    <th className="p-2 border border-slate-300">Pluridirezionale (&harr;)</th>
                    <th className="p-2 border border-slate-300">Significato</th>
                    <th className="p-2 border border-slate-300">Con Prefisso «по-»</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-serif">
                  <tr>
                    <td className="p-2 border border-slate-300 font-sans font-medium">A piedi</td>
                    <td className="p-2 border border-slate-300 font-bold text-slate-950">идти́ (иду́, идёшь)</td>
                    <td className="p-2 border border-slate-300">ходи́ть (хожу́, хо́дишь)</td>
                    <td className="p-2 border border-slate-300 font-sans">andare a piedi</td>
                    <td className="p-2 border border-slate-300 font-sans">пойти́ (СВ - inizio moto)</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-300 font-sans font-medium">Con mezzo</td>
                    <td className="p-2 border border-slate-300 font-bold text-slate-950">е́хать (е́ду, е́дешь)</td>
                    <td className="p-2 border border-slate-300">е́здить (е́зжу, е́здишь)</td>
                    <td className="p-2 border border-slate-300 font-sans">andare con veicolo</td>
                    <td className="p-2 border border-slate-300 font-sans">пое́хать (СВ)</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-300 font-sans font-medium">A piedi</td>
                    <td className="p-2 border border-slate-300 font-bold text-slate-950">бежа́ть (бегу́, бежи́шь)</td>
                    <td className="p-2 border border-slate-300">бе́гать (бе́гаю)</td>
                    <td className="p-2 border border-slate-300 font-sans">correre</td>
                    <td className="p-2 border border-slate-300 font-sans">побежа́ть (СВ)</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-300 font-sans font-medium">In volo</td>
                    <td className="p-2 border border-slate-300 font-bold text-slate-950">лете́ть (лечу́, лети́шь)</td>
                    <td className="p-2 border border-slate-300">лета́ть (лета́ю)</td>
                    <td className="p-2 border border-slate-300 font-sans">volare</td>
                    <td className="p-2 border border-slate-300 font-sans">полете́ть (СВ)</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-300 font-sans font-medium">In acqua</td>
                    <td className="p-2 border border-slate-300 font-bold text-slate-950">плыть (плыву́, плывёшь)</td>
                    <td className="p-2 border border-slate-300">пла́вать (пла́ваю)</td>
                    <td className="p-2 border border-slate-300 font-sans">nuotare / navigare</td>
                    <td className="p-2 border border-slate-300 font-sans">поплы́ть (СВ)</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-300 font-sans font-medium">A mano</td>
                    <td className="p-2 border border-slate-300 font-bold text-slate-950">нести́ (несу́, несёшь)</td>
                    <td className="p-2 border border-slate-300">носи́ть (ношу́, но́сишь)</td>
                    <td className="p-2 border border-slate-300 font-sans">portare a mano / vestire</td>
                    <td className="p-2 border border-slate-300 font-sans">понести́ (СВ)</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-300 font-sans font-medium">Condurre</td>
                    <td className="p-2 border border-slate-300 font-bold text-slate-950">вести́ (веду́, ведёшь)</td>
                    <td className="p-2 border border-slate-300">води́ть (вожу́, во́дишь)</td>
                    <td className="p-2 border border-slate-300 font-sans">guidare persona o auto</td>
                    <td className="p-2 border border-slate-300 font-sans">повести́ (СВ)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="border border-slate-300 p-4 rounded bg-slate-50 space-y-2">
              <span className="font-bold block text-slate-900 text-xs">I 10 Prefissi Spaziali Fondamentali:</span>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px]">
                <div><strong>в- (во-):</strong> entrare all'interno (в + Acc.)</div>
                <div><strong>вы-:</strong> uscire all'esterno (из + Gen.)</div>
                <div><strong>при-:</strong> arrivare a destinazione (в/на + Acc.)</div>
                <div><strong>у-:</strong> partire definitivamente lontano (из/с + Gen.)</div>
                <div><strong>под- (подо-):</strong> avvicinarsi a qlcu./qc. (к + Dat.)</div>
                <div><strong>от- (ото-):</strong> allontanarsi di poco (от + Gen.)</div>
                <div><strong>до-:</strong> raggiungere fino al limite (до + Gen.)</div>
                <div><strong>пере-:</strong> attraversare / traslocare (через + Acc.)</div>
                <div><strong>за-:</strong> passare brevemente / deviazione (к + Dat.)</div>
                <div><strong>про-:</strong> passare oltre / percorrere distanza (мимо + Gen.)</div>
              </div>
            </div>
          </div>
        )}

        {/* SHEET 3: MOCK EXAM PAPER */}
        {selectedSheet === "mock-exam" && (
          <div className="space-y-6 text-xs text-slate-800">
            <div className="flex items-center justify-between border-b pb-2">
              <div>
                <h3 className="text-lg font-bold font-serif text-slate-950 uppercase tracking-wide">
                  Prova Simulazione d'Esame Cartacea ТРКИ
                </h3>
                <p className="text-slate-600">
                  Subtest Lessico & Grammatica · Rispondi barrando con una crocetta (X) l'opzione corretta.
                </p>
              </div>
              <div className="border border-slate-400 p-2 text-right rounded">
                <div>Candidato: ________________________</div>
                <div>Data: ____________  Punti: ___ / 12</div>
              </div>
            </div>

            {/* Questions Grid */}
            <div className="space-y-4">
              {printExamQuestions.map((q, idx) => (
                <div key={q.id} className="border-b border-slate-200 pb-3 space-y-1.5">
                  <div className="font-bold text-slate-900 flex items-start gap-2">
                    <span className="text-slate-500 font-mono">#{idx + 1}.</span>
                    <span className="font-serif text-sm">{q.prompt}</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 pl-6">
                    {q.options.map((opt, oIdx) => (
                      <div key={oIdx} className="flex items-center gap-2">
                        <span className="inline-block w-4 h-4 rounded border border-slate-400 text-center leading-4 text-[10px] font-mono">
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span className="font-serif text-slate-800">{opt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Separable Answer Key */}
            <div className="border-t-2 border-dashed border-slate-400 pt-4 mt-8">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold uppercase tracking-wider text-slate-900">
                  ✂️ CHIAVE DELLE SOLUZIONI (Da staccare prima della prova)
                </span>
                <span className="text-[10px] text-slate-500">Soglia superamento: 66% (8/12)</span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 text-[11px] font-mono bg-slate-100 p-3 rounded">
                {printExamQuestions.map((q, idx) => (
                  <div key={q.id} className="p-1 border border-slate-300 rounded bg-white text-center">
                    <strong>#{idx + 1}:</strong> {String.fromCharCode(65 + q.answer)} ({q.options[q.answer]})
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
