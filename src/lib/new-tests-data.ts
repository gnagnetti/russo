import type { Question } from "./types";

export const NEW_AUTHENTIC_QUESTIONS: Question[] = [
  // ==========================================
  // 1. ЧТЕНИЕ (READING COMPREHENSION) — B2 & C1
  // ==========================================
  {
    id: "read-b2-paustovsky-1",
    level: "B2",
    category: "reading",
    passage:
      "Я уверен, что для полного овладения русским языком, для того чтобы не потерять этот язык, нужно не только постоянное общение с русскими людьми, но общение с лесами, водами, старыми ивами и с каждым цветком, что кивает головой из-под куста лещины.\n\nВ это лето я узнал заново — на ощупь, на вкус, на запах — много слов, бывших до той поры хотя и известными, но далёкими и не пережитыми. Раньше они вызывали только один обычный скудный образ. А вот теперь оказалось, что в каждом слове заложена бездна живых образов... Между прочим, существует своего рода закон воздействия писательского слова на читателя. Если писатель, работая, не видит за словами то, о чём он пишет, то и читатель ничего не увидит за ними. (По К. Г. Паустовскому)",
    prompt: "Чтобы по-настоящему хорошо знать русский язык, по мнению Паустовского, необходимо общаться ...",
    options: [
      "только с образованными носителями языка",
      "с лесами и водами, то есть с живой природой",
      "с деревьями и цветами в ботаническом саду",
      "и с людьми, и с родной природой",
    ],
    answer: 3,
    explanation:
      "Paustovskij sottolinea esplicitamente: «è necessaria non solo la comunicazione costante con i russi, ma anche il contatto con i boschi, le acque... e con ogni singolo fiore». La vera padronanza della lingua richiede sia il contatto umano che quello con la natura d'origine.",
  },
  {
    id: "read-b2-paustovsky-2",
    level: "B2",
    category: "reading",
    passage:
      "Между прочим, существует своего рода закон воздействия писательского слова на читателя. Если писатель, работая, не видит за словами то, о чём он пишет, то и читатель ничего не увидит за ними. Но если писатель хорошо видит то, о чём пишет, то самые простые и порой даже стёртые слова приобретают новизну, действуют на читателя с разительной силой и вызывают у него те мысли, чувства и состояния, какие писатель хотел ему передать. (К. Г. Паустовский)",
    prompt: "Закон воздействия писательского слова на читателя выражается в том, что ...",
    options: [
      "писатель должен говорить максимально громко и пафосно",
      "подтекст всегда важнее самого текста",
      "писатель должен сам ясно видеть за словами то, о чём он пишет",
      "писатель является непререкаемым авторитетом для публики",
    ],
    answer: 2,
    explanation:
      "Secondo la legge enunciata da Paustovskij, se lo scrittore visualizza chiaramente la realtà viva dietro ciascuna parola, anche i vocaboli più comuni e consumati trasmettono al lettore un'immagine vivida e potente.",
  },
  {
    id: "read-b2-terminasova-1",
    level: "B2",
    category: "reading",
    passage:
      "«Рознь языков» известна человечеству со времён Вавилонской башни. Однако знание языка ещё не гарантирует радостей общения. Для того чтобы говорить с другими людьми и понимать их, нужно преодолеть ещё и барьер культурный — гораздо более опасный и трудный. В отличие от языкового, он невидим и не ощущаем. Родная культура воспринимается нами как нечто данное, как единственная возможность жить по определённым, родным правилам. Осознание своей культуры как отдельной и особенной приходит только при столкновении с иной культурой. (По С. Г. Тер-Минасовой)",
    prompt: "Человек начинает осознавать свою собственную культуру как особенную, когда ...",
    options: [
      "читает серьёзные академические труды по философии",
      "сталкивается с культурой другой страны",
      "путешествует исключительно по своей родной стране",
      "размышляет над смыслом жизни в одиночестве",
    ],
    answer: 1,
    explanation:
      "Come afferma il testo: «La consapevolezza della propria cultura come specifica e particolare giunge solo nel momento del confronto e dello scontro con un'altra cultura».",
  },
  {
    id: "read-b2-terminasova-2",
    level: "B2",
    category: "reading",
    passage:
      "Русское слово «худой» помимо значения тощий, неупитанный, нетолстый имеет также устаревающее значение плохой, которое сохраняется в устойчивых выражениях — худой мир лучше доброй ссоры, худого слова не скажешь. Слово «худой» соотносится в русском языке со словами с отрицательными характеристиками: тощий, костлявый, скелет. Слово толстый, само по себе некомплиментарное, имеет гораздо больше позитивных синонимов: полный, полнотелый, дородный, солидный, упитанный. Иначе говоря, худой — это и худой и плохой, а толстый — это только толстый. (По С. Г. Тер-Минасовой)",
    prompt: "Почему в традиционной русской культуре слово «худой» исторически связано с негативной оценкой?",
    options: [
      "Потому что оно фонетически созвучно слову «плохой»",
      "Потому что в русском языке «худой» исторически означало и «тощий», и «плохой / некачественный»",
      "Потому что крестьяне не любили людей высокого роста",
      "Потому что слово «худой» заимствовано из французского языка",
    ],
    answer: 1,
    explanation:
      "La parola russa «худой» nella storia della lingua significava originariamente sia «magro/esile» sia «cattivo/malvagio/difettoso» (si pensi a espressioni idiomatiche come «худой мир» = una pace cattiva o «худо дело» = le cose vanno male).",
  },
  {
    id: "read-c1-sidorov-1",
    level: "C1",
    category: "reading",
    passage:
      "Артист Огнев-Кориоланский на память о сезоне в Ростове заказал местному скульптору вылепить свой бюст. После пяти сеансов заказ был готов. Однако Кориоланскому бюст не понравился: «Мало портретного сходства, — заявил он. — Сходства почти нет». Молодой скульптор возразил: «А вот мы сейчас проверим!» На следующий день артист привёл своего пуделя Ральфа: «Собака — неподкупный судья. Она меня знает!» Пудель подбежал к бюсту и с неистовой страстью начал облизывать гипсовую щёку и вилять хвостом. Растроганный артист щедро расплатился со скульптором. «Как собака признала сходство!» — восхищался он. А когда артист ушёл, скульптор весело признался служанке: «Я, поди, целый фунт колбасы извёл, натирая этот бюст!» (По В. С. Сидорову)",
    prompt: "Скульптор добился бурной реакции пуделя на гипсовый бюст артиста благодаря тому, что ...",
    options: [
      "достиг идеального фотографического сходства черт лица",
      "накормил собаку перед сеансом любимым кормом",
      "натёр гипсовый бюст ароматной колбасой",
      "использовал в гипсе специальный охотничий лак",
    ],
    answer: 2,
    explanation:
      "Lo scultore ha sfregato il busto di gesso con un intero libbre (фунт) di salame («целый фунт колбасы извёл, натирая этот бюст!»), inducendo il cane a leccarlo con entusiasmo e convincendo così l'attore della somiglianza.",
  },
  {
    id: "read-b2-kurpatov-1",
    level: "B2",
    category: "reading",
    passage:
      "Известный российский врач-психотерапевт Андрей Курпатов утверждает: «Наш успех в борьбе со страхами возможен, если мы начнём рассуждать здраво. Прежде всего признаем, что наш страх глупый, иррациональный, бестолковый. Страх ошибок парализует человека и лишает дееспособности: боясь ошибиться, человек перестаёт вообще что-либо делать. Страх несчастного случая — иллюзия, будто можно подстелить соломку везде. Надо понимать: бояться трудностей бессмысленно, нужно действовать». (По А. Курпатову)",
    prompt: "К какому функциональному стилю речи относится данный текст?",
    options: [
      "Официально-деловой стиль",
      "Газетно-публициisticheskiy (pubblicistico-giornalistico)",
      "Разговорный стиль",
      "Собственно научный стиль",
    ],
    answer: 1,
    explanation:
      "Lo stile è giornalistico-pubblicistico (газетно-публицистический стиль): unisce divulgazione psicologica, tono persuasivo e metafore espressive («подстелить соломку») rivolte a un vasto pubblico di lettori.",
  },
  {
    id: "read-b2-chekhov-dachniki-1",
    level: "B2",
    category: "reading",
    passage:
      "По дачной платформе взад и вперёд прогуливалась парочка недавно поженившихся супругов. Саша держал жену за талию, а Варя жалась к нему, и оба были счастливы. Поезд подошёл к платформе. Из вагона вдруг выскочили две девочки и повисли на шее у Вари. За ними показалась пожилая дама и высокий господин с чемоданами: «А вот и мы, милые! На всё лето к вам приехали погостить!» Саша и Варя побледнели от ужаса: их уединённому дачному счастью пришёл конец. Обернувшись к незваным гостям с натянутой улыбкой, Саша воскликнул: «Милости просим! Милости просим, дорогие гости!» (По А. П. Чехову, «Дачники»)",
    prompt: "Какое истинное чувство испытали молодые супруги при виде приехавших родственников?",
    options: [
      "Искреннюю радость и облегчение",
      "Глубокий ужас и разочарование",
      "Лёгкое удивление, быстро сменившееся весельем",
      "Полное равнодушие",
    ],
    answer: 1,
    explanation:
      "I due sposini hanno provato un vero e proprio terrore («побледнели от ужаса»), rendendosi conto che la loro intimità estiva nella dacia era distrutta dall'arrivo inaspettato della rumorosa parentela.",
  },
  {
    id: "read-c1-akunin-fandorin-1",
    level: "C1",
    category: "reading",
    passage:
      "Свой сорок первый день рождения Эраст Петрович встретил в полном одиночестве. Сидел в купе курьерского поезда, смотрел в окно, за которым было полное отсутствие какого-либо пейзажа — лишь белое белое поле, над ним белое небо. Россия, январь. Рисуй по этому загрунтованному холсту что хочешь, всё пургой заметёт. Обличие Эраст Петрович тоже избрал среднестатистическое. Предыдущий визит в отечество окончательно испортил отношения отставного статского советника с властью предержащими. Слежка Фандорину была совершенно ни к чему. (По Б. Акунину)",
    prompt: "Почему Эраст Петрович Фандорин ехал в Россию инкогнито и в скромной одежде?",
    options: [
      "Он хотел устроить сюрприз своим старым университетским друзьям",
      "Он был в опале у высших властей и стремился избежать слежки",
      "Он растратил всё своё состояние и не имел средств на приличный костюм",
      "Он выполнял секретное дипломатическое поручение британской короны",
    ],
    answer: 1,
    explanation:
      "Fandorin è in rotta di collisione con le autorità imperiali («с властью предержащими») e deve assolutamente evitare di attirare l'attenzione della polizia segreta zarista («слежка была ни к чему»).",
  },
  {
    id: "read-c1-ulitskaya-1",
    level: "C1",
    category: "reading",
    passage:
      "Ленинградская жизнь сразу же показалась Тане более породистой, лучше обставленной во всех отношениях — и улицы, и вещи, и люди обладали большим удельным весом. Город был прекрасен своей неисчезающей историей, но следы безответственного отношения к этой истории и культуре присутствовали повсеместно, отчего иногда находила тоска... Самым счастливым обстоятельством оказалось полное слияние всех компонентов жизни, которые обыкновенно лишь кое-как сосуществуют, а то и раздёргивают человека в разные стороны. (По Л. Е. Улицкой)",
    prompt: "Что в облике и атмосфере Ленинграда вызывало у героини тоску?",
    options: [
      "Суровый климат и постоянные зимние сумерки",
      "Следы безответственного и небрежного отношения людей к истории и культуре",
      "Отсутствие столичного лоска и театров",
      "Чрезмерная суета и переполненный транспорт",
    ],
    answer: 1,
    explanation:
      "Come afferma il testo: «ma le tracce di un atteggiamento irresponsabile verso questa storia e cultura erano presenti ovunque, e per questo motivo a volte la assaliva la malinconia».",
  },

  // ==========================================
  // 2. ГРАММАТИКА (GRAMMAR) — B2 & C1
  // ==========================================
  {
    id: "gram-b2-aspect-nelzya-1",
    level: "B2",
    category: "grammar",
    prompt: "В химической лаборатории ___ открывать окна: там проводятся точные замеры.",
    options: ["нельзя", "невозможно", "не стоит", "не удастся"],
    answer: 0,
    explanation:
      "Regola fondamentale di «НЕЛЬЗЯ»: con l'infinito imperfettivo (НСВ: «открывать») esprime un DIVIETO categoriale stabilito dalle norme («è vietato aprire le finestre»).",
  },
  {
    id: "gram-b2-aspect-nelzya-2",
    level: "B2",
    category: "grammar",
    prompt: "Старую машину ни за что ___ завести: аккумулятор полностью разрядился.",
    options: ["нельзя", "не надо", "не следует", "не разрешено"],
    answer: 0,
    explanation:
      "Regola di «НЕЛЬЗЯ» con l'infinito perfettivo (СВ: «завести»): esprime IMPOSSIBILITÀ OGGETTIVA o fisica («è impossibile metterla in moto, non parte»), non un divieto.",
  },
  {
    id: "gram-b2-aspect-imperative-1",
    level: "B2",
    category: "grammar",
    prompt: "На улице скользко, смотри ___ !",
    options: ["не падай", "не упадёшь", "не упади", "не падать"],
    answer: 2,
    explanation:
      "Costruzione di AVVERTIMENTO (Предостережение): la formula «Смотри / осторожно + НЕ + verbo all'imperativo perfettivo (СВ)» mette in guardia da un'azione involontaria e pericolosa («Bada a non cadere!»).",
  },
  {
    id: "gram-b2-aspect-imperative-2",
    level: "B2",
    category: "grammar",
    prompt: "Я ещё читаю эту страницу, пожалуйста, ___ свет!",
    options: ["не выключи", "не выключай", "не выключить", "не выключив"],
    answer: 1,
    explanation:
      "La richiesta o divieto di non compiere un'azione intenzionale richiede l'imperfettivo (НСВ): «не выключай» («non spegnere la luce!»).",
  },
  {
    id: "gram-b2-short-adj-1",
    level: "B2",
    category: "grammar",
    prompt: "Студенты старших курсов уже вполне ___ к самостоятельной исследовательской работе.",
    options: ["способные", "способны", "способность", "способными"],
    answer: 1,
    explanation:
      "La forma breve dell'aggettivo «способны к чему-либо» (predicato nominale) regge la preposizione «к» con il caso Dativo e indica una capacità o attitudine attuale.",
  },
  {
    id: "gram-b2-short-adj-2",
    level: "B2",
    category: "grammar",
    prompt: "Эта маленькая комната явно ___ для размещения трёх человек.",
    options: ["мала", "маленькая", "малой", "мало"],
    answer: 0,
    explanation:
      "La forma breve «мала для кого/чего» esprime una proprietà relativa e contestuale (la stanza è insufficiente o troppo piccola rispetto allo scopo specifico).",
  },
  {
    id: "gram-b2-gov-1",
    level: "B2",
    category: "grammar",
    prompt: "Руководитель предприятия категорически отказывается придерживаться ___ .",
    options: ["установленному регламенту", "установленный регламент", "установленного регламента", "об установленном регламенте"],
    answer: 2,
    explanation:
      "Il verbo «придерживаться» (attenersi a, osservare) regge obbligatoriamente il caso Genitivo senza preposizione: придерживаться чего? — «установленного регламента».",
  },
  {
    id: "gram-b2-gov-2",
    level: "B2",
    category: "grammar",
    prompt: "Городские власти обязаны содействовать ___ памятников архитектуры.",
    options: ["сохранению", "в сохранение", "сохранением", "о сохранении"],
    answer: 0,
    explanation:
      "Il verbo «содействовать» (favorire, cooperare, promuovere) regge il caso Dativo senza preposizione: содействовать чему? — «сохранению» (Dativo neutro).",
  },
  {
    id: "gram-b2-conjunction-1",
    level: "B2",
    category: "grammar",
    prompt: "___ глобального потепления на вершине Килиманджаро стремительно тают ледники.",
    options: ["Под давлением", "Вследствие", "Благодаря", "С целью"],
    answer: 1,
    explanation:
      "La preposizione complessa «вследствие (+ Genitivo)» appartiene al registro scientifico/ufficiale ed esprime la causa oggettiva di un fenomeno, spesso avverso o naturale.",
  },
  {
    id: "gram-b2-conjunction-2",
    level: "B2",
    category: "grammar",
    prompt: "___ ты со мной не согласен, давай закончим этот бесполезный спор.",
    options: ["Раз", "Хотя", "Пока", "Поскольку чтобы"],
    answer: 0,
    explanation:
      "La congiunzione causale-ipotetica «раз» (visto che, dal momento che) introduce una motivazione evidente e già data nella realtà del discorso: «Раз ты не согласен...» («Dal momento che non sei d'accordo...»).",
  },
  {
    id: "gram-c1-participle-synonym-1",
    level: "C1",
    category: "grammar",
    prompt: "Синонимичная замена для фразы: «Человечество овладело колоссальной энергией, когда решило урановую проблему».",
    options: [
      "решая урановую проблему",
      "решив урановую проблему",
      "решавшая урановую проблему",
      "при решении урановой проблемы до конца",
    ],
    answer: 1,
    explanation:
      "Un'azione anteriore e conclusa riferita allo stesso soggetto sintattico («человечество») si trasforma correttamente in un gerundio perfettivo (деепричастие СВ): «решив урановую проблему».",
  },
  {
    id: "gram-c1-syntax-1",
    level: "C1",
    category: "grammar",
    prompt: "«По ___ договора стороны освобождаются от взаимных обязательств». Выберите правильную форму:",
    options: ["истечению", "истечении", "истечением", "истечения"],
    answer: 1,
    explanation:
      "Nel linguaggio burocratico e giuridico, la preposizione «по» con valore temporale di anteriorità («dopo la scadenza») regge il caso Prepositivo con desinenza -и: «по истечении срока / договора».",
  },

  // ==========================================
  // 3. ЛЕКСИКА И ПАРОНИМЫ (LEXICON) — B2 & C1
  // ==========================================
  {
    id: "lex-b2-paronym-fact-1",
    level: "B2",
    category: "lexicon",
    prompt: "Специалисты считают психологическое равновесие важнейшим ___ поддержания здоровья.",
    options: ["фактом", "фактором", "фактурой", "фактом-фактором"],
    answer: 1,
    explanation:
      "Distinzione paronimica fondamentale: «фактор» è una condizione, causa o elemento trainante di un processo («fattore di salute»); «факт» è un accadimento o evento già avvenuto e provato.",
  },
  {
    id: "lex-b2-paronym-econ-1",
    level: "B2",
    category: "lexicon",
    prompt: "Новый гибридный двигатель автомобиля оказался исключительно ___ в расходе топлива.",
    options: ["экономическим", "экономным", "экономичным", "экономично"],
    answer: 2,
    explanation:
      "«Экономичный» significa che fa risparmiare o consuma poco carburante (riferito a un motore o macchina); «экономный» si riferisce a una persona parsimoniosa; «экономический» si riferisce alla scienza economica.",
  },
  {
    id: "lex-b2-paronym-offense-1",
    level: "B2",
    category: "lexicon",
    prompt: "С ним тяжело общаться в коллективе: он чересчур ___ и сразу замыкается в себе.",
    options: ["обидный", "обидчивый", "обиженный", "обижающий"],
    answer: 1,
    explanation:
      "«Обидчивый» indica il tratto caratteriale della persona permalosa, facile a offendersi; «обидный» è ciò che reca offesa (un gesto o una parola offensiva: «обидные слова»).",
  },
  {
    id: "lex-b2-particles-to-nibud-1",
    level: "B2",
    category: "lexicon",
    prompt: "В дверь позвонили. Мама сказала: «Наверное, это ___ из соседей пришёл за солью».",
    options: ["кто-нибудь", "кто-то", "кое-кто", "кто-либо"],
    answer: 1,
    explanation:
      "La particella «-то» (кто-то) si usa quando la persona esiste realmente e compie l'azione nel momento, ma la sua identità specifica non è ancora nota a chi parla («qualcuno ha suonato»).",
  },
  {
    id: "lex-b2-particles-to-nibud-2",
    level: "B2",
    category: "lexicon",
    prompt: "Если к телефону подойдёт ___ , передай, пожалуйста, что я задержусь на работе.",
    options: ["кто-то", "кто-нибудь", "кое-кто", "некто"],
    answer: 1,
    explanation:
      "Nelle frasi ipotetiche e con valore di probabilità o scelta indiscriminata («если...») si impiega la particella «-нибудь» («chiunque risponda»).",
  },
  {
    id: "lex-c1-diplomat-1",
    level: "C1",
    category: "lexicon",
    prompt: "На торжественной церемонии молодой скрипач из Ростова был объявлен ___ престижного международного конкурса.",
    options: ["дипломатом", "дипломантом", "дипломником", "дипломированным"],
    answer: 1,
    explanation:
      "«Дипломант» è colui che viene premiato con un diploma di merito in un concorso artistico o festival; «дипломат» è un funzionario estero; «дипломник» è un tesista universitario.",
  },
  {
    id: "lex-c1-idiom-nos-1",
    level: "C1",
    category: "lexicon",
    prompt: "Русский фразеологизм «водить за нос» означает:",
    options: [
      "показывать гостю дорогу в незнакомом городе",
      "вводить в заблуждение, обманывать и давать ложные обещания",
      "строго наказывать за проступок",
      "руководить подчиненными на производстве",
    ],
    answer: 1,
    explanation:
      "L'idioma russo «водить за нос» equivale all'italiano «menare per il naso»: prendere in giro qualcuno, fargli false promesse e ingannarlo sistematicamente.",
  },
  {
    id: "lex-c1-idiom-rukava-1",
    level: "C1",
    category: "lexicon",
    prompt: "Выражение «работать спустя рукава» выражает:",
    options: [
      "работать очень добросовестно и без устали",
      "работать небрежно, лениво и кое-как",
      "работать только в холодное время года",
      "работать без специальной защитной одежды",
    ],
    answer: 1,
    explanation:
      "«Работать спустя рукава» significa lavorare con indolenza, svogliatezza e trascuratezza (l'opposto dell'espressione «засучив рукава» = rimboccandosi le maniche).",
  },

  // ==========================================
  // 4. ДИАЛОГИ И АУДИРОВАНИЕ (AUDIO & DIALOGUES)
  // ==========================================
  {
    id: "audio-b2-theater-1",
    level: "B2",
    category: "audio",
    passage:
      "Диалог:\n— Здравствуй! Как дела? Что нового?\n— Да вот, выбрался в кои-то веки в театр. Заранее в кассе купил билет. В Интернете прочитал, что у них всегда полный зал, перед началом билетов не достать. А пришёл — зрителей меньше половины зала! И спектакль какой-то странный: то ли комедия, то ли мюзикл... А уж актёры! Больше половины реплик вообще не понял. Вот и верь после этого тому, что пишут!",
    prompt: "Какова основная причина разочарования говорящего после посещения театра?",
    options: [
      "Ему не хватило билетов в кассе театра",
      "Спектакль и заполненность зала обманули хвалебные ожидания из Интернета",
      "В зале было слишком шумно из-за толпы",
      "Его не пустили на вечерний сеанс",
    ],
    answer: 1,
    explanation:
      "L'interlocutore ha acquistato il biglietto spinto dalle recensioni entusiaste sul web, ma lo spettacolo e la sala mezza vuota hanno tradito completamente le sue aspettative.",
  },
  {
    id: "audio-b2-cruise-1",
    level: "B2",
    category: "audio",
    passage:
      "Рекламное сообщение:\n«Дамы и господа! Приглашаем вас в круизы по российским рекам на наших комфортабельных теплоходах. Вы можете выбрать трёхдневный тур или путешествие на три недели. При раннем бронировании до 10 апреля семьям с детьми предоставляются скидки 20%, а пенсионерам — 15%».",
    prompt: "Какую скидку получат родители, бронирующие круиз с ребёнком до 10 апреля?",
    options: ["10%", "15%", "20%", "25%"],
    answer: 2,
    explanation:
      "Nel messaggio promozionale viene esplicitamente annunciato: «семьям с детьми предоставляются скидки 20%» (sconto del 20% per famiglie con bambini).",
  },
  {
    id: "audio-c1-interview-pozner-1",
    level: "C1",
    category: "audio",
    passage:
      "Из интервью известного тележурналиста:\n«Для меня интервью — это прежде всего попытка раскрыть человека. Я должен понимать: программа делается не обо мне, а о госте. Я совершенно не стремлюсь подловить его или показать, что он идиот. Главное — слушать, а не смотреть по сторонам в ожидании, когда собеседник замолчит».",
    prompt: "Какой главный профессиональный принцип формулирует журналист для ведения содержательного диалога?",
    options: [
      "Задавать агрессивные вопросы, чтобы сбить собеседника с толку",
      "Уметь по-настоящему слушать гостя и ставить его личность в центр беседы",
      "Постоянно напоминать зрителю о своём собственном авторитете",
      "Заранее согласовывать все ответы в письменной форме",
    ],
    answer: 1,
    explanation:
      "Il conduttore spiega che l'essenza dell'intervista consiste nel mettersi da parte e ascoltare attivamente per far emergere la personalità e i pensieri autentici dell'ospite.",
  },
  {
    id: "audio-c1-etiquette-reaction-1",
    level: "C1",
    category: "audio",
    prompt: "Собеседник сообщает: «Ты посмотри, какую машину шеф себе купил! Мечта всей жизни!» Как стилистически адекватно выразить ВОСХИЩЕНИЕ в разговорном регистре?",
    options: [
      "«Вот это да! Настоящий шедевр!»",
      "«Ничего особенного, видали и лучше».",
      "«Мне кажется, это нецелесообразная трата средств».",
      "«Прошу вас немедленно предоставить отчёт».",
    ],
    answer: 0,
    explanation:
      "«Вот это да! Настоящий шедевр!» è la formula tipica del registro colloquiale russo per esprimere vivo entusiasmo e sincero stupore positivo.",
  },

  // ==========================================
  // 5. ПИСЬМО И ДЕЛОВОЙ СТИЛЬ (WRITING & STYLE)
  // ==========================================
  {
    id: "write-b2-zayavlenie-struct-1",
    level: "B2",
    category: "writing",
    prompt: "В каком падеже указывается адресат (лицо, к которому обращаются) в шапке официального заявления?",
    options: [
      "В родительном падеже (от кого)",
      "В дательном падеже (кому: Декану, Директору)",
      "В винительном падеже",
      "В творительном падеже",
    ],
    answer: 1,
    explanation:
      "Nelle richieste formali russe (заявление), il destinatario nell'intestazione in alto a destra va sempre espresso al caso Dativo (a chi è indirizzato: Декану, Ректору, Директору).",
  },
  {
    id: "write-b2-error-correction-1",
    level: "B2",
    category: "writing",
    passage:
      "Фрагмент студенческого письма:\n«*Я извиняюсь за то, что опоздал на первую пару. Пожалуйста, не ставьте мне двойку, ведь мой брат женился*».",
    prompt: "Какая грубая стилистическая ошибка допущена в данном официальном обращении?",
    options: [
      "Использование просторечного возвратного «я извиняюсь» и инфантильной мотивировки вместо формулы «Прошу извинить за...»",
      "Отсутствие даты в начале первой строки",
      "Неправильное употребление прошедшего времени глагола",
      "Слишком длинные предложения",
    ],
    answer: 0,
    explanation:
      "Nell'etichetta linguistica russa la forma «я извиняюсь» è considerata scorretta e colloquiale (suona come autoassoluzione). La formula formale corretta è «Прошу извинить / Прошу прощения за опоздание».",
  },
  {
    id: "write-c1-letter-closing-1",
    level: "C1",
    category: "writing",
    prompt: "Какая заключительная формула является общепринятым стандартом деловой переписки в России?",
    options: [
      "«Целую, жду ответа!»",
      "«С уважением, (должность, подпись, ФИО)»",
      "«Пока, до скорого!»",
      "«Ваш навеки преданный слуга»",
    ],
    answer: 1,
    explanation:
      "La formula canonica e obbligatoria per chiudere la corrispondenza formale ed economica in Russia è «С уважением,» seguita dal ruolo, dalla firma e dal nome completo.",
  },
  {
    id: "write-c1-error-analysis-2",
    level: "C1",
    category: "writing",
    passage:
      "Предложение из реферата иностранного учащегося:\n«*Автор в своей статье заявляет о своих амбициях и требует больших усилий от читателя*».",
    prompt: "Какое нарушение лексической сочетаемости допущено в предложении?",
    options: [
      "«Заявлять об амбициях» стилистически некорректно в научном стиле; следует использовать «излагает концепцию / формулирует тезисы»",
      "В слове «статья» допущена грамматическая ошибка",
      "Нельзя использовать предлог «в» с существительным «статья»",
      "Существительное «читатель» должно быть только во множественном числе",
    ],
    answer: 0,
    explanation:
      "Nello stile accademico e scientifico russo (научный стиль) sono inaccettabili espressioni emotive o personalistiche come «заявляет об амбициях». Si usano formule analitiche neutre come «автор формулирует концепцию, обосновывает положение, рассматривает проблему».",
  },
];
