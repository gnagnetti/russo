import type { Category, Level, Question } from "./types";
import pdfItems from "./pdf-questions.json";
import { NEW_AUTHENTIC_QUESTIONS } from "./new-tests-data";

type Q = Omit<Question, "id" | "level" | "category">;
const bank: Record<Level, Partial<Record<Category, Q[]>>> = {
  A1: {
    grammar: [
      {
        prompt: "Это мой ___ .",
        options: ["брат", "сестра́", "окно́", "кни́га"],
        answer: 0,
        explanation: "«Мой» è il pronome possessivo maschile singolare: si accorda necessariamente con un sostantivo maschile («брат»).",
        wrongExplanations: {
          1: "«Сестра́» è un sostantivo femminile (termina in -а). Il possessivo maschile «мой» non concorda in genere: con «сестра» richiederebbe «моя́ сестра».",
          2: "«Окно́» è un sostantivo neutro (termina in -о). Con «окно» è richiesta la forma possessiva neutra «моё окно», non il maschile «мой».",
          3: "«Кни́га» è un sostantivo femminile (termina in -а). Con il possessivo maschile «мой» vi è un errore di concordanza di genere: serve «моя́ книга»."
        }
      },
      {
        prompt: "Я живу́ в ___ .",
        options: ["Москва́", "Москву́", "Москве́", "Москво́й"],
        answer: 2,
        explanation: "La preposizione «в» con significato di stato in luogo («где? / dove?») regge obbligatoriamente il caso Prepositivo: «в Москве́».",
        wrongExplanations: {
          0: "«Москва́» è al caso Nominativo (forma base). Dopo una preposizione di luogo come «в» il sostantivo non può mai restare al nominativo.",
          1: "«Москву́» è al caso Accusativo singolare (-у). La costruzione «в + Accusativo» esprime moto a luogo («куда? / verso dove?», es. «я еду в Москву»), mentre con il verbo di stato «жить» (vivere) è richiesto il Prepositivo («в Москве»).",
          3: "«Москво́й» è al caso Strumentale (-ой). La preposizione «в» non regge mai il caso strumentale per esprimere lo stato in luogo."
        }
      },
      {
        prompt: "У меня́ есть ___ .",
        options: ["маши́ну", "маши́на", "маши́ны", "маши́не"],
        answer: 1,
        explanation: "Nella costruzione russa del possesso «у меня есть», la cosa posseduta è il soggetto grammaticale della frase e va categoricamente al caso Nominativo: «машина».",
        wrongExplanations: {
          0: "«Маши́ну» è al caso Accusativo (-у). Nella costruzione «у меня есть...» non si usa l'accusativo perché non c'è un verbo transitivo diretto: la cosa posseduta è il soggetto al Nominativo.",
          2: "«Маши́ны» è al caso Genitivo singolare (o Nominativo plurale). Il genitivo si userebbe nella frase negativa di mancanza: «у меня нет машины» (non ho la macchina). Con «есть» serve il nominativo.",
          3: "«Маши́не» è al caso Dativo o Prepositivo (-е), incompatibile con la funzione di soggetto della frase con «у меня есть»."
        }
      },
      {
        prompt: "Мы ___ по-ру́сски.",
        options: ["говорю́", "говори́т", "говори́м", "говоря́т"],
        answer: 2,
        explanation: "Il soggetto «мы» (noi) richiede la 1ª persona plurale del presente (II coniugazione): «говори́м».",
        wrongExplanations: {
          0: "«Говорю́» è la 1ª persona singolare («я говорю» = io parlo). Con il soggetto «мы» (noi) crea un errore di accordo di persona e numero.",
          1: "«Говори́т» è la 3ª persona singolare («он/она говорит» = egli/ella parla), incompatibile con il pronome soggetto «мы».",
          3: "«Говоря́т» è la 3ª persona plurale («они говорят» = essi parlano), incompatibile con «мы»."
        }
      },
    ],
    lexicon: [
      {
        prompt: "Утром я пью ___ .",
        options: ["хлеб", "ко́фе", "суп", "стол"],
        answer: 1,
        explanation: "Si beve il caffè: «ко́фе» (sostantivo indeclinabile di genere maschile).",
        wrongExplanations: {
          0: "«Хлеб» significa pane. Il pane si mangia («есть / кушать»), non si beve («пить»).",
          2: "«Суп» significa zuppa. La zuppa è un cibo e non una tipica bevanda mattutina da bere.",
          3: "«Стол» significa tavolo (mobile), non commestibile né bevibile."
        }
      },
      {
        prompt: "Antonimo di «большо́й»:",
        options: ["высо́кий", "ма́ленький", "краси́вый", "но́вый"],
        answer: 1,
        explanation: "«Маленький» (piccolo) è l'antonimo (contrario) esatto di «большой» (grande).",
        wrongExplanations: {
          0: "«Высо́кий» significa alto. Il suo contrario è «низкий» (basso), non «большой».",
          2: "«Краси́вый» significa bello. Il suo contrario è «некрасивый» (brutto).",
          3: "«Но́вый» significa nuovo. Il suo contrario è «старый» (vecchio)."
        }
      },
      {
        prompt: "Где мо́жно купи́ть хлеб?",
        options: ["в апте́ке", "в магази́не", "в шко́ле", "в теа́тре"],
        answer: 1,
        explanation: "Il pane si compra in negozio / panetteria: «в магази́не».",
        wrongExplanations: {
          0: "«В апте́ке» significa in farmacia: vi si acquistano medicinali, non alimenti di base come il pane.",
          2: "«В шко́ле» significa a scuola: è un istituto di istruzione, non un esercizio commerciale.",
          3: "«В теа́тре» significa a teatro: è un luogo d'arte e spettacolo, non un negozio."
        }
      },
    ],
    reading: [
      {
        passage: "Меня́ зову́т А́нна. Я студе́нтка. Я учу́сь в университе́те и изуча́ю ру́сский язы́к. Мой брат — врач.",
        prompt: "Кто А́нна?",
        options: ["врач", "студе́нтка", "учи́тельница", "инжене́р"],
        answer: 1,
        explanation: "«Я студентка»: nel testo Anna specifica chiaramente di essere una studentessa universitaria.",
        wrongExplanations: {
          0: "«Врач» (medico) è la professione del fratello di Anna («Мой брат — врач»), non di Anna.",
          2: "«Учи́тельница» (insegnante) non è menzionata nel testo; Anna studia e non insegna.",
          3: "«Инжене́р» (ingegnere) non ha alcun riscontro nel testo."
        }
      },
      {
        passage: "Меня́ зову́т А́нна. Я студе́нтка. Я учу́сь в университе́те и изуча́ю ру́сский язы́к. Мой брат — врач.",
        prompt: "Что изуча́ет А́нна?",
        options: ["медици́ну", "англи́йский", "ру́сский язы́к", "исто́рию"],
        answer: 2,
        explanation: "«Изучаю русский язык»: nel testo Anna dichiara esplicitamente di studiare la lingua russa.",
        wrongExplanations: {
          0: "«Медици́ну» (medicina) è associabile al lavoro del fratello (medico), ma Anna dichiara di studiare lingua russa.",
          1: "«Англи́йский» (inglese) non è citato nel brano.",
          3: "«Исто́рию» (storia) non è menzionata nel testo."
        }
      },
    ],
  },
  A2: {
    grammar: [
      {
        prompt: "Я давно́ не ви́дел ___ .",
        options: ["свою́ сестру́", "своя́ сестра́", "свое́й сестре́", "свое́й сестры́"],
        answer: 0,
        explanation: "Il verbo «видеть» (vedere) regge il complemento oggetto all'Accusativo; trattandosi di essere animato femminile singolare («сестра»), la desinenza corretta è in -у: «свою́ сестру́».",
        wrongExplanations: {
          1: "«Своя́ сестра́» è al caso Nominativo. Il complemento oggetto retto da «видеть» deve andare all'Accusativo, non al Nominativo.",
          2: "«Свое́й сестре́» è al Dativo o Prepositivo singolare (-е). «Видеть» non regge il Dativo.",
          3: "«Свое́й сестры́» è al Genitivo singolare. Anche se la frase è negativa, nel russo standard con «видеть» riferito a persona specifica si usa comunemente l'accusativo animato «свою сестру», mentre il genitivo qui sarebbe percepito come desueto o errato nell'accordo standard del test A2."
        }
      },
      {
        prompt: "Вчера́ мы ___ в кино́.",
        options: ["идём", "ходи́ли", "пойдём", "хо́дим"],
        answer: 1,
        explanation: "Un viaggio di andata e ritorno completato nel passato richiede il verbo multidirezionale al tempo passato: «ходи́ли».",
        wrongExplanations: {
          0: "«Идём» è al tempo Presente del verbo unidirezionale. L'avverbio temporale «вчера» (ieri) colloca l'evento nel passato, rendendo incompatibile il presente.",
          2: "«Пойдём» è al Futuro semplice perfettivo («andremo»). Non è compatibile con «вчера».",
          3: "«Хо́дим» è al tempo Presente abituale («andiamo abitualmente»), incompatibile con l'avvenimento concluso ieri («вчера»)."
        }
      },
      {
        prompt: "Я позвоню́ ___ за́втра.",
        options: ["тебя́", "тебе́", "тобо́й", "ты"],
        answer: 1,
        explanation: "Il verbo «звонить / позвонить» (telefonare) regge tassativamente il caso Dativo (кому?): «тебе́».",
        wrongExplanations: {
          0: "«Тебя́» è all'Accusativo o Genitivo. Questo è il classico errore di calco dall'italiano ('ti chiamo / chiamo te'). In russo «звонить» non è transitivo diretto, ma regge il Dativo.",
          2: "«Тобо́й» è al caso Strumentale (кем?), non retto da «звонить».",
          3: "«Ты» è al caso Nominativo (forma soggetto), non utilizzabile come complemento di termine."
        }
      },
      {
        prompt: "В кла́ссе пять ___ .",
        options: ["студе́нт", "студе́нта", "студе́нтов", "студе́нты"],
        answer: 2,
        explanation: "Dopo i numeri da 5 a 20 (e composti che terminano con essi) i sostantivi richiedono obbligatoriamente il caso Genitivo plurale: «студе́нтов».",
        wrongExplanations: {
          0: "«Студе́нт» è al Nominativo singolare. Si userebbe solo con il numero 1 («один студент»).",
          1: "«Студе́нта» è al Genitivo singolare. Si usa con i numeri 2, 3, 4 («два/три/четыре студента»), ma mai con 5.",
          3: "«Студе́нты» è al Nominativo plurale. Dopo i numeri cardinali in russo si usa sempre il genitivo (singolare o plurale), mai il nominativo plurale."
        }
      },
    ],
    lexicon: [
      {
        prompt: "Он ___ на врача́ уже́ два го́да.",
        options: ["у́чится", "изуча́ет", "у́чит", "занима́ется"],
        answer: 0,
        explanation: "La costruzione specifica per indicare che si studia per intraprendere una professione è «учи́ться на + Accusativo»: «учится на врача».",
        wrongExplanations: {
          1: "«Изуча́ет» regge l'Accusativo diretto di una materia scientifica (es. «изучает медицину»), non accetta la reggenza con la preposizione «на + Accusativo di professione».",
          2: "«У́чит» regge l'Accusativo di qualcosa che si impara a memoria (es. «учит стихи») o una persona a cui si insegna (es. «учит детей»), non la costruzione «на врача».",
          3: "«Занима́ется» significa dedicarsi a qualcosa o fare i compiti/esercitarsi; non regge «на + Accusativo» per indicare la futura professione."
        }
      },
      {
        prompt: "Мне ну́жно ___ биле́т на по́езд.",
        options: ["взять в долг", "заказа́ть", "сказа́ть", "посмотре́ть"],
        answer: 1,
        explanation: "La collocazione corretta per prenotare o acquistare un biglietto è «заказа́ть биле́т» (o «купи́ть биле́т»).",
        wrongExplanations: {
          0: "«Взять в долг» significa chiedere in prestito del denaro; non ha senso per l'acquisto di un biglietto ferroviario.",
          2: "«Сказа́ть» significa dire/parlare, non è una collocazione lessicale sensata con «билет».",
          3: "«Посмотре́ть» significa guardare; guardare un biglietto non risolve l'esigenza di procurarselo per il viaggio."
        }
      },
      {
        prompt: "Сего́дня хо́лодно, на́до наде́ть ___ .",
        options: ["шо́рты", "ку́ртку", "сарафа́н", "очки́"],
        answer: 1,
        explanation: "Dato il freddo («холодно»), l'indumento caldo appropriato da indossare è la giacca: «ку́ртку».",
        wrongExplanations: {
          0: "«Шо́рты» sono i pantaloncini corti estivi, inadatti quando fa freddo.",
          2: "«Сарафа́н» è un vestito/prendisole estivo senza maniche, inadatto alle basse temperature.",
          3: "«Очки́» sono gli occhiali, che non servono per riscaldarsi dal freddo."
        }
      },
    ],
    reading: [
      {
        passage: "В суббо́ту И́горь е́здил на да́чу к роди́телям. Там он помога́л отцу́ ремонти́ровать крышу, а ве́чером они́ вме́сте ловили ры́бу на о́зере.",
        prompt: "Что де́лал И́горь ве́чером?",
        options: ["ремонти́ровал кры́шу", "лови́л ры́бу", "отдыха́л до́ма", "е́хал в го́род"],
        answer: 1,
        explanation: "«Вечером они вместе ловили рыбу на озере»: il testo specifica che la sera pescavano.",
        wrongExplanations: {
          0: "«Ремонти́ровал крышу» era l'attività svolta di giorno/durante la giornata, non la sera.",
          2: "«Отдыха́л дома» non corrisponde al testo, poiché Igor si trovava sul lago a pescare.",
          3: "«Е́хал в город» non è menzionato: Igor ha trascorso la serata sul lago."
        }
      },
      {
        passage: "В суббо́ту И́горь е́здил на да́чу к роди́телям. Там он помога́л отцу́ ремонти́ровать крышу, а ве́чером они́ вме́сте ловили ры́бу на о́зере.",
        prompt: "Кому́ помога́л И́горь?",
        options: ["ма́ме", "дру́гу", "отцу́", "сосе́ду"],
        answer: 2,
        explanation: "«Помогал отцу»: il brano dichiara chiaramente che Igor aiutava il padre.",
        wrongExplanations: {
          0: "«Ма́ме» non è specificata come destinataria dell'aiuto nella riparazione del tetto.",
          1: "«Дру́гу» non compare nel testo (Igor era dai genitori).",
          3: "«Сосе́ду» non è citato nel brano."
        }
      },
    ],
  },
  B1: {
    grammar: [
      {
        prompt: "Е́сли бы у меня́ бы́ло вре́мя, я ___ с ва́ми.",
        options: ["пое́ду", "пое́хал бы", "е́ду", "е́здил"],
        answer: 1,
        explanation: "Nel periodo ipotetico dell'irrealtà/possibilità («если бы...»), sia la protasi che l'apodosi richiedono la particella «бы» con il verbo al passato: «пое́хал бы».",
        wrongExplanations: {
          0: "«Пое́ду» è all'indicativo futuro. In una frase introdotta da «если бы» l'apodosi richiede obbligatoriamente il congiuntivo-condizionale con «бы».",
          2: "«Е́ду» è all'indicativo presente (realtà in corso), incompatibile con la condizione ipotetica irreale espressa da «если бы».",
          3: "«Е́здил» è al passato semplice indicativo senza «бы»: indicherebbe un fatto reale del passato, mentre qui si tratta di un'ipotesi irreale."
        }
      },
      {
        prompt: "Студе́нт, ___ я вчера́ познако́мился, из Ита́лии.",
        options: ["кото́рый", "кото́рого", "с кото́рым", "кото́рому"],
        answer: 2,
        explanation: "Il verbo «познако́миться» (fare la conoscenza di qualcuno) richiede tassativamente la reggenza preposizionale «с + Strumentale»: «с кото́рым».",
        wrongExplanations: {
          0: "«Кото́рый» è al Nominativo, ma nella relativa non ha funzione di soggetto (il soggetto è «я»).",
          1: "«Кото́рого» è all'Accusativo o Genitivo. «Познакомиться» non regge l'accusativo diretto (sarebbe un calco errato dall'italiano 'che ho conosciuto'), ma richiede «с кем?».",
          3: "«Кото́рому» è al Dativo, caso non retto da «познакомиться»."
        }
      },
      {
        prompt: "Он вошёл в ко́мнату, ___ дверь.",
        options: ["закрыва́я", "закры́в", "закры́л", "закрыва́ть"],
        answer: 1,
        explanation: "L'azione della chiusura della porta è anteriore o conclusa al momento dell'ingresso, per cui si impiega il gerundio perfettivo: «закры́в» (dopo aver chiuso).",
        wrongExplanations: {
          0: "«Закрыва́я» è un gerundio imperfettivo che indicherebbe una chiusura prolungata e contemporanea all'entrare («mentre chiudeva»). L'azione richiede invece la compiutezza immediata espressa dal perfettivo «закрыв».",
          2: "«Закры́л» è all'indicativo passato: senza una congiunzione coordinante come «и» («он вошёл в комнату и закрыл дверь») la frase risulterebbe slegata ed errata sintatticamente.",
          3: "«Закрыва́ть» è all'infinito, forma non utilizzabile per svolgere il ruolo di proposizione secondaria circostanziale."
        }
      },
      {
        prompt: "Ма́ма попроси́ла, ___ я купи́л молоко́.",
        options: ["что", "что́бы", "е́сли", "потому́ что"],
        answer: 1,
        explanation: "Una richiesta o comando con soggetti differenti («мама попросила» / «я купил») richiede la congiunzione volitiva «что́бы» seguita dal verbo al tempo passato.",
        wrongExplanations: {
          0: "«Что» è una congiunzione dichiarativa oggettiva per fatti reali (es. «мама сказала, что я купил молоко» = la mamma ha detto che io ho comprato il latte). Con una richiesta («попросила») è d'obbligo «чтобы».",
          2: "«Е́сли» introduce un'ipotesi condizionale («se»), non un completamento volitivo di richiesta.",
          3: "«Потому́ что» introduce una proposizione causale («perché»), priva di senso dopo il verbo di richiesta «попросила»."
        }
      },
    ],
    lexicon: [
      {
        prompt: "Э́тот фильм произвёл на меня́ си́льное ___ .",
        options: ["впечатле́ние", "выраже́ние", "отноше́ние", "представле́ние"],
        answer: 0,
        explanation: "La collocazione fissa russa per dire 'fare una forte impressione' è «произвести́ впечатле́ние».",
        wrongExplanations: {
          1: "«Выраже́ние» significa espressione (facciale o verbale); non forma la collocazione con «произвести на кого-либо».",
          2: "«Отноше́ние» significa rapporto/relazione/atteggiamento (es. «хорошее отношение к людям»); non si usa con «произвести».",
          3: "«Представле́ние» significa spettacolo, recita o idea astratta («иметь представление» = avere un'idea); non si combina con «произвести сильное...»."
        }
      },
      {
        prompt: "Он ___ уча́стие в конфере́нции.",
        options: ["взял", "при́нял", "сде́лал", "дал"],
        answer: 1,
        explanation: "La frase idiomatica obbligata in russo per 'prendere parte / partecipare' è «приня́ть уча́стие в чём-либо».",
        wrongExplanations: {
          0: "«Взял» (ha preso) è un calco letterale dall'italiano 'ha preso parte'. In russo non si dice «взять участие», bensì «принять участие».",
          2: "«Сде́лал» (ha fatto) non si combina con «участие».",
          3: "«Дал» (ha dato) non ha alcun legame con l'espressione di partecipazione."
        }
      },
      {
        prompt: "Мы ___ все вопро́сы на собра́нии.",
        options: ["обсуди́ли", "осуди́ли", "рассуди́ли", "присуди́ли"],
        answer: 0,
        explanation: "«Обсуди́ть» significa esaminare collegialmente, dibattere e discutere una questione.",
        wrongExplanations: {
          1: "«Осуди́ли» è un paronimo con significato completamente diverso: significa 'condannare moralmente o penalmente'. Non si 'condannano' le questioni all'ordine del giorno di una riunione.",
          2: "«Рассуди́ли» significa fare da paciere, giudicare una controversia tra due contendenti («кто прав, кто виноват»).",
          3: "«Присуди́ли» significa assegnare per sentenza o premiazione (es. «присудить премию/наказание»)."
        }
      },
    ],
    reading: [
      {
        passage: "Всё бо́льше молоды́х люде́й выбира́ют удалённую рабо́ту. По да́нным опро́са, гла́вная причи́на — возмо́жность самостоя́тельно планировать день. Одна́ко мно́гие признаю́тся, что им не хвата́ет живо́го обще́ния с колле́гами.",
        prompt: "Гла́вная причи́на вы́бора удалённой рабо́ты:",
        options: ["высо́кая зарпла́та", "свобо́да в плани́ровании вре́мени", "обще́ние с колле́гами", "приказ руково́дства"],
        answer: 1,
        explanation: "Il testo segnala chiaramente: «главная причина — возможность самостоятельно планировать день» (libertà nell'organizzare la giornata).",
        wrongExplanations: {
          0: "«Высо́кая зарплата» (stipendio alto) non è citato nel brano come motivo della scelta.",
          2: "«Обще́ние с коллегами» è indicato nel testo come ciò che manca (svantaggio), non come ragione di scelta.",
          3: "«Прика́з руководства» è l'opposto: il testo parla di una scelta volontaria dei giovani («выбирают молодые люди»)."
        }
      },
      {
        passage: "Всё бо́льше молоды́х люде́й выбира́ют удалённую рабо́ту. По да́нным опро́са, гла́вная причи́на — возмо́жность самостоя́тельно планировать день. Одна́ко мно́гие признаю́тся, что им не хвата́ет живо́го обще́ния с колле́гами.",
        prompt: "Како́й недоста́ток упомина́ется?",
        options: ["ма́ло де́нег", "нехва́тка обще́ния", "плохо́й интерне́т", "мно́го рабо́ты"],
        answer: 1,
        explanation: "Il punto critico menzionato è: «не хватает живого общения с коллегами» (carenza di contatti umani con i colleghi).",
        wrongExplanations: {
          0: "«Ма́ло денег» (pochi soldi) non viene affrontato nel brano.",
          2: "«Плохо́й интернет» non è citato nel testo.",
          3: "«Мно́го работы» non è descritto come il fattore di disagio citato dagli intervistati."
        }
      },
    ],
  },
  B2: {
    grammar: [
      {
        prompt: "___ на тру́дности, экспеди́ция дости́гла верши́ны.",
        options: ["Несмотря́", "Благодаря́", "Всле́дствие", "Ввиду́"],
        answer: 0,
        explanation: "Proposizione concessiva: «несмотря́ на (+ Acc.)» significa 'nonostante / malgrado le difficoltà'.",
        wrongExplanations: {
          1: "«Благодаря́» significa 'grazie a' e regge il Dativo (non la preposizione «на + Acc.»); si usa solo per fattori favorevoli, mentre le difficoltà sono ostacoli.",
          2: "«Всле́дствие» significa 'a causa di / in conseguenza di' e regge il Genitivo senza la preposizione «на».",
          3: "«Ввиду́» significa 'in vista di / considerato' e regge il Genitivo diretto, non la costruzione «на + Accusativo»."
        }
      },
      {
        prompt: "Докла́д, ___ профе́ссором, вы́звал диску́ссию.",
        options: ["прочита́вший", "прочи́танный", "чита́ющий", "чита́я"],
        answer: 1,
        explanation: "Participio passivo passato al nominativo maschile: «прочи́танный профессором» (la relazione tenuta/letta dal professore). L'agente d'azione è al caso Strumentale («профессором»).",
        wrongExplanations: {
          0: "«Прочита́вший» è un participio attivo passato: indicherebbe che la relazione stessa ha letto il professore, ribaltando il senso.",
          2: "«Чита́ющий» è un participio attivo presente («che legge»), non passivo.",
          3: "«Чита́я» è un gerundio imperfettivo («leggendo»), che non può accordarsi come attributo di «доклад»."
        }
      },
      {
        prompt: "Ему́ не ___ поня́ть э́ту тео́рию.",
        options: ["удало́сь", "удался́", "уда́лся", "удава́лась"],
        answer: 0,
        explanation: "Costruzione impersonale con il verbo pronominale «удаться» al tempo passato neutro singolare: «ему не удалось» (non gli è riuscito / non è stato capace).",
        wrongExplanations: {
          1: "«Удался́» (o уда́лся) è al genere maschile: si userebbe solo in presenza di un soggetto maschile esplicito (es. «фильм удался»), mentre qui la frase è impersonale con l'infinito («понять»).",
          2: "«Уда́лся» presenta forma maschile e accento errato per la costruzione impersonale.",
          3: "«Удава́лась» è femminile («ella riusciva»), non applicabile in una costruzione impersonale con infinito."
        }
      },
    ],
    lexicon: [
      {
        prompt: "Компа́ния ___ убы́тки из-за кри́зиса.",
        options: ["понесла́", "принесла́", "вынесла", "занесла́"],
        answer: 0,
        explanation: "Collocazione economica e giuridica obbligata: «понести́ убы́тки» = subire perdite finanziarie.",
        wrongExplanations: {
          1: "«Принесла́» significa ha portato/arrecato (es. «принесла прибыль» = ha fruttato profitto); non si usa per il subire perdite («убытки»).",
          2: "«Вы́несла» significa ha sopportato fisicamente o portato fuori (es. «вынесла приговор» = ha emesso sentenza).",
          3: "«Занесла́» significa ha registrato o portato dentro (es. «занесла в список» = ha inserito nella lista)."
        }
      },
      {
        prompt: "Его́ предложе́ние не ___ подде́ржки.",
        options: ["нашло́", "вошло́", "пришло́", "ушло́"],
        answer: 0,
        explanation: "Espressione idiomatica russa: «найти́ подде́ржку» = trovare appoggio, incontrare consenso.",
        wrongExplanations: {
          1: "«Вошло́» significa è entrato (es. «вошло в моду» = è entrato di moda), non forma la frase con «поддержка».",
          2: "«Пришло́» significa è arrivato/giunto a piedi.",
          3: "«Ушло́» significa è andato via / sparito."
        }
      },
      {
        prompt: "Sinonimo di «незаме́нимый»:",
        options: ["бесполе́зный", "необходи́мый", "случа́йный", "второстепе́нный"],
        answer: 1,
        explanation: "«Незамени́мый» (insostituibile) è sinonimo di «необходи́мый» (indispensabile, strettamente necessario).",
        wrongExplanations: {
          0: "«Бесполе́зный» significa inutile, contrario di utile.",
          2: "«Случа́йный» significa casuale/fortuito.",
          3: "«Второстепе́нный» significa secondario o marginale, il contrario di indispensabile."
        }
      },
    ],
    reading: [
      {
        passage: "Исто́рики подчёркивают, что рефо́рмы Петра́ I бы́ли противоречи́выми: с одно́й стороны́, они́ модернизи́ровали госуда́рство, с друго́й — ложи́лись тяжёлым бре́менем на крестья́нство.",
        prompt: "Как а́втор оце́нивает рефо́рмы?",
        options: ["то́лько положи́тельно", "то́лько отрица́тельно", "неоднозна́чно", "не оце́нивает"],
        answer: 2,
        explanation: "«Были противоречивыми»: l'autore formula un giudizio storico articolato e non univoco (неоднозна́чно = in modo contraddittorio/ambivalente).",
        wrongExplanations: {
          0: "«То́лько положительно» (solo positivamente) ignora il pesante fardello sui contadini menzionato nel brano.",
          1: "«То́лько отрицательно» (solo negativamente) ignora la modernizzazione dello stato sottolineata dallo storico.",
          3: "«Не оце́нивает» (non valuta) è falso: l'autore le qualifica espressamente come «противоречивые»."
        }
      },
    ],
  },
  C1: {
    grammar: [
      {
        prompt: "___ бы он ни говори́л, ему́ никто́ не ве́рил.",
        options: ["Что", "Как", "Чем", "Кто"],
        answer: 0,
        explanation: "Costruzione concessiva generalizzante «что бы ни»: «Qualunque cosa dicesse (oggetto diretto del verbo «говорил»), nessuno gli credeva».",
        wrongExplanations: {
          1: "«Как» esprimerebbe il modo («in qualunque modo dicesse»), ma la frase intende il contenuto delle parole («cosa diceva»).",
          2: "«Чем» è allo Strumentale, caso non retto da «говорить» come complemento oggetto diretto.",
          3: "«Кто» è al Nominativo personale e duplicherebbe il soggetto «он» («chiunque lui dicesse» è scorretto)."
        }
      },
      {
        prompt: "По ___ сро́ка догово́р счита́ется расто́ргнутым.",
        options: ["истече́нию", "истече́нии", "истече́ние", "истече́нием"],
        answer: 1,
        explanation: "Costruzione temporale del linguaggio formale burocratico e giuridico: «по + Prepositivo in -и» per sostantivi in -ие («по истече́нии» = al compimento / alla scadenza del termine).",
        wrongExplanations: {
          0: "«Истече́нию» è al caso Dativo. Sebbene nel linguaggio parlato informale sia frequente l'errore del dativo dopo «по», nella norma colta e nei test C1 la preposizione temporale «по» con valore di 'dopo / al termine di' esige inderogabilmente il Prepositivo con desinenza -и («по истечении»).",
          2: "«Истече́ние» è al Nominativo/Accusativo semplice.",
          3: "«Истече́нием» è allo Strumentale, non retto da «по» con questo valore temporale."
        }
      },
      {
        prompt: "Он говори́л так убеди́тельно, ___ все согласи́лись.",
        options: ["что́бы", "что", "как бу́дто", "е́сли"],
        answer: 1,
        explanation: "Proposizione consecutiva reale: la correlazione «так..., что» indica una conseguenza effettivamente verificatasi nel passato («Parlava in modo così convincente che tutti furono d'accordo»).",
        wrongExplanations: {
          0: "«Что́бы» esprimerebbe uno scopo ipotetico («affinché»), non una conseguenza reale ed effettiva già accaduta.",
          2: "«Как бу́дто» esprimerebbe una similitudine o supposizione irreale («come se»), non una conseguenza diretta.",
          3: "«Е́сли» esprimerebbe una condizione («se»), incompatibile con l'avverbio correlativo «так»."
        }
      },
    ],
    lexicon: [
      {
        prompt: "Его́ слова́ ___ в коне́ц всем спо́рам.",
        options: ["поста́вили то́чку", "положи́ли коне́ц", "сде́лали коне́ц", "да́ли то́чку"],
        answer: 1,
        explanation: "Espressione idiomatica russa corretta: «положи́ть коне́ц чему-либо» = porre fine/termine a qualcosa.",
        wrongExplanations: {
          0: "«Поста́вили точку» è un'altra espressione ('mettere un punto'), ma si costruisce con «в чём-либо» (es. «поставить точку в споре»), non con la reggenza «поставить в конец».",
          2: "«Сде́лали конец» è una traduzione maccheronica e non esiste nella fraseologia russa.",
          3: "«Да́ли точку» non ha alcun significato idiomatico in russo."
        }
      },
      {
        prompt: "«Води́ть за нос» significa:",
        options: ["guidare", "ingannare", "aiutare", "rimproverare"],
        answer: 1,
        explanation: "Fraseologismo russo molto comune nei test ТРКИ: «води́ть за нос» significa ingannare, abbindolare qualcuno o promettere a vuoto.",
        wrongExplanations: {
          0: "«Guidare» è il senso letterale del verbo «водить», ma nella locuzione idiomatica «водить за нос» il significato è metaforico e significa ingannare.",
          2: "«Aiutare» è un'azione positiva, esattamente l'opposto di un raggiro.",
          3: "«Rimproverare» non è collegato a questa espressione idiomatica."
        }
      },
      {
        prompt: "Пробле́ма тре́бует ___ подхо́да.",
        options: ["взвешенного", "ве́шающего", "наве́шанного", "све́шенного"],
        answer: 0,
        explanation: "Collocazione aggettivale del russo colto e formale: «взве́шенный подхо́д» = un approccio ponderato, equilibrato, attentamente valutato.",
        wrongExplanations: {
          1: "«Ве́шающего» è un participio attivo presente dal verbo 'appendere' (che appende), privo di senso con «подход».",
          2: "«Наве́шанного» si riferisce a oggetti fisicamente appesi in abbondanza.",
          3: "«Све́шенного» significa penzolante verso il basso."
        }
      },
    ],
    reading: [
      {
        passage: "Язы́к — не просто́й инструме́нт коммуника́ции, но и храни́тель коллекти́вной па́мяти наро́да. Утра́та языка́ влечёт за собо́й невосполни́мую поте́рю культу́рного насле́дия.",
        prompt: "Основна́я мысль те́кста:",
        options: ["язы́к ну́жен то́лько для обще́ния", "язы́к хра́нит культу́рную па́мять", "языки́ легко́ восстана́вливаются", "па́мять не свя́зана с языко́м"],
        answer: 1,
        explanation: "Il testo dichiara che la lingua è «хранитель коллективной памяти народа» (custode della memoria culturale e collettiva).",
        wrongExplanations: {
          0: "«Язык нужен только для общения» è esplicitamente smentito dall'incipit: «Язык — не простой инструмент коммуникации...».",
          2: "«Языки легко восстанавливаются» è smentito dall'espressione «невосполнимую потерю» (perdita irreparabile).",
          3: "«Память не связана с языком» contraddice totalmente la tesi centrale dell'autore."
        }
      },
    ],
  },
};

export const QUESTIONS: Question[] = Object.entries(bank).flatMap(([level, cats]) =>
  Object.entries(cats).flatMap(([category, list]) =>
    ((list as Q[]) || []).map((q, i) => ({ ...q, id: `${level}-${category}-${i}`, level: level as Level, category: category as Category })),
  ),
).concat(pdfItems as Question[]).concat(NEW_AUTHENTIC_QUESTIONS);

export function shuffle<T>(a: T[]): T[] {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = r[i]!; r[i] = r[j]!; r[j] = t; }
  return r;
}
