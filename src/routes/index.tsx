import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Target,
  GraduationCap,
  Award,
  Lock,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Layers,
  PenTool,
  Compass,
  Printer,
  Volume2,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useUser } from "@/context/UserContext";
import { BADGES } from "@/lib/badges";
import { LEVELS, LEVEL_LABEL } from "@/lib/types";
import { QUESTIONS } from "@/lib/questions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ТРКИ Master — Preparazione esami di russo TORFL" },
      { name: "description", content: "Esercitati e simula gli esami ТРКИ / TORFL di lingua russa dal livello A1 al C1, tutto nel browser senza API key." },
      { property: "og:title", content: "ТРКИ Master — Preparazione esami di russo TORFL" },
      { property: "og:description", content: "Pratica e simulazioni ТРКИ A1–C1 con statistiche locali." },
    ],
  }),
  component: () => <AppShell><Dashboard /></AppShell>,
});

function Dashboard() {
  const { user } = useUser();
  if (!user) return null;

  const totalQuestions = QUESTIONS.length;
  const attemptedItems = Object.keys(user.itemHistory).length;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
        <div>
          <p className="text-sm text-muted-foreground">Здра́вствуйте,</p>
          <h1 className="text-4xl font-semibold">{user.username}</h1>
        </div>
        <div className="text-xs text-muted-foreground bg-muted/60 px-3 py-1.5 rounded-full w-fit">
          Banca Dati: <strong>{totalQuestions}</strong> quesiti ufficiali · <strong>{attemptedItems}</strong> svolti
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          ["Livello", user.currentLevel],
          ["Elo Rating", user.eloRating],
          ["Punti Totali", user.totalPoints],
          ["Serie (giorni)", user.streakDays],
        ].map(([k, v]) => (
          <div key={k} className="panel p-5">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">{k}</div>
            <div className="mt-1 font-serif text-3xl font-semibold text-primary">{v}</div>
          </div>
        ))}
      </div>

      {/* Main Core Modes */}
      <div className="grid gap-4 md:grid-cols-2">
        <Link to="/pratica" className="panel flex gap-4 p-6 hover:border-primary transition-all">
          <Target className="text-primary shrink-0" size={28} />
          <div>
            <h2 className="text-xl font-semibold">Pratica guidata</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Esercizi per categoria (Grammatica, Lessico, Lettura, Dialoghi, Scrittura) con spiegazioni diagnostiche immediate.
            </p>
          </div>
        </Link>
        <Link to="/esame" className="panel flex gap-4 p-6 hover:border-primary transition-all">
          <GraduationCap className="text-primary shrink-0" size={28} />
          <div>
            <h2 className="text-xl font-semibold">Simulazione d'esame</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Test cronometrati, subtest ufficiali ТРКИ-2 (B2) e ТРКИ-3 (C1) con soglia di superamento al 66%.
            </p>
          </div>
        </Link>
      </div>

      {/* Nuovi Strumenti di Studio Avanzati */}
      <section className="space-y-3">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-semibold">Laboratori Didattici & Nuovi Strumenti</h2>
          <span className="text-xs text-muted-foreground">Funziona offline · Zero API Key</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <Link to="/flashcards" className="panel p-5 hover:border-primary transition-all space-y-2 group">
            <div className="flex items-center justify-between">
              <Layers size={22} className="text-primary group-hover:scale-110 transition-transform" />
              <span className="badge badge-outline text-[10px]">Metodo Leitner</span>
            </div>
            <h3 className="font-semibold text-base text-foreground">Flashcard SRS</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Memorizzazione a 5 scatole con pronuncia audio russa, esempi e note grammaticali.
            </p>
          </Link>

          <Link to="/scrittura" className="panel p-5 hover:border-primary transition-all space-y-2 group">
            <div className="flex items-center justify-between">
              <PenTool size={22} className="text-primary group-hover:scale-110 transition-transform" />
              <span className="badge badge-outline text-[10px]">Tastiera Cirillica</span>
            </div>
            <h3 className="font-semibold text-base text-foreground">Scrittura & Dettati</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Dettati ortografici e flessioni attive con tastiera a schermo fonetica (ЯВЕРТЫ) o standard.
            </p>
          </Link>

          <Link to="/declinatore" className="panel p-5 hover:border-primary transition-all space-y-2 group">
            <div className="flex items-center justify-between">
              <Compass size={22} className="text-primary group-hover:scale-110 transition-transform" />
              <span className="badge badge-outline text-[10px]">Tabelle dei 6 Casi</span>
            </div>
            <h3 className="font-semibold text-base text-foreground">Declinatore & Coniugatore</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Paradigmi flessivi completi, guida al Genitivo Plurale e matrice dei Verbi di Moto.
            </p>
          </Link>

          <Link to="/accenti" className="panel p-5 hover:border-primary transition-all space-y-2 group">
            <div className="flex items-center justify-between">
              <Sparkles size={22} className="text-primary group-hover:scale-110 transition-transform" />
              <span className="badge badge-outline text-[10px]">Ударение</span>
            </div>
            <h3 className="font-semibold text-base text-foreground">Accenti & Paronimi</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Indovina la sillaba tonica e confronta coppie di omografi che cambiano significato (es. му́ка vs мука́).
            </p>
          </Link>

          <Link to="/teoria" className="panel p-5 hover:border-primary transition-all space-y-2 group">
            <div className="flex items-center justify-between">
              <BookOpen size={22} className="text-primary group-hover:scale-110 transition-transform" />
              <span className="badge badge-outline text-[10px]">B2–C1 Ufficiale</span>
            </div>
            <h3 className="font-semibold text-base text-foreground">Teoria & Prontuario</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Reggenze verbali, coppie aspettuali sottili, connettivi formali e modelli di lettere.
            </p>
          </Link>

          <Link to="/stampa" className="panel p-5 hover:border-primary transition-all space-y-2 group">
            <div className="flex items-center justify-between">
              <Printer size={22} className="text-primary group-hover:scale-110 transition-transform" />
              <span className="badge badge-outline text-[10px]">Stampa A4 / PDF</span>
            </div>
            <h3 className="font-semibold text-base text-foreground">Schede PDF Stampabili</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Genera cheat-sheet pronte per la stampa e simulazioni d'esame cartacee con correzioni staccabili.
            </p>
          </Link>
        </div>
      </section>

      <section>
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-semibold">Percorso di certificazione</h2>
          <span className="text-xs text-muted-foreground">Standard statale TRKI / TORFL</span>
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-5">
          {LEVELS.map((l) => {
            const t = user.completedTests[`exam-${l}`];
            return (
              <div key={l} className={`panel p-4 ${t?.passed ? "border-success bg-success/5" : ""}`}>
                <div className="flex items-center justify-between">
                  <span className="font-serif text-2xl font-semibold">{l}</span>
                  {t?.passed && <CheckCircle2 size={16} className="text-success" />}
                </div>
                <div className="text-xs text-muted-foreground">{LEVEL_LABEL[l]}</div>
                <div className={`mt-2 text-xs ${t?.passed ? "text-success font-medium" : "text-muted-foreground"}`}>
                  {t ? `Migliore: ${t.bestScore}%` : "Non tentato"}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Badge e Traguardi</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {BADGES.map((b) => {
            const on = user.unlockedBadges.includes(b.id);
            return (
              <div key={b.id} className={`panel flex items-center gap-3 p-4 ${on ? "border-warning/40" : "opacity-50"}`}>
                {on ? <Award className="text-warning shrink-0" size={20} /> : <Lock className="text-muted-foreground shrink-0" size={20} />}
                <div>
                  <div className="font-medium text-sm">{b.name}</div>
                  <div className="text-xs text-muted-foreground">{b.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
