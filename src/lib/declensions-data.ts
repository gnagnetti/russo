export interface NounDeclension {
  id: string;
  word: string;
  translation: string;
  gender: "Maschile" | "Femminile" | "Neutro";
  declensionType: string;
  singular: {
    nom: string;
    gen: string;
    dat: string;
    acc: string;
    ins: string;
    prep: string;
  };
  plural: {
    nom: string;
    gen: string;
    dat: string;
    acc: string;
    ins: string;
    prep: string;
  };
  notes: string;
  genitivePluralRule: string;
}

export interface VerbConjugation {
  id: string;
  infinitive: string;
  aspect: "НСВ (Imperfettivo)" | "СВ (Perfettivo)";
  pair?: string;
  translation: string;
  conjugationType: "I Coniugazione" | "II Coniugazione" | "Mista / Irregolare";
  presentOrFuture: {
    ya: string;
    ty: string;
    on: string;
    my: string;
    vy: string;
    oni: string;
  };
  past: {
    m: string;
    f: string;
    n: string;
    pl: string;
  };
  imperative: {
    ty: string;
    vy: string;
  };
  notes: string;
}

export interface MotionVerbPair {
  id: string;
  unidirectional: string;
  multidirectional: string;
  transportType: "A piedi" | "Con mezzo di trasporto" | "In volo" | "In acqua" | "Trasporto a mano / veicolo";
  translation: string;
  exampleUni: string;
  exampleMulti: string;
}

export const NOUN_PARADIGMS: NounDeclension[] = [
  {
    id: "noun-student",
    word: "студе́нт",
    translation: "studente (maschile animato)",
    gender: "Maschile",
    declensionType: "I decl. (consonante dura, animato)",
    singular: {
      nom: "студе́нт",
      gen: "студе́нта",
      dat: "студе́нту",
      acc: "студе́нта",
      ins: "студе́нтом",
      prep: "(о) студе́нте",
    },
    plural: {
      nom: "студе́нты",
      gen: "студе́нтов",
      dat: "студе́нтам",
      acc: "студе́нтов",
      ins: "студе́нтами",
      prep: "(о) студе́нтах",
    },
    notes: "Animato: Accusativo = Genitivo sia al singolare che al plurale.",
    genitivePluralRule: "Terminazione regolare -ов per i maschili duri.",
  },
  {
    id: "noun-gorod",
    word: "го́род",
    translation: "città (maschile inanimato)",
    gender: "Maschile",
    declensionType: "I decl. (consonante dura, inanimato con plurale in -а́)",
    singular: {
      nom: "го́род",
      gen: "го́рода",
      dat: "го́роду",
      acc: "го́род",
      ins: "го́родом",
      prep: "(о) го́роде",
    },
    plural: {
      nom: "города́",
      gen: "городо́в",
      dat: "города́м",
      acc: "города́",
      ins: "города́ми",
      prep: "(о) города́х",
    },
    notes: "Inanimato: Accusativo = Nominativo. Plurale irregolare tonico in -á.",
    genitivePluralRule: "Terminazione -о́в con accento sulla desinenza.",
  },
  {
    id: "noun-kniga",
    word: "кни́га",
    translation: "libro (femminile in -а)",
    gender: "Femminile",
    declensionType: "I decl. (femminile con tema in gutturale -г)",
    singular: {
      nom: "кни́га",
      gen: "кни́ги",
      dat: "кни́ге",
      acc: "кни́гу",
      ins: "кни́гой",
      prep: "(о) кни́ге",
    },
    plural: {
      nom: "кни́ги",
      gen: "книг",
      dat: "кни́гам",
      acc: "кни́ги",
      ins: "кни́гами",
      prep: "(о) кни́гах",
    },
    notes: "Regola ortografica: dopo г, к, х si scrive sempre 'и' e mai 'ы'.",
    genitivePluralRule: "Desinenza ZERO (нулевое окончание): cade la vocale -а -> книг.",
  },
  {
    id: "noun-rossiya",
    word: "Росси́я",
    translation: "Russia (femminile in -ия)",
    gender: "Femminile",
    declensionType: "I decl. debole in -ия",
    singular: {
      nom: "Росси́я",
      gen: "Росси́и",
      dat: "Росси́и",
      acc: "Росси́ю",
      ins: "Росси́ей",
      prep: "(о) Росси́и",
    },
    plural: {
      nom: "Росси́и",
      gen: "Росси́й",
      dat: "Росси́ям",
      acc: "Росси́и",
      ins: "Росси́ями",
      prep: "(о) Росси́ях",
    },
    notes: "I sostantivi in -ия al Prepositivo singolare prendono -ии (non -е!). Es. в России.",
    genitivePluralRule: "Genitivo plurale in -ий.",
  },
  {
    id: "noun-noch",
    word: "ночь",
    translation: "notte (femminile in -ь, III declinazione)",
    gender: "Femminile",
    declensionType: "III declinazione femminile",
    singular: {
      nom: "ночь",
      gen: "но́чи",
      dat: "но́чи",
      acc: "ночь",
      ins: "но́чью",
      prep: "(о) но́чи",
    },
    plural: {
      nom: "но́чи",
      gen: "ноче́й",
      dat: "ноча́м",
      acc: "но́чи",
      ins: "ноча́ми",
      prep: "(о) ноча́х",
    },
    notes: "Genitivo, Dativo e Prepositivo singolari coincidono tutti in -и. Strumentale in -ью.",
    genitivePluralRule: "Tutti i sostantivi di III declinazione formano il Gen. plurale in -ей.",
  },
  {
    id: "noun-okno",
    word: "окно́",
    translation: "finestra (neutro in -о)",
    gender: "Neutro",
    declensionType: "II declinazione (neutro)",
    singular: {
      nom: "окно́",
      gen: "окна́",
      dat: "окну́",
      acc: "окно́",
      ins: "окно́м",
      prep: "(об) окне́",
    },
    plural: {
      nom: "о́кна",
      gen: "о́кон",
      dat: "о́кнам",
      acc: "о́кна",
      ins: "о́кнами",
      prep: "(об) о́кнах",
    },
    notes: "Spostamento di accento: singolare finale (окно́), plurale radicale (о́кна).",
    genitivePluralRule: "Desinenza zero con vocale mobile fuggente di appoggio: о́к-о-н.",
  },
  {
    id: "noun-drug",
    word: "друг",
    translation: "amico (plurale irregolare)",
    gender: "Maschile",
    declensionType: "I declinazione con plurale speciale in -ья",
    singular: {
      nom: "друг",
      gen: "дру́га",
      dat: "дру́гу",
      acc: "дру́га",
      ins: "дру́гом",
      prep: "(о) дру́ге",
    },
    plural: {
      nom: "друзья́",
      gen: "друзе́й",
      dat: "друзья́м",
      acc: "друзе́й",
      ins: "друзья́ми",
      prep: "(о) друзья́х",
    },
    notes: "Plurale irregolare: alternanza г/з + suffisso -ья (друзья́).",
    genitivePluralRule: "Genitivo plurale: друзе́й.",
  },
  {
    id: "noun-vremya",
    word: "вре́мя",
    translation: "tempo (neutro eteroclito in -мя)",
    gender: "Neutro",
    declensionType: "Sostantivo in -мя (gruppo eteroclito)",
    singular: {
      nom: "вре́мя",
      gen: "вре́мени",
      dat: "вре́мени",
      acc: "вре́мя",
      ins: "вре́менем",
      prep: "(о) вре́мени",
    },
    plural: {
      nom: "времена́",
      gen: "времён",
      dat: "времена́м",
      acc: "времена́",
      ins: "времена́ми",
      prep: "(о) времена́х",
    },
    notes: "Inserimento dell'interfisso -ен- in tutti i casi obliqui e al plurale.",
    genitivePluralRule: "Genitivo plurale: времён.",
  },
];

export const VERB_PARADIGMS: VerbConjugation[] = [
  {
    id: "verb-chitat",
    infinitive: "чита́ть",
    aspect: "НСВ (Imperfettivo)",
    pair: "прочита́ть (СВ)",
    translation: "leggere",
    conjugationType: "I Coniugazione",
    presentOrFuture: {
      ya: "чита́ю",
      ty: "чита́ешь",
      on: "чита́ет",
      my: "чита́ем",
      vy: "чита́ете",
      oni: "чита́ют",
    },
    past: {
      m: "чита́л",
      f: "чита́ла",
      n: "чита́ло",
      pl: "чита́ли",
    },
    imperative: {
      ty: "чита́й",
      vy: "чита́йте",
    },
    notes: "Verbo regolare di I coniugazione in -ать. Desinenze: -ю, -ешь, -ет, -ем, -ете, -ют.",
  },
  {
    id: "verb-govorit",
    infinitive: "говори́ть",
    aspect: "НСВ (Imperfettivo)",
    pair: "сказа́ть (СВ - coppia suppletiva)",
    translation: "parlare",
    conjugationType: "II Coniugazione",
    presentOrFuture: {
      ya: "говорю́",
      ty: "говори́шь",
      on: "говори́т",
      my: "говори́м",
      vy: "говори́те",
      oni: "говоря́т",
    },
    past: {
      m: "говори́л",
      f: "говори́ла",
      n: "говори́ло",
      pl: "говори́ли",
    },
    imperative: {
      ty: "говори́",
      vy: "говори́те",
    },
    notes: "Verbo tipico di II coniugazione in -ить. Desinenze con vocale tematica -и-: -ю, -ишь, -ит, -им, -ите, -ят.",
  },
  {
    id: "verb-pisat",
    infinitive: "писа́ть",
    aspect: "НСВ (Imperfettivo)",
    pair: "написа́ть (СВ)",
    translation: "scrivere",
    conjugationType: "I Coniugazione",
    presentOrFuture: {
      ya: "пишу́",
      ty: "пи́шешь",
      on: "пи́шет",
      my: "пи́шем",
      vy: "пи́шете",
      oni: "пи́шут",
    },
    past: {
      m: "писа́л",
      f: "писа́ла",
      n: "писа́ло",
      pl: "писа́ли",
    },
    imperative: {
      ty: "пиши́",
      vy: "пиши́те",
    },
    notes: "Alternanza consonantica c/ш (писать -> пишу). Accento mobile sul tema al presente.",
  },
  {
    id: "verb-hotet",
    infinitive: "хоте́ть",
    aspect: "НСВ (Imperfettivo)",
    pair: "захоте́ть (СВ)",
    translation: "volere",
    conjugationType: "Mista / Irregolare",
    presentOrFuture: {
      ya: "хочу́",
      ty: "хо́чешь (I con.)",
      on: "хо́чет (I con.)",
      my: "хоти́м (II con.)",
      vy: "хоти́те (II con.)",
      oni: "хотя́т (II con.)",
    },
    past: {
      m: "хоте́л",
      f: "хоте́ла",
      n: "хоте́ло",
      pl: "хоте́ли",
    },
    imperative: {
      ty: "хоти́ (raro)",
      vy: "хоти́те",
    },
    notes: "Coniugazione mista: singolare di I coniugazione (хочешь, хочет), plurale di II coniugazione (хотим, хотите, хотят).",
  },
  {
    id: "verb-idti",
    infinitive: "идти́",
    aspect: "НСВ (Imperfettivo)",
    pair: "пойти́ (СВ)",
    translation: "andare a piedi (unidirezionale)",
    conjugationType: "I Coniugazione",
    presentOrFuture: {
      ya: "иду́",
      ty: "идёшь",
      on: "идёт",
      my: "идём",
      vy: "идёте",
      oni: "иду́т",
    },
    past: {
      m: "шёл",
      f: "шла",
      n: "шло",
      pl: "шли",
    },
    imperative: {
      ty: "иди́",
      vy: "иди́те",
    },
    notes: "Passato completamente suppletivo: шёл, шла, шло, шли.",
  },
  {
    id: "verb-yehat",
    infinitive: "е́хать",
    aspect: "НСВ (Imperfettivo)",
    pair: "пое́хать (СВ)",
    translation: "andare con un mezzo (unidirezionale)",
    conjugationType: "I Coniugazione",
    presentOrFuture: {
      ya: "е́ду",
      ty: "е́дешь",
      on: "е́дет",
      my: "е́дем",
      vy: "е́дете",
      oni: "е́дут",
    },
    past: {
      m: "е́хал",
      f: "е́хала",
      n: "е́хало",
      pl: "е́хали",
    },
    imperative: {
      ty: "поезжа́й (suppletivo!)",
      vy: "поезжа́йте",
    },
    notes: "Attenzione: l'imperativo NON è mai 'ехай'! È esclusivamente 'поезжа́й / поезжа́йте'. Errore gravissimo nel TRKI.",
  },
];

export const MOTION_VERB_PAIRS: MotionVerbPair[] = [
  {
    id: "mv-foot",
    unidirectional: "идти́ (иду́, идёшь / шёл, шла)",
    multidirectional: "ходи́ть (хожу́, хо́дишь / ходи́л)",
    transportType: "A piedi",
    translation: "andare a piedi",
    exampleUni: "Сейча́с я иду́ на рабо́ту. (processo in corso)",
    exampleMulti: "Я ка́ждый день хожу́ на рабо́ту пешко́м. (abitudine)",
  },
  {
    id: "mv-vehicle",
    unidirectional: "е́хать (е́ду, е́дешь / е́хал)",
    multidirectional: "е́здить (е́зжу, е́здишь / е́здил)",
    transportType: "Con mezzo di trasporto",
    translation: "andare con un veicolo (auto, treno, bus, metro)",
    exampleUni: "Мы е́дем на по́езде в Москву́. (adesso in viaggio)",
    exampleMulti: "Ле́том мы ча́сто е́здим на да́чу. (ripetizione / andata e ritorno)",
  },
  {
    id: "mv-run",
    unidirectional: "бежа́ть (бегу́, бежи́шь, бегу́т / бежа́л)",
    multidirectional: "бе́гать (бе́гаю, бе́гаешь / бе́гал)",
    transportType: "A piedi",
    translation: "correre",
    exampleUni: "Спортсме́н бежи́т к фи́нишу. (verso la meta)",
    exampleMulti: "По утра́м я бе́гаю в па́рке. (allenamento / direzioni varie)",
  },
  {
    id: "mv-fly",
    unidirectional: "лете́ть (лечу́, лети́шь / лете́л)",
    multidirectional: "лета́ть (лета́ю, лета́ешь / лета́л)",
    transportType: "In volo",
    translation: "volare",
    exampleUni: "Самолёт лети́т над о́блаками.",
    exampleMulti: "Пти́цы лета́ют на юг ка́ждую о́сень.",
  },
  {
    id: "mv-swim",
    unidirectional: "плыть (плыву́, плывёшь / плыл)",
    multidirectional: "пла́вать (пла́ваю, пла́ваешь / пла́вал)",
    transportType: "In acqua",
    translation: "nuotare / navigare",
    exampleUni: "Кора́бль плывёт к бе́регу.",
    exampleMulti: "Де́ти лю́бят пла́вать в бассе́йне.",
  },
  {
    id: "mv-carry-hand",
    unidirectional: "нести́ (несу́, несёшь / нёс, несла́)",
    multidirectional: "носи́ть (ношу́, но́сишь / носи́л)",
    transportType: "Trasporto a mano / veicolo",
    translation: "portare a mano / indossare",
    exampleUni: "Ма́льчик несёт тяжёлый чемода́н.",
    exampleMulti: "Он всегда́ но́сит с собо́й блокно́т.",
  },
  {
    id: "mv-lead-walk",
    unidirectional: "вести́ (веду́, ведёшь / вёл, вела́)",
    multidirectional: "води́ть (вожу́, во́дишь / води́л)",
    transportType: "Trasporto a mano / veicolo",
    translation: "condurre / guidare a piedi o un'auto",
    exampleUni: "Ма́ма ведёт ребёнка за́ руку в шко́лу.",
    exampleMulti: "Она́ уме́ет води́ть маши́ну.",
  },
];

export const MOTION_PREFIXES = [
  { prefix: "по-", meaning: "Inizio del moto / intenzione di partire", regency: "в / на + Acc.", example: "Мы пошли́ в кино́." },
  { prefix: "при-", meaning: "Arrivo / giungere a destinazione", regency: "в / на + Acc. o к + Dat.", example: "По́езд прибыва́ет в пять часо́в." },
  { prefix: "у-", meaning: "Partenza definitiva / allontanarsi lontano", regency: "из / с + Gen.", example: "Он уе́хал в друго́й го́род." },
  { prefix: "в- (во-)", meaning: "Entrare all'interno di uno spazio chiuso", regency: "в + Acc.", example: "Войди́те в ко́мнату, пожа́луйста." },
  { prefix: "вы-", meaning: "Uscire all'esterno", regency: "из + Gen.", example: "Мы вы́шли из метро́." },
  { prefix: "за-", meaning: "Passare brevemente di passaggio o dietro a qc.", regency: "к + Dat. o за + Acc.", example: "Я зайду́ к тебе́ по доро́ге домо́й." },
  { prefix: "пере-", meaning: "Attraversare / traslocare / superare un ostacolo", regency: "че́рез + Acc.", example: "Перейди́те доро́гу по зе́бре." },
  { prefix: "до-", meaning: "Raggiungere fino al limite / fino in fondo", regency: "до + Gen.", example: "Мы дое́хали до гости́ницы." },
  { prefix: "от-", meaning: "Allontanarsi a breve distanza", regency: "от + Gen.", example: "Отойди́те от края платфо́рмы." },
  { prefix: "под-", meaning: "Avvicinarsi a qc. o a qlcu.", regency: "к + Dat.", example: "Такси́ подъе́хало к па́радному вхо́ду." },
];
