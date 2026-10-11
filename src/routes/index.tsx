import { createFileRoute, Link } from "@tanstack/react-router";
import { Target, GraduationCap, Award, Lock, BookOpen, Sparkles, CheckCircle2 } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useUser } from "@/context/UserContext";
import { BADGES } from "@/lib/badges";
import { LEVELS, LEVEL_LABEL } from "@/lib/types";
import { QUESTIONS } from "@/lib/questions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ТРКИ Master — Preparazione esami di russo TORFL" },
      { name: "description", content: "Esercitati e simula gli esami ТРКИ / TORFL di lingua russa dal livello A1 al C1, tutto nel browser." },
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
  const correctItems = Object.values(user.itemHistory).filter(
    (history) => history.length > 0 && history[history.length - 1].isCorrect
  ).length;

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

      {/* Banner Nuova Sezione Teoria & Prontuario */}
      <div className="panel p-6 bg-gradient-to-r from-card via-card to-accent/20 border-primary/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-primary" />
            <h2 className="text-lg font-semibold">Nuovo: Teoria & Prontuario Ufficiale B2–C1</h2>
          </div>
          <p className="text-xs text-muted-foreground max-w-xl">
            Consulta le tabelle di reggenza verbale, le regole sottili delle coppie aspettuali (СВ / НСВ), il dizionario dei paronimi e i modelli di lettere per la prova di scrittura.
          </p>
        </div>
        <Link to="/teoria" className="btn btn-primary text-xs shrink-0">
          <BookOpen size={15} />
          Apri Prontuario
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Link to="/pratica" className="panel flex gap-4 p-6 hover:border-primary transition-all">
          <Target className="text-primary shrink-0" size={28} />
          <div>
            <h2 className="text-xl font-semibold">Pratica guidata</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Esercizi per categoria (Grammatica, Lessico, Lettura, Dialoghi, Scrittura) con spiegazioni immediate.
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
