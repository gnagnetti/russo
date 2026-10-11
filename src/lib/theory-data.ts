export interface VerbGovEntry {
  verb: string;
  cases: string;
  meaning: string;
  example: string;
  notes?: string;
}

export interface ParonymEntry {
  word1: string;
  meaning1: string;
  collocations1: string[];
  word2: string;
  meaning2: string;
  collocations2: string[];
  word3?: string;
  meaning3?: string;
  collocations3?: string[];
}

export interface LetterTemplate {
  id: string;
  title: string;
  type: string;
  description: string;
  recipient: string;
  sender: string;
  subject?: string;
  body: string;
  closing: string;
  etiquetteTips: string[];
}

export interface LevelInfo {
  level: string;
  nameRu: string;
  nameIt: string;
  vocabSize: string;
  description: string;
  subtests: { name: string; duration: string; items: string; threshold: string }[];
  targetSkills: string[];
}

// 1. REGGEnZA VERBALE (Глагольное управление) dai manuali B2-C1
export const VERB_GOVERNANCE: VerbGovEntry[] = [
  {
    verb: "верить / поверить",
    cases: "в кого/что (Acc.) | кому/чему (Dat.)",
    meaning: "credere in qualcuno/qualcosa (fiducia/fede) | credere a qualcuno (fidarsi delle parole)",
    example: "Я верю в будущее (Acc.) · Он поверил другу (Dat.) на слово.",
    notes: "Distinzione fondamentale al livello B2: «верить в победу» vs «верить врачу».",
  },
  {
    verb: "влиять / повлиять",
    cases: "на кого/что (Acc.)",
    meaning: "influenzare, avere un impatto su",
    example: "Харизматические личности умеют влиять на мировоззрение (Acc.) окружающих.",
    notes: "Non usare il dativo!",
  },
  {
    verb: "достигать / достичь",
    cases: "чего (Gen.)",
    meaning: "raggiungere (un livello, uno scopo, un risultato)",
    example: "В Древнем Египте наука и искусство достигли высокого уровня (Gen.) развития.",
    notes: "Regge sempre il genitivo senza preposizione.",
  },
  {
    verb: "избегать / избежать",
    cases: "кого/чего (Gen.)",
    meaning: "evitare, sfuggire a",
    example: "Ему не следует избегать общения (Gen.) с окружающими.",
    notes: "Regge il genitivo senza preposizione.",
  },
  {
    verb: "мириться / примириться",
    cases: "с кем/чем (Instr.)",
    meaning: "riconciliarsi con, rassegnarsi a, tollerare",
    example: "Апостол Павел советует мириться с обстоятельствами (Instr.).",
    notes: "Preposizione 'с' + strumentale.",
  },
  {
    verb: "напоминать / напомнить",
    cases: "кого/что (Acc.) чем (Instr.) | кому (Dat.) о чём (Prep.)",
    meaning: "ricordare qualcuno per aspetto | ricordare qualcosa a qualcuno",
    example: "Сын напоминает отца (Acc.) характером (Instr.). Напомни мне о встрече (Prep.)!",
    notes: "Due reggenze con significati distinti.",
  },
  {
    verb: "обижаться / обидеться",
    cases: "на кого/что (Acc.)",
    meaning: "offendersi con, prendersela per",
    example: "Сангвиники не способны обижаться на кого-либо (Acc.) долгое время.",
    notes: "In russo è 'на + Accusativo', non con preposizione dativa.",
  },
  {
    verb: "отличаться / отличиться",
    cases: "от кого/чего (Gen.) чем (Instr.)",
    meaning: "differire da qualcuno/qualcosa per qualcosa",
    example: "Горнолыжный центр будет отличаться от европейских (Gen.) низкими ценами (Instr.).",
    notes: "от + Genitivo per il confronto, Strumentale per la caratteristica distintiva.",
  },
  {
    verb: "полагаться / положиться",
    cases: "на кого/что (Acc.)",
    meaning: "fare affidamento su, contare su",
    example: "В сложных ситуациях они полагаются на свои силы (Acc.).",
    notes: "Sinonimo di 'рассчитывать на кого/что'.",
  },
  {
    verb: "поражать / поразить",
    cases: "кого/что (Acc.) чем (Instr.)",
    meaning: "colpire, sbalordire qualcuno con qualcosa",
    example: "Ведущий поражает телезрителей своей начитанностью (Instr.).",
    notes: "Accusativo per la persona colpita, strumentale per il mezzo.",
  },
  {
    verb: "предпочитать / предпочесть",
    cases: "кого/что (Acc.) кому/чему (Dat.)",
    meaning: "preferire qualcosa a qualcos'altro",
    example: "Писатель предпочитал радость (Acc.) веселью (Dat.).",
    notes: "Cosa si preferisce va in Accusativo, a cosa in Dativo.",
  },
  {
    verb: "привыкать / привыкнуть",
    cases: "к кому/чему (Dat.)",
    meaning: "abituarsi a qualcuno o qualcosa",
    example: "Иностранным студентам трудно привыкнуть к морозам (Dat.).",
    notes: "к + Dativo.",
  },
  {
    verb: "придерживаться",
    cases: "чего (Gen.)",
    meaning: "attenersi a, seguire (regole, opinioni, dieta)",
    example: "Родители не придерживаются режима (Gen.) дня.",
    notes: "Sempre Genitivo senza preposizione.",
  },
  {
    verb: "приспосабливаться / приспособиться",
    cases: "к чему (Dat.)",
    meaning: "adattarsi a condizioni, ambienti",
    example: "Животные приспосабливаются к условиям (Dat.), в которых живут.",
    notes: "к + Dativo.",
  },
  {
    verb: "противостоять",
    cases: "кому/чему (Dat.)",
    meaning: "resistere a, opporsi a, contrastare",
    example: "Пожарная служба готова противостоять огню (Dat.).",
    notes: "Dativo senza preposizione.",
  },
  {
    verb: "сливаться / слиться",
    cases: "с чем (Instr.)",
    meaning: "fondersi con, confluire con",
    example: "Моментальные образы сливаются с вечностью (Instr.).",
    notes: "с + Strumentale.",
  },
  {
    verb: "содействовать",
    cases: "кому/чему (Dat.) в чём (Prep.)",
    meaning: "collaborare, favorire, promuovere",
    example: "ЮНЕСКО содействует укреплению (Dat.) мира и безопасности.",
    notes: "Dativo per l'obiettivo.",
  },
  {
    verb: "соответствовать",
    cases: "чему (Dat.)",
    meaning: "corrispondere a, essere conforme a",
    example: "Транспорт должен соответствовать экологическим нормам (Dat.).",
    notes: "Dativo senza preposizione.",
  },
  {
    verb: "упрекать / упрекнуть",
    cases: "кого (Acc.) в чём (Prep.)",
    meaning: "rimproverare qualcuno per qualcosa",
    example: "«Я вас ни в чём не упрекаю, храни Бог», — продолжал я.",
    notes: "в + Prepositivo per la colpa contestata.",
  },
  {
    verb: "учить / научить",
    cases: "кого (Acc.) чему (Dat.)",
    meaning: "insegnare a qualcuno qualcosa",
    example: "Работа в СМИ учит журналистов аккуратному обращению (Dat.) с фактами.",
    notes: "La persona istruita va in Accusativo, la materia in Dativo.",
  },
];

// 2. PARONIMI E DISTINZIONE LESSICALE (Различение сходных слов)
export const PARONYMS_LIST: ParonymEntry[] = [
  {
    word1: "вещь (f.)",
    meaning1: "Oggetto materiale personale o d'uso quotidiano; bagaglio (al plurale)",
    collocations1: ["чужая вещь", "шкаф для вещей", "тяжёлые вещи", "сдать вещи в багаж"],
    word2: "предмет (m.)",
    meaning2: "Oggetto concreto nell'ambiente fisico; oppure disciplina di studio, materia",
    collocations2: ["острый предмет", "предметы гигиены", "предметы потребления", "учебный предмет"],
  },
  {
    word1: "выбор (m. solo sing.)",
    meaning1: "Processo di scelta, assortimento di beni",
    collocations1: ["выбор профессии", "большой выбор товаров", "сделать правильный выбор"],
    word2: "выборы (plurale)",
    meaning2: "Elezioni tramite votazione democratica",
    collocations2: ["выборы Президента", "выборы в Государственную Думу", "участвовать в выборах"],
    word3: "выборка (f.)",
    meaning3: "Campionamento, estrazione di dati statistici o citazioni",
    collocations3: ["газетная выборка", "статистическая выборка данных"],
  },
  {
    word1: "горный",
    meaning1: "Proprio della montagna, che si trova o vive sulle montagne",
    collocations1: ["горный воздух", "горная трасса", "горный козёл", "горные лыжи"],
    word2: "гористый",
    meaning2: "Montuoso, territorio ricco di montagne",
    collocations2: ["гористый берег", "гористая местность", "гористый рельеф"],
  },
  {
    word1: "дипломат",
    meaning1: "Diplomatico di carriera, funzionario di politica estera",
    collocations1: ["опытный дипломат", "приезд дипломата", "российский дипломат"],
    word2: "дипломант",
    meaning2: "Premiato con diploma in un concorso o festival",
    collocations2: ["дипломант конкурса скрипачей", "дипломант международного фестиваля"],
    word3: "дипломник",
    meaning3: "Studente laureando che sta redigendo la tesi di laurea",
    collocations3: ["нерадивый дипломник", "собрание дипломников кафедры"],
  },
  {
    word1: "духовный",
    meaning1: "Spirituale, legato all'intelletto superiore, all'etica o alla religione",
    collocations1: ["духовный мир человека", "духовная культура", "духовная музыка"],
    word2: "душевный",
    meaning2: "Psichico, intimo, emotivo; oppure affettuoso, cordiale, sincero",
    collocations2: ["душевный покой", "душевные волнения", "душевная беседа", "душевный человек"],
    word3: "душистый",
    meaning3: "Profumato, dall'odore fragrante gradevole",
    collocations3: ["душистые цветы", "душистое мыло", "душистый чай"],
  },
  {
    word1: "жёсткий",
    meaning1: "Duro, compatto al tatto; rigido, severo, inflessibile",
    collocations1: ["жёсткий стул", "жёсткое мясо", "жёсткий характер", "жёсткие сроки"],
    word2: "жестокий",
    meaning2: "Crudele, spietato, inumano, senza pietà",
    collocations2: ["жестокий враг", "жестокий человек", "жестокое обращение"],
  },
  {
    word1: "каждый",
    meaning1: "Ciascuno singolarmente preso in una serie determinata",
    collocations1: ["каждая женщина", "каждый день", "каждое утро"],
    word2: "любой",
    meaning2: "Qualsiasi a libera scelta, uno qualunque senza preferenza",
    collocations2: ["любая погода", "любой день", "любое задание"],
    word3: "всякий",
    meaning3: "Ogni sorta di, di vario tipo; oppure qualunque persona",
    collocations3: ["всякий человек", "на всякий случай", "без всякого интереса"],
  },
  {
    word1: "кожаный",
    meaning1: "Fatto di vera pelle animale lavorata",
    collocations1: ["кожаная сумка", "кожаный диван", "кожаная куртка"],
    word2: "кожевенный",
    meaning2: "Relativo all'industria e produzione conciaria della pelle",
    collocations2: ["кожевенная фабрика", "кожевенное сырьё", "кожевенное производство"],
    word3: "кожный",
    meaning3: "Cutaneo, relativo alla pelle come organo del corpo",
    collocations3: ["кожные болезни", "кожный покров тела", "кожный зуд"],
  },
  {
    word1: "обидный",
    meaning1: "Offensivo, ingiurioso, umiliante; che dispiace",
    collocations1: ["обидное замечание", "обидные слова", "обидное поражение"],
    word2: "обидчивый",
    meaning2: "Permaloso, che si offende facilmente per un nonnulla",
    collocations2: ["обидчивый человек", "обидчивый характер", "слишком обидчивый"],
  },
  {
    word1: "предоставление",
    meaning1: "Concessione, messa a disposizione di beni o diritti (da предоставить)",
    collocations1: ["предоставление кредита", "предоставление льгот", "предоставление квартиры"],
    word2: "представление",
    meaning2: "Presentazione formale (da представить); spettacolo teatrale; concezione mentale",
    collocations2: ["представление статьи на рецензию", "театральное представление", "иметь представление о чём-то"],
  },
  {
    word1: "факт",
    meaning1: "Fatto reale, accadimento comprovato, evidenza storica",
    collocations1: ["очевидный факт", "факт истории", "приводить факты"],
    word2: "фактор",
    meaning2: "Fattore causale, elemento determinante di un processo",
    collocations2: ["фактор времени", "фактор экономического развития", "человеческий фактор"],
  },
  {
    word1: "экономичный",
    meaning1: "Economico nel senso di conveniente, che consuma poco",
    collocations1: ["экономичная машина", "экономичный способ", "экономичный расход топлива"],
    word2: "экономический",
    meaning2: "Relativo alla scienza economica o all'economia come settore",
    collocations2: ["экономический закон", "экономические проблемы", "экономический кризис"],
    word3: "экономный",
    meaning3: "Economo, parsimonioso, persona che spende con cautela",
    collocations3: ["экономная хозяйка", "экономное расходование средств"],
  },
  {
    word1: "эффективный",
    meaning1: "Efficace, che produce i risultati pratici voluti",
    collocations1: ["эффективные методы", "эффективное лечение", "эффективное средство"],
    word2: "эффектный",
    meaning2: "D'effetto, appariscente, che suscita grande impressione visiva",
    collocations2: ["эффектное платье", "эффектная женщина", "эффектный жест"],
  },
];

// 3. ASPETTO DEL VERBO (Теория видов глагола)
export const VERB_ASPECT_RULES = {
  pastFuture: [
    {
      title: "Общефактическое (НСВ) vs Конкретно-фактическое (СВ)",
      nsv: "Indica che l'azione ha avuto luogo, a prescindere dal risultato o dalla compiutezza: «Вы когда-нибудь читали эту книгу? — Да, читал».",
      sv: "Indica che c'è un risultato singolo e compiuto (spesso con parole come полностью, наконец, сразу, в конце концов): «Я наконец сдал экзамен».",
    },
    {
      title: "Процесс (НСВ) vs Результат (СВ)",
      nsv: "Sottolinea la durata, il processo nel tempo (весь день, три года, долго, с утра до вечера): «Аспирант писал статью всю неделю».",
      sv: "Focalizza la conclusione integrale dell'azione: «Аспирант написал статью за неделю».",
    },
    {
      title: "Многократность (НСВ) vs Однократность (СВ)",
      nsv: "Azione ripetuta abitualmente (каждый день, регулярно, часто): «Он обычно выходил в сад».",
      sv: "Singola azione puntuale: «Сегодня после завтрака он вышел в сад».",
    },
    {
      title: "Одновременность (НСВ) vs Последовательность (СВ)",
      nsv: "Due azioni che avvengono contemporaneamente: «Шёл снег и бушевали метели».",
      sv: "Sequenza di azioni una dopo l'altra: «Хозяйка закрыла окно, задёрнула штору и включила свет».",
    },
    {
      title: "Аннулирование результата (НСВ) vs Сохранение результата (СВ)",
      nsv: "L'azione è avvenuta nel passato ma il suo effetto è stato annullato (andata e ritorno): «Кто брал мой мобильник?» (lo ha preso e poi rimesso a posto).",
      sv: "L'effetto dell'azione persiste al momento presente: «Кто взял мой мобильник?» (chi l'ha preso? Non c'è più!).",
    },
  ],
  nelzyaRules: {
    title: "Употребление с частицей «НЕЛЬЗЯ»",
    nsvMeaning: "DIVIETO (Запрет) = НСВ",
    nsvExample: "Здесь нельзя курить. В общежитии после одиннадцати нельзя шуметь.",
    svMeaning: "IMPOSSIBILITÀ OGGETTIVA (Невозможность) = СВ",
    svExample: "Свет нельзя включить (лампа перегорела). Машину нельзя завести (двигатель сломан).",
  },
  infinitiveRules: [
    {
      context: "Verbi di fase (начать, продолжать, закончить, перестать)",
      aspect: "Sempre НСВ (imperfettivo)",
      example: "Мы начали заниматься. Он перестал звонить.",
    },
    {
      context: "Verbi modali di riuscita o dimenticanza (удаться, успеть, забыть)",
      aspect: "Di norma СВ (perfettivo)",
      example: "Аспирант успел сдать работу вовремя. Я забыл выключить свет.",
    },
    {
      context: "Dopo verbi di avversione o stanchezza (надоесть, устать, расхотеть, отвыкнуть)",
      aspect: "Sempre НСВ (imperfettivo)",
      example: "Врачам надоело говорить об опасности курения.",
    },
  ],
  imperativeRules: [
    {
      context: "Richiesta/Ordine di non fare (Divieto)",
      aspect: "НСВ: «Не говори никому!», «Не пей холодную воду!»",
    },
    {
      context: "Avvertimento/Timore di un'azione involontaria (Предостережение)",
      aspect: "СВ con 'смотри не...': «Смотри, не упади!», «Смотри, не забудь сумку в поезде!»",
    },
  ],
};

// 4. MODELLI DI LETTERE E STILI FUNZIONALI (Письмо и деловой стиль)
export const LETTER_TEMPLATES: LetterTemplate[] = [
  {
    id: "zayavlenie",
    title: "Заявление (Richiesta formale / Domanda)",
    type: "Официально-деловой стиль",
    description: "Documento ufficiale inviato a un superiore (preside, rettore, datore di lavoro) per richiedere permessi, cambi di piano studi o ferie.",
    recipient: "Декану филологического факультета ЮФУ\nпроф. О.Е. Бутурлину\nстудента 4 курса 2 группы\nгражданина Итальянской Республики\nЛуки Росси",
    sender: "Заявление",
    body: "Прошу перенести сдачу экзамена по современному русскому языку с 15.01.2026 на 22.01.2026 по семейным обстоятельствам.\n\nМедицинская справка прилагается.",
    closing: "14.01.2026                                            (подпись)",
    etiquetteTips: [
      "La parola 'Заявление' si scrive al centro con la maiuscola e senza punto finale.",
      "Destinatario e mittente vanno in alto a destra: destinatario al Dativo, mittente al Genitivo senza preposizione 'от'.",
      "Il corpo della richiesta inizia con la formula 'Прошу + infinito' (es. Прошу перевести, Прошу предоставить).",
      "Non usare formule colloquiali come 'Заранее спасибо' o 'Очень прошу'.",
    ],
  },
  {
    id: "obyasnitelnaya",
    title: "Объяснительная записка (Nota di giustificazione)",
    type: "Официально-деловой стиль",
    description: "Giustificazione formale scritta in caso di assenze, ritardi o violazioni delle regole interne.",
    recipient: "Декану экономического факультета\nпроф. В.Н. Аничкову\nстудента 2 курса 3 группы\nФ.М. Баруздина",
    sender: "Объяснительная записка",
    body: "Я не смог присутствовать 02.04.2026 на заседании учебной комиссии в связи со сдачей экзамена для получения водительских прав в органах Госавтоинспекции.\n\nСправка из Госавтоинспекции прилагается.",
    closing: "04.04.2026                                            (подпись)",
    etiquetteTips: [
      "Evitare aperture colloquiali ('Уважаемый декан, извините меня').",
      "Esporre il fatto oggettivamente: 'Я отсутствовал на занятиях ... в связи с ...'.",
      "Usare formule di causa ufficiali: 'в связи с (+ Str.)', 'по причине (+ Gen.)'.",
    ],
  },
  {
    id: "pretenziya",
    title: "Претензия / Рекламация (Reclamo formale)",
    type: "Официально-деловой стиль",
    description: "Lettera di contestazione per merce difettosa o inadempimento contrattuale, con richiesta di risarcimento o sostituzione a norma di legge.",
    recipient: "Директору магазина «Электроника»\nГ.В. Кораблёву\nот покупателя Н.Д. Говорова\nтел.: +7 (999) 123-45-67",
    sender: "Претензия",
    body: "15.07.2025 в Вашем магазине мною был приобретён ноутбук модели Pro-15. В процессе эксплуатации через две недели был выявлен производственный брак матрицы экрана.\n\nНа основании ст. 18 Закона РФ «О защите прав потребителей» прошу произвести замену бракованного товара на аналогичный товар надлежащего качества либо вернуть уплаченную сумму.\n\nПриложение: копия кассового чека, заключение сервисного центра.",
    closing: "17.07.2025                                            (подпись)",
    etiquetteTips: [
      "Citare chiaramente la data di acquisto e i dettagli del prodotto.",
      "Fare riferimento agli articoli di legge pertinenti.",
      "Elencare tutti i documenti allegati sotto 'Приложение:'.",
    ],
  },
  {
    id: "delovoe-pismo",
    title: "Деловое коммерческое письмо (Lettera commerciale)",
    type: "Официально-деловой стиль",
    description: "Corrispondenza tra enti o aziende per proposte commerciali, inviti a eventi o cooperazione.",
    recipient: "Генеральному директору ООО «Северсталь»\nА.В. Смирнову\nул. Ленина, д. 45, г. Череповец",
    sender: "О сотрудничестве в сфере экологических технологий",
    body: "Уважаемый Александр Васильевич!\n\nРуководство нашей компании благодарит Вас за интерес, проявленный к нашим инновационным системам фильтрации.\n\nВ соответствии с договорённостями, достигнутыми на международном форуме, направляем Вам коммерческое предложение и проект договора поставки оборудования.\n\nНадеемся на плодотворное и взаимовыгодное сотрудничество.\n\nПриложение: коммерческое предложение на 5 л. в 1 экз.",
    closing: "С уважением,\nДиректор по развитию ООО «ЭкоТех»                В.И. Петров\n10.03.2026",
    etiquetteTips: [
      "Apertura obbligatoria: 'Уважаемый + Nome + Patronimico!'.",
      "Chiusura formale: 'С уважением, + carica + firma + Nome e Cognome'.",
      "Non usare abbreviazioni gergali o emotive.",
    ],
  },
];

// 5. QUADRO DEI LIVELLI ТРКИ (Informazioni ufficiali A1–C1)
export const TORFL_LEVELS_INFO: LevelInfo[] = [
  {
    level: "A1",
    nameRu: "Элементарный уровень (ТЭУ)",
    nameIt: "Livello Elementare",
    vocabSize: "~780 unità lessicali",
    description: "Soddisfa le esigenze comunicative minime in situazioni quotidiane elementari. Comprensione di frasi semplici e dialoghi guidati.",
    subtests: [
      { name: "Лексика. Грамматика", duration: "50 min", items: "100", threshold: "66%" },
      { name: "Чтение", duration: "50 min", items: "30", threshold: "66%" },
      { name: "Аудирование", duration: "30 min", items: "30", threshold: "66%" },
      { name: "Письмо", duration: "50 min", items: "2 compiti", threshold: "66%" },
      { name: "Говорение", duration: "25 min", items: "4 parti", threshold: "66%" },
    ],
    targetSkills: ["Saluti e presentazioni", "Numeri, orari, date", "Ordinare al ristorante, fare acquisti", "Frasi base al passato e presente"],
  },
  {
    level: "A2",
    nameRu: "Базовый уровень (ТБУ)",
    nameIt: "Livello Base",
    vocabSize: "~1.300 unità lessicali",
    description: "Consente la comunicazione in situazioni standard della vita quotidiana e socio-culturale. Livello minimo per la cittadinanza russa.",
    subtests: [
      { name: "Лексика. Грамматика", duration: "50 min", items: "110", threshold: "66%" },
      { name: "Чтение", duration: "50 min", items: "30", threshold: "66%" },
      { name: "Аудирование", duration: "35 min", items: "30", threshold: "66%" },
      { name: "Письмо", duration: "50 min", items: "2 compiti", threshold: "66%" },
      { name: "Говорение", duration: "30 min", items: "4 parti", threshold: "66%" },
    ],
    targetSkills: ["Descrivere la famiglia e la professione", "Muoversi in città e mezzi pubblici", "Reggenze dei casi fondamentali", "Verbi di moto senza prefissi e con prefissi base"],
  },
  {
    level: "B1",
    nameRu: "Первый сертификационный уровень (ТРКИ-1)",
    nameIt: "Livello Intermedio (B1)",
    vocabSize: "~2.300 unità lessicali",
    description: "Competenza comunicativa autonoma. Requisito obbligatorio per l'ammissione alle università russe (laurea triennale).",
    subtests: [
      { name: "Лексика. Грамматика", duration: "60 min", items: "165", threshold: "66%" },
      { name: "Чтение", duration: "50 min", items: "30", threshold: "66%" },
      { name: "Аудирование", duration: "35 min", items: "30", threshold: "66%" },
      { name: "Письмо", duration: "60 min", items: "2 compiti", threshold: "66%" },
      { name: "Говорение", duration: "35 min", items: "4 parti", threshold: "66%" },
    ],
    targetSkills: ["Periodo ipotetico reale e irreale (союз чтобы, если бы)", "Verbi di moto con prefissi spaziali e figurati", "Espressione delle relazioni di causa, tempo e scopo", "Redazione di lettere personali e formulari"],
  },
  {
    level: "B2",
    nameRu: "Второй сертификационный уровень (ТРКИ-2)",
    nameIt: "Livello Avanzato (B2)",
    vocabSize: "~5.000–6.000 unità lessicali",
    description: "Competenza fluida e flessibile in ambito professionale, scientifico e umanistico. Requisito per lauree specialistiche e master in Russia.",
    subtests: [
      { name: "Лексика. Грамматика", duration: "90 min", items: "150", threshold: "66%" },
      { name: "Чтение", duration: "60 min", items: "25", threshold: "66%" },
      { name: "Аудирование", duration: "40 min", items: "25", threshold: "66%" },
      { name: "Письмо", duration: "55 min", items: "3 compiti (Заявление, письмо, эссе)", threshold: "66%" },
      { name: "Говорение", duration: "50 min", items: "15 posizioni", threshold: "66%" },
    ],
    targetSkills: ["Reggenza verbale complessa e verbi astratti", "Sfumature semantiche delle coppie aspettuali con negazione e modali", "Uso attivo di participi e gerundi con trasformazioni sintattiche", "Comprensione di articoli giornalistici, saggi e testi letterari classici"],
  },
  {
    level: "C1",
    nameRu: "Третий сертификационный уровень (ТРКИ-3)",
    nameIt: "Livello di Padronanza (C1)",
    vocabSize: "~10.000+ unità lessicali",
    description: "Piena padronanza della lingua in tutti i registri (accademico, giornalistico, letterario, burocratico). Abilitante all'insegnamento e alla ricerca filologica in Russia.",
    subtests: [
      { name: "Лексика. Грамматика", duration: "90 min", items: "100", threshold: "66%" },
      { name: "Чтение", duration: "60 min", items: "25", threshold: "66%" },
      { name: "Аудирование", duration: "35 min", items: "25", threshold: "66%" },
      { name: "Письмо", duration: "75 min", items: "3 compiti (Реферат, аналитическая статья)", threshold: "66%" },
      { name: "Говорение", duration: "50 min", items: "15 posizioni", threshold: "66%" },
    ],
    targetSkills: ["Distinzione fine di paronimi e sinonimi stilistici", "Costruzioni sintattiche complesse e gergo pubblicistico/accademico", "Figure retoriche, ironia, sottotesto e testi letterari del '900", "Redazione di реферат-резюме e реферат-обзор con sintesi formale"],
  },
];
