import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { LogOut, Flame, Trophy, Layers, PenTool, Compass, Sparkles, Printer } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { Avatar } from "./Avatar";
import { Welcome } from "./Welcome";

const mainNav = [
  { to: "/", label: "Dashboard" },
  { to: "/pratica", label: "Pratica" },
  { to: "/esame", label: "Simulazione" },
  { to: "/flashcards", label: "Flashcard SRS", icon: Layers },
  { to: "/scrittura", label: "Scrittura & Cirillico", icon: PenTool },
  { to: "/declinatore", label: "Declinatore", icon: Compass },
  { to: "/accenti", label: "Accenti", icon: Sparkles },
  { to: "/teoria", label: "Teoria" },
  { to: "/stampa", label: "Schede PDF", icon: Printer },
  { to: "/statistiche", label: "Statistiche" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const { ready, user, selectUser } = useUser();
  if (!ready) return <div className="min-h-screen" />;
  if (!user) return <Welcome />;
  return (
    <div className="min-h-screen">
      <header className="border-b bg-card print:hidden sticky top-0 z-40 backdrop-blur-md bg-card/95">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2.5">
          <Link to="/" className="font-serif text-xl font-bold text-primary tracking-tight">ТРКИ Master</Link>
          
          <nav className="flex flex-wrap items-center gap-1 text-xs">
            {mainNav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: true }}
                className="rounded-md px-2.5 py-1.5 text-muted-foreground hover:bg-muted font-medium transition-colors"
                activeProps={{ className: "bg-accent text-accent-foreground font-semibold" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1 text-warning-foreground font-medium" title="Giorni consecutivi">
              <Flame size={15} className="text-warning" />
              {user.streakDays}d
            </span>
            <span className="flex items-center gap-1 font-medium" title="Rating Elo">
              <Trophy size={15} className="text-primary" />
              {user.eloRating}
            </span>
            <div className="hidden sm:flex items-center gap-2 pl-2 border-l">
              <Avatar name={user.avatar} size={14} />
              <span className="font-semibold text-foreground">{user.username}</span>
            </div>
            <button
              className="btn btn-outline !px-2 !py-1 text-xs"
              onClick={() => selectUser(null)}
              title="Cambia utente"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>
    </div>
  );
}
