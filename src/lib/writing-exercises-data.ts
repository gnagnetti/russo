import { stripStress } from "./audio-speech";

export type WritingExerciseType = "dictation" | "fill-gap" | "translation";

export interface WritingExercise {
  id: string;
  type: WritingExerciseType;
  title: string;
  level: string;
  prompt: string; // Instructions or sentence with gap
  audioText?: string; // Text spoken for dictation
  targetAnswer: string; // The correct Russian word or phrase (with or without stress)
  hint?: string;
  explanation: string;
}

export const WRITING_EXERCISES: WritingExercise[] = [
  {
    id: "wr-1",
    type: "dictation",
    title: "Dettato Ortografico: Saluto e Cortesia",
    level: "A1",
    prompt: "Ascolta l'audio con attenzione e digita la parola russa corretta con la tastiera cirillica.",
    audioText: "здравствуйте",
    targetAnswer: "здравствуйте",
    hint: "Attenzione alla prima lettera 'в', che non si pronuncia ma si scrive!",
    explanation: "«Здравствуйте» ha la 'в' muta dopo 'здра'. È la tipica prova per testare la corretta ortografia delle consonanti inaudibili.",
  },
  {
    id: "wr-2",
    type: "fill-gap",
    title: "Flessione al Prepositivo: Luogo",
    level: "A1",
    prompt: "Inserisci la forma corretta del sostantivo tra parentesi: «Вчера́ мы бы́ли в (библиоте́ка) ___ .»",
    targetAnswer: "библиотеке",
    hint: "Caso Prepositivo singolare femminile in -е.",
    explanation: "Il verbo 'быть' con 'в' richiede il caso Prepositivo di stato in luogo: библиотека -> в библиотеке.",
  },
  {
    id: "wr-3",
    type: "dictation",
    title: "Dettato Ortografico: Desinenza Plurale",
    level: "A2",
    prompt: "Ascolta la pronuncia e scrivi la parola esatta al plurale:",
    audioText: "друзья",
    targetAnswer: "друзья",
    hint: "Plurale irregolare con segno dolce (ь).",
    explanation: "«Друзья» (amici) è il plurale irregolare di 'друг', con palatalizzazione e segno dolce prima di 'я'.",
  },
  {
    id: "wr-4",
    type: "fill-gap",
    title: "Reggenza del Verbo di Moto: Destinazione",
    level: "A2",
    prompt: "Inserisci la forma corretta di 'Москва': «За́втра у́тром мы пое́дем в (Москва́) ___ .»",
    targetAnswer: "Москву",
    hint: "Moto a luogo (в + Accusativo singolare femminile in -у).",
    explanation: "I verbi di moto verso un luogo richiedono 'в' + Accusativo: Москва -> в Москву.",
  },
  {
    id: "wr-5",
    type: "translation",
    title: "Traduzione Attiva: Ringraziamento Formale",
    level: "B1",
    prompt: "Traduci in russo: «Mille grazie per l'aiuto!»",
    targetAnswer: "Большое спасибо за помощь",
    hint: "Большое спасибо за + Accusativo ('помощь' è femminile di III declinazione).",
    explanation: "La formula standard è «Большое спасибо за помощь». Notare 'помощь' al caso accusativo (invariato per la III declinazione).",
  },
  {
    id: "wr-6",
    type: "fill-gap",
    title: "Reggenza Verbale: Dativo e Telefono",
    level: "B1",
    prompt: "Inserisci il pronome corretto tra parentesi: «Я обяза́тельно позвоню́ (ты) ___ за́втра ве́чером.»",
    targetAnswer: "тебе",
    hint: "Il verbo 'звонить' regge il Dativo (Кому?).",
    explanation: "In russo si telefona 'A qualcuno' (Dativo): звонить тебе / звонить другу, a differenza dell'accusativo di altre lingue.",
  },
  {
    id: "wr-7",
    type: "dictation",
    title: "Dettato TRKI-2: Lessico Astratto",
    level: "B2",
    prompt: "Ascolta il termine e scrivilo correttamente in cirillico:",
    audioText: "достопримечательность",
    targetAnswer: "достопримечательность",
    hint: "Sostantivo lungo terminante in -ость.",
    explanation: "«Достопримечательность» (attrazione turistica): fai attenzione all'ortografia di 'досто-', 'при-' e al segno dolce finale.",
  },
  {
    id: "wr-8",
    type: "fill-gap",
    title: "Preposizioni dello Stile Burocratico",
    level: "C1",
    prompt: "Inserisci la forma corretta del sostantivo: «Во избежа́ние (недоразуме́ния, plurale) ___ про́сим подтверди́ть бронь.»",
    targetAnswer: "недоразумений",
    hint: "La locuzione 'во избежание' regge il Genitivo (plurale in -ий).",
    explanation: "«Во избежание недоразумений»: formula cardine dello stile commerciale e accademico TRKI-3.",
  },
];

/**
 * Compares user input with target answer, ignoring stress marks and punctuation.
 */
export function compareRussianInput(
  input: string,
  target: string
): { isMatch: boolean; cleanInput: string; cleanTarget: string } {
  const cleanInput = stripStress(input.trim().toLowerCase().replace(/[.,!?;:«»"']/g, "").replace(/\s+/g, " "));
  const cleanTarget = stripStress(target.trim().toLowerCase().replace(/[.,!?;:«»"']/g, "").replace(/\s+/g, " "));

  // Also accept substitution of ё with е as common in Russian orthography
  const normalizeYo = (s: string) => s.replace(/ё/g, "е");
  const isMatch = cleanInput === cleanTarget || normalizeYo(cleanInput) === normalizeYo(cleanTarget);

  return { isMatch, cleanInput, cleanTarget };
}
