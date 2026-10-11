export interface StressWordChallenge {
  id: string;
  wordNoStress: string; // e.g. "звонит"
  wordWithStress: string; // e.g. "звони́т"
  vowelIndices: { char: string; index: number; isCorrect: boolean }[];
  translation: string;
  ruleExplanation: string;
  exampleSentence: string;
}

export interface HomographPair {
  id: string;
  baseWord: string;
  variantA: {
    stressedWord: string;
    meaning: string;
    exampleRu: string;
    exampleIt: string;
  };
  variantB: {
    stressedWord: string;
    meaning: string;
    exampleRu: string;
    exampleIt: string;
  };
  quizPrompt: string;
  correctVariant: "A" | "B";
  explanation: string;
}

export const STRESS_CHALLENGES: StressWordChallenge[] = [
  {
    id: "sc-1",
    wordNoStress: "звонит",
    wordWithStress: "звони́т",
    vowelIndices: [
      { char: "о", index: 2, isCorrect: false },
      { char: "и", index: 4, isCorrect: true },
    ],
    translation: "telefona / suona",
    ruleExplanation: "Nei verbi in -ить l'accento cade categoricamente sulla desinenza: звони́т, звоня́т. Pronunciare 'звóнит' è considerato un errore gravissimo nella norma colta russa.",
    exampleSentence: "Кто-то звони́т в две́рь уже́ пять мину́т.",
  },
  {
    id: "sc-2",
    wordNoStress: "торты",
    wordWithStress: "то́рты",
    vowelIndices: [
      { char: "о", index: 1, isCorrect: true },
      { char: "ы", index: 4, isCorrect: false },
    ],
    translation: "le torte",
    ruleExplanation: "L'accento è fisso sulla radice sia al singolare che al plurale: то́рт -> то́рты, то́ртов. Non si sposta mai sulla desinenza.",
    exampleSentence: "Конди́тер испеклá заме́чательные то́рты.",
  },
  {
    id: "sc-3",
    wordNoStress: "красивее",
    wordWithStress: "краси́вее",
    vowelIndices: [
      { char: "а", index: 2, isCorrect: false },
      { char: "и", index: 4, isCorrect: true },
      { char: "е", index: 6, isCorrect: false },
      { char: "е", index: 7, isCorrect: false },
    ],
    translation: "più bello (forma comparativa)",
    ruleExplanation: "Nel comparativo di краси́вый l'accento rimane rigorosamente sulla stessa sillaba dell'aggettivo positivo: краси́вее (non 'красивéе').",
    exampleSentence: "Э́тот вид из окна́ намно́го краси́вее.",
  },
  {
    id: "sc-4",
    wordNoStress: "жалюзи",
    wordWithStress: "жалюзи́",
    vowelIndices: [
      { char: "а", index: 1, isCorrect: false },
      { char: "ю", index: 3, isCorrect: false },
      { char: "и", index: 5, isCorrect: true },
    ],
    translation: "persiane / veneziane",
    ruleExplanation: "È un prestito dal francese (jalousie), pertanto in russo conserva l'accento sull'ultima sillaba: жалюзи́.",
    exampleSentence: "Опусти́те жалюзи́, что́бы со́лнце не меша́ло рабо́тать.",
  },
  {
    id: "sc-5",
    wordNoStress: "каталог",
    wordWithStress: "катало́г",
    vowelIndices: [
      { char: "а", index: 1, isCorrect: false },
      { char: "а", index: 3, isCorrect: false },
      { char: "о", index: 5, isCorrect: true },
    ],
    translation: "catalogo",
    ruleExplanation: "Tutti i sostantivi composti con -лог di origine greca (диало́г, моноло́г, катало́г, некроло́г) hanno l'accento sull'ultima sillaba.",
    exampleSentence: "Посмотри́те наш но́вый катало́г проду́кции.",
  },
  {
    id: "sc-6",
    wordNoStress: "облегчить",
    wordWithStress: "облегчи́ть",
    vowelIndices: [
      { char: "о", index: 0, isCorrect: false },
      { char: "е", index: 3, isCorrect: false },
      { char: "и", index: 6, isCorrect: true },
    ],
    translation: "alleviare / facilitare",
    ruleExplanation: "Verbo derivato da лёгкий: all'infinito e in tutte le forme personali l'accento cade sulla desinenza: облегчи́ть, облегчи́т, облегча́т.",
    exampleSentence: "Э́ти ме́ры помо́гут облегчи́ть зада́чу.",
  },
];

export const HOMOGRAPH_PAIRS: HomographPair[] = [
  {
    id: "hg-muka",
    baseWord: "мука",
    variantA: {
      stressedWord: "му́ка",
      meaning: "tormento, supplizio, grande sofferenza",
      exampleRu: "Кака́я э́то му́ка — ждать ответа!",
      exampleIt: "Che tormento è aspettare una risposta!",
    },
    variantB: {
      stressedWord: "мука́",
      meaning: "farina alimentare",
      exampleRu: "Для пирога́ нужна́ пшени́чная мука́.",
      exampleIt: "Per la torta serve la farina di grano.",
    },
    quizPrompt: "Completa la frase: «Ба́бушка купи́ла в магази́не све́жую ___ для блино́в.»",
    correctVariant: "B",
    explanation: "Nel contesto culinario (preparare i bliny) si tratta di 'мука́' (farina), con l'accento sull'ultima sillaba. 'Му́ка' con accento sulla 'у' significa invece sofferenza psicologica.",
  },
  {
    id: "hg-zamok",
    baseWord: "замок",
    variantA: {
      stressedWord: "за́мок",
      meaning: "castello medievale, fortezza",
      exampleRu: "На горе́ возвыша́лся древний ры́царский за́мок.",
      exampleIt: "Sulla montagna svettava un antico castello cavalleresco.",
    },
    variantB: {
      stressedWord: "замо́к",
      meaning: "serratura, lucchetto",
      exampleRu: "Ключ слома́лся пря́мо в дверно́м замке́.",
      exampleIt: "La chiave si è rotta direttamente nella serratura della porta.",
    },
    quizPrompt: "Completa la frase: «Тури́сты поехали на экску́рсию в средневеко́вый ___ .»",
    correctVariant: "A",
    explanation: "Si intende l'edificio storico/fortezza ('за́мок' con accento sulla 'а'). 'Замо́к' con accento sulla 'о' è il congegno metallico per chiudere le porte.",
  },
  {
    id: "hg-plachu",
    baseWord: "плачу",
    variantA: {
      stressedWord: "пла́чу",
      meaning: "piango (da пла́кать)",
      exampleRu: "Я пла́чу от сме́ха!",
      exampleIt: "Piango dalle risate!",
    },
    variantB: {
      stressedWord: "плачу́",
      meaning: "pago (da плати́ть)",
      exampleRu: "Я плачу́ за обе́д креди́тной ка́ртой.",
      exampleIt: "Pago il pranzo con la carta di credito.",
    },
    quizPrompt: "Completa la frase: «Официант, принеси́те счёт: сего́дня я ___ за всех!»",
    correctVariant: "B",
    explanation: "Pagare al ristorante è 'плати́ть' -> 'я плачу́' (accento finale). 'Пла́чу' (accento radicale) significa 'io piango'.",
  },
  {
    id: "hg-uznayu",
    baseWord: "узнаю",
    variantA: {
      stressedWord: "узна́ю",
      meaning: "saprò / verrò a sapere (futuro perfettivo da узна́ть)",
      exampleRu: "За́втра я узна́ю результа́ты экза́мена.",
      exampleIt: "Domani saprò i risultati dell'esame.",
    },
    variantB: {
      stressedWord: "узнаю́",
      meaning: "riconosco / sto riconoscendo (presente imperfettivo da узнава́ть)",
      exampleRu: "Я узнаю́ этот го́лос из ты́сячи.",
      exampleIt: "Riconosco questa voce tra mille.",
    },
    quizPrompt: "Completa la frase: «Позвони́ мне за́втра, когда́ я уже́ то́чно ___ расписа́ние.»",
    correctVariant: "A",
    explanation: "L'azione è futura e compiuta ('saprò con certezza l'orario') -> forma del futuro perfettivo 'узна́ю' con accento sulla 'а'.",
  },
  {
    id: "hg-stoit",
    baseWord: "стоит",
    variantA: {
      stressedWord: "сто́ит",
      meaning: "costa / ne vale la pena (da сто́ить)",
      exampleRu: "Ско́лько сто́ит этот биле́т на по́езд?",
      exampleIt: "Quanto costa questo biglietto del treno?",
    },
    variantB: {
      stressedWord: "стои́т",
      meaning: "sta in piedi / si trova verticalmente (da стоя́ть)",
      exampleRu: "Ва́за стои́т на сто́ле.",
      exampleIt: "Il vaso si trova / sta sul tavolo.",
    },
    quizPrompt: "Completa la frase: «Памятник Пу́шкину ___ на це́нтральной пло́щади города.»",
    correctVariant: "B",
    explanation: "Un monumento si erge verticalmente, quindi si usa 'стои́т' (da стоять, accento sulla 'и'). Al contrario, 'сто́ит' (accento sulla 'о') significa 'costa'.",
  },
];
