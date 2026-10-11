import type { Category, Level, Question } from "./types";
import pdfItems from "./pdf-questions.json";
import { NEW_AUTHENTIC_QUESTIONS } from "./new-tests-data";

type Q = Omit<Question, "id" | "level" | "category">;
const bank: Record<Level, Partial<Record<Category, Q[]>>> = {
  A1: {
    grammar: [
      { prompt: "Это мой ___ .", options: ["брат", "сестра́", "окно́", "кни́га"], answer: 0, explanation: "«Мой» è maschile: si accorda con «брат»." },
      { prompt: "Я живу́ в ___ .", options: ["Москва́", "Москву́", "Москве́", "Москво́й"], answer: 2, explanation: "Prepositivo dopo «в» per luogo: в Москве́." },
      { prompt: "У меня́ есть ___ .", options: ["маши́ну", "маши́на", "маши́ны", "маши́не"], answer: 1, explanation: "Dopo «у меня есть» il possesso è al nominativo." },
      { prompt: "Мы ___ по-ру́сски.", options: ["говорю́", "говори́т", "говори́м", "говоря́т"], answer: 2, explanation: "Coniugazione II, 1ª plurale: говори́м." },
    ],
    lexicon: [
      { prompt: "Утром я пью ___ .", options: ["хлеб", "ко́фе", "суп", "стол"], answer: 1, explanation: "Si beve il caffè: ко́фе (indeclinabile, maschile)." },
      { prompt: "Antonimo di «большо́й»:", options: ["высо́кий", "ма́ленький", "краси́вый", "но́вый"], answer: 1, explanation: "Grande ↔ piccolo." },
      { prompt: "Где мо́жно купи́ть хлеб?", options: ["в апте́ке", "в магази́не", "в шко́ле", "в теа́тре"], answer: 1, explanation: "Il pane si compra in negozio." },
    ],
    reading: [
      { passage: "Меня́ зову́т А́нна. Я студе́нтка. Я учу́сь в университе́те и изуча́ю ру́сский язы́к. Мой брат — врач.", prompt: "Кто А́нна?", options: ["врач", "студе́нтка", "учи́тельница", "инжене́р"], answer: 1, explanation: "«Я студентка»: nel testo Anna specifica chiaramente di essere una studentessa universitaria." },
      { passage: "Меня́ зову́т А́нна. Я студе́нтка. Я учу́сь в университе́те и изуча́ю ру́сский язы́к. Мой брат — врач.", prompt: "Что изуча́ет А́нна?", options: ["медици́ну", "англи́йский", "ру́сский язы́к", "исто́рию"], answer: 2, explanation: "«Изучаю русский язык»: nel testo Anna dichiara di studiare la lingua russa." },
    ],
  },
  A2: {
    grammar: [
      { prompt: "Я давно́ не ви́дел ___ .", options: ["свою́ сестру́", "своя́ сестра́", "свое́й сестре́", "свое́й сестры́"], answer: 0, explanation: "Accusativo animato femminile: «свою́ сестру́»." },
      { prompt: "Вчера́ мы ___ в кино́.", options: ["идём", "ходи́ли", "пойдём", "хо́дим"], answer: 1, explanation: "Moto di andata e ritorno concluso nel passato: «ходи́ли»." },
      { prompt: "Я позвоню́ ___ за́втра.", options: ["тебя́", "тебе́", "тобо́й", "ты"], answer: 1, explanation: "Il verbo «звонить» regge il caso Dativo: «тебе»." },
      { prompt: "В кла́ссе пять ___ .", options: ["студе́нт", "студе́нта", "студе́нтов", "студе́нты"], answer: 2, explanation: "Dopo i numeri da 5 in poi si usa il Genitivo plurale: «студентов»." },
    ],
    lexicon: [
      { prompt: "Он ___ на врача́ уже́ два го́да.", options: ["у́чится", "изуча́ет", "у́чит", "занима́ется"], answer: 0, explanation: "Costruzione «учиться на + Acc.» significa studiare per intraprendere una professione." },
      { prompt: "Мне ну́жно ___ биле́т на по́езд.", options: ["взять в долг", "заказа́ть", "сказа́ть", "посмотре́ть"], answer: 1, explanation: "«Заказать билет»: prenotare o acquistare un biglietto." },
      { prompt: "Сего́дня хо́лодно, на́до наде́ть ___ .", options: ["шо́рты", "ку́ртку", "сарафа́н", "очки́"], answer: 1, explanation: "Poiché fa freddo, occorre indossare una giacca («куртку»)." },
    ],
    reading: [
      { passage: "В суббо́ту И́горь е́здил на да́чу к роди́телям. Там он помога́л отцу́ ремонти́ровать крышу, а ве́чером они́ вме́сте ловили ры́бу на о́зере.", prompt: "Что де́лал И́горь ве́чером?", options: ["ремонти́ровал кры́шу", "лови́л ры́бу", "отдыха́л до́ма", "е́хал в го́род"], answer: 1, explanation: "«Вечером они ловили рыбу»: il brano specifica che la sera Igor e suo padre pescavano al lago." },
      { passage: "В суббо́ту И́горь е́здил на да́чу к роди́телям. Там он помога́л отцу́ ремонти́ровать крышу, а ве́чером они́ вме́сте ловили ры́бу на о́зере.", prompt: "Кому́ помога́л И́горь?", options: ["ма́ме", "дру́гу", "отцу́", "сосе́ду"], answer: 2, explanation: "«Помогал отцу»: il brano indica che Igor aiutava suo padre a riparare il tetto." },
    ],
  },
  B1: {
    grammar: [
      { prompt: "Е́сли бы у меня́ бы́ло вре́мя, я ___ с ва́ми.", options: ["пое́ду", "пое́хал бы", "е́ду", "е́здил"], answer: 1, explanation: "Periodo ipotetico dell'irrealtà: congiuntivo con la particella «бы» («поехал бы»)." },
      { prompt: "Студе́нт, ___ я вчера́ познако́мился, из Ита́лии.", options: ["кото́рый", "кото́рого", "с кото́рым", "кото́рому"], answer: 2, explanation: "Il verbo «познакомиться» regge «с + Strumentale»: «с которым»." },
      { prompt: "Он вошёл в ко́мнату, ___ дверь.", options: ["закрыва́я", "закры́в", "закры́л", "закрыва́ть"], answer: 1, explanation: "Gerundio perfettivo per un'azione anteriore e conclusa: «закрыв» (dopo aver chiuso)." },
      { prompt: "Ма́ма попроси́ла, ___ я купи́л молоко́.", options: ["что", "что́бы", "е́сли", "потому́ что"], answer: 1, explanation: "Richiesta con soggetti diversi: «чтобы» + verbo al tempo passato («чтобы я купил»)." },
    ],
    lexicon: [
      { prompt: "Э́тот фильм произвёл на меня́ си́льное ___ .", options: ["впечатле́ние", "выраже́ние", "отноше́ние", "представле́ние"], answer: 0, explanation: "Collocazione fissa: «произвести впечатление» = fare impressione, colpire." },
      { prompt: "Он ___ уча́стие в конфере́нции.", options: ["взял", "при́нял", "сде́лал", "дал"], answer: 1, explanation: "Espressione fissa: «принять участие в чём-либо» = prendere parte, partecipare." },
      { prompt: "Мы ___ все вопро́сы на собра́нии.", options: ["обсуди́ли", "осуди́ли", "рассуди́ли", "присуди́ли"], answer: 0, explanation: "«Обсудить» = discutere/esaminare; «осудить» significherebbe invece condannare moralmente." },
    ],
    reading: [
      { passage: "Всё бо́льше молоды́х люде́й выбира́ют удалённую рабо́ту. По да́нным опро́са, гла́вная причи́на — возмо́жность самостоя́тельно планировать день. Одна́ко мно́гие признаю́тся, что им не хвата́ет живо́го обще́ния с колле́гами.", prompt: "Гла́вная причи́на вы́бора удалённой рабо́ты:", options: ["высо́кая зарпла́та", "свобо́да в плани́ровании вре́мени", "обще́ние с колле́гами", "приказ руково́дства"], answer: 1, explanation: "Il testo segnala esplicitamente: «главная причина — возможность самостоятельно планировать день» (libertà nell'organizzare la giornata)." },
      { passage: "Всё бо́льше молоды́х люде́й выбира́ют удалённую рабо́ту. По да́нным опро́са, гла́вная причи́на — возмо́жность самостоя́тельно планировать день. Одна́ко мно́гие признаю́тся, что им не хвата́ет живо́го обще́ния с колле́гами.", prompt: "Како́й недоста́ток упомина́ется?", options: ["ма́ло де́нег", "нехва́тка обще́ния", "плохо́й интерне́т", "мно́го рабо́ты"], answer: 1, explanation: "Come svantaggio il testo cita: «им не хватает живого общения с коллегами» (mancanza di contatto umano diretto)." },
    ],
  },
  B2: {
    grammar: [
      { prompt: "___ на тру́дности, экспеди́ция дости́гла верши́ны.", options: ["Несмотря́", "Благодаря́", "Всле́дствие", "Ввиду́"], answer: 0, explanation: "Proposizione concessiva: «несмотря на (+ Acc.)» = nonostante le difficoltà." },
      { prompt: "Докла́д, ___ профе́ссором, вы́звал диску́ссию.", options: ["прочита́вший", "прочи́танный", "чита́ющий", "чита́я"], answer: 1, explanation: "Participio passivo passato al nominativo maschile: «прочитанный профессором» (tenuto/letto dal professore)." },
      { prompt: "Ему́ не ___ поня́ть э́ту тео́рию.", options: ["удало́сь", "удался́", "уда́лся", "удава́лась"], answer: 0, explanation: "Costruzione impersonale al passato neutro: «ему не удалось» (non gli è riuscito)." },
    ],
    lexicon: [
      { prompt: "Компа́ния ___ убы́тки из-за кри́зиса.", options: ["понесла́", "принесла́", "вынесла", "занесла́"], answer: 0, explanation: "Collocazione economica: «понести убытки» = subire perdite finanziarie." },
      { prompt: "Его́ предложе́ние не ___ подде́ржки.", options: ["нашло́", "вошло́", "пришло́", "ушло́"], answer: 0, explanation: "Espressione fissa: «найти поддержку» = trovare appoggio o consenso." },
      { prompt: "Sinonimo di «незаме́нимый»:", options: ["бесполе́зный", "необходи́мый", "случа́йный", "второстепе́нный"], answer: 1, explanation: "«Незаменимый» (insostituibile) è sinonimo di «необходимый» (indispensabile, necessario)." },
    ],
    reading: [
      { passage: "Исто́рики подчёркивают, что рефо́рмы Петра́ I бы́ли противоречи́выми: с одно́й стороны́, они́ модернизи́ровали госуда́рство, с друго́й — ложи́лись тяжёлым бре́менем на крестья́нство.", prompt: "Как а́втор оце́нивает рефо́рмы?", options: ["то́лько положи́тельно", "то́лько отрица́тельно", "неоднозна́чно", "не оце́нивает"], answer: 2, explanation: "«Противоречивыми»: l'autore formula un giudizio storico articolato e non univoco (неоднозначно)." },
    ],
  },
  C1: {
    grammar: [
      { prompt: "___ бы он ни говори́л, ему́ никто́ не ве́рил.", options: ["Что", "Как", "Чем", "Кто"], answer: 0, explanation: "Costruzione concessiva generalizzante con «что бы ни»: «Qualunque cosa dicesse, nessuno gli credeva»." },
      { prompt: "По ___ сро́ка догово́р счита́ется расто́ргнутым.", options: ["истече́нию", "истече́нии", "истече́ние", "истече́нием"], answer: 1, explanation: "Costruzione temporale formale e giuridica: «по + Prepositivo con desinenza -и» («по истечении срока» = alla scadenza del termine)." },
      { prompt: "Он говори́л так убеди́тельно, ___ все согласи́лись.", options: ["что́бы", "что", "как бу́дто", "е́сли"], answer: 1, explanation: "Proposizione consecutiva reale: «так..., что» («Parlava in modo così convincente che tutti concordarono»)." },
    ],
    lexicon: [
      { prompt: "Его́ слова́ ___ в коне́ц всем спо́рам.", options: ["поста́вили то́чку", "положи́ли коне́ц", "сде́лали коне́ц", "да́ли то́чку"], answer: 1, explanation: "Espressione fissa: «положить конец чему-либо» = porre fine/termine a una disputa." },
      { prompt: "«Води́ть за нос» significa:", options: ["guidare", "ingannare", "aiutare", "rimproverare"], answer: 1, explanation: "Espressione idiomatica russa: «водить за нос» significa ingannare, prendere in giro, illudere con false promesse." },
      { prompt: "Пробле́ма тре́бует ___ подхо́да.", options: ["взвешенного", "ве́шающего", "наве́шанного", "све́шенного"], answer: 0, explanation: "Collocazione aggettivale colta: «взвешенный подход» = un approccio ponderato, equilibrato e ben ponderato." },
    ],
    reading: [
      { passage: "Язы́к — не просто́й инструме́нт коммуника́ции, но и храни́тель коллекти́вной па́мяти наро́да. Утра́та языка́ влечёт за собо́й невосполни́мую поте́рю культу́рного насле́дия.", prompt: "Основна́я мысль те́кста:", options: ["язы́к ну́жен то́лько для обще́ния", "язы́к хра́нит культу́рную па́мять", "языки́ легко́ восстана́вливаются", "па́мять не свя́зана с языко́м"], answer: 1, explanation: "Il concetto centrale espresso nel testo è che la lingua è «custode della memoria collettiva del popolo» (хранитель коллективной памяти)." },
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
