import type { UserProfile } from "./types";

export interface Badge {
  id: string;
  name: string;
  desc: string;
  test: (u: UserProfile) => boolean;
}

export const BADGES: Badge[] = [
  {
    id: "first-step",
    name: "Первый шаг (Primo Passo)",
    desc: "Completa il tuo primo test",
    test: (u) => Object.keys(u.completedTests).length >= 1,
  },
  {
    id: "perfect-score",
    name: "Отличник (100% Perfetto)",
    desc: "Ottieni il 100% in un test",
    test: (u) => Object.values(u.completedTests).some((t) => t.bestScore === 100),
  },
  {
    id: "streak-3",
    name: "Усердие (Costanza 3 Giorni)",
    desc: "Mantieni una serie di studio per 3 giorni consecutivi",
    test: (u) => u.streakDays >= 3,
  },
  {
    id: "streak-7",
    name: "Железная воля (7 Giorni)",
    desc: "Mantieni una serie di studio per 7 giorni consecutivi",
    test: (u) => u.streakDays >= 7,
  },
  {
    id: "master-b1",
    name: "TRKI-I Conquistato",
    desc: "Raggiungi un rating Elo superiore a 1300",
    test: (u) => u.eloRating >= 1300,
  },
  {
    id: "master-b2",
    name: "TRKI-II Conquistato",
    desc: "Raggiungi un rating Elo superiore a 1500",
    test: (u) => u.eloRating >= 1500,
  },
  {
    id: "scholar-50",
    name: "Знаток (50 Quesiti)",
    desc: "Rispondi ad almeno 50 quesiti complessivi",
    test: (u) => Object.keys(u.itemHistory).length >= 50,
  },
  {
    id: "scholar-100",
    name: "Мастер (100 Quesiti)",
    desc: "Rispondi ad almeno 100 quesiti complessivi",
    test: (u) => Object.keys(u.itemHistory).length >= 100,
  },
  {
    id: "points-500",
    name: "500 Punti",
    desc: "Accumula 500 punti esperienza",
    test: (u) => u.totalPoints >= 500,
  },
];
