import type { Question } from "./types";

export interface WrongAnswerExplanation {
  selectedOptionText: string;
  correctOptionText: string;
  whyWrong: string;
  ruleSummary: string;
  mnemonicTip: string;
}

/**
 * Diagnostic patterns for common Russian grammatical traps in TORFL exams
 */

function clean(text: string): string {
  return text.replace(/[́̀]/g, "").trim();
}

/**
 * Detect morphological case from word ending in Russian
 */
function detectCaseHint(word: string): string | null {
  const w = clean(word).toLowerCase();
  if (w.endsWith("ом") || w.endsWith("ем") || w.endsWith("ой") || w.endsWith("ей") || w.endsWith("ами") || w.endsWith("ями")) {
    return "Strumentale (Творительный падеж — кем? чем?)";
  }
  if (w.endsWith("е") || w.endsWith("ии") || w.endsWith("ах") || w.endsWith("ях")) {
    return "Prepositivo (Предложный падеж — о ком? о чём? где?)";
  }
  if (w.endsWith("у") || w.endsWith("ю")) {
    return "Accusativo singolare femminile o Dativo singolare maschile (-у/-ю)";
  }
  if (w.endsWith("а") || w.endsWith("я")) {
    return "Genitivo singolare maschile/neutro oppure Nominativo singolare femminile";
  }
  if (w.endsWith("ов") || w.endsWith("ев") || w.endsWith("ей")) {
    return "Genitivo plurale (Родительный падеж множественного числа)";
  }
  if (w.endsWith("ам") || w.endsWith("ям")) {
    return "Dativo plurale (Дательный падеж множественного числа)";
  }
  return null;
}

/**
 * Generates an in-depth Italian explanation of WHY the selected option is wrong.
 */
export function explainWrongAnswer(question: Question, selectedIndex: number): WrongAnswerExplanation {
  const selectedText = question.options[selectedIndex] ?? "";
  const correctText = question.options[question.answer] ?? "";
  const cleanSelected = clean(selectedText);
  const cleanCorrect = clean(correctText);
  const prompt = question.prompt;
  const explanation = question.explanation;

  // 1. Check if an explicit explanation is registered
  if (question.wrongExplanations && question.wrongExplanations[selectedIndex]) {
    return {
      selectedOptionText: selectedText,
      correctOptionText: correctText,
      whyWrong: question.wrongExplanations[selectedIndex],
      ruleSummary: explanation,
      mnemonicTip: extractOrBuildTip(question, selectedText, correctText),
    };
  }

  // 2. Automated Deep Linguistic Analysis
  let whyWrong = "";
  let mnemonicTip = "";

  // Pattern: Time expression with year, month, century (в прошлом году / в мае / в двадцатом веке)
  if (
    cleanCorrect.startsWith("в ") &&
    (cleanCorrect.includes("году") || cleanCorrect.includes("веке") || cleanCorrect.includes("месяце") || cleanCorrect.includes("годах"))
  ) {
    if (!cleanSelected.startsWith("в ")) {
      if (cleanSelected.endsWith("года") || cleanSelected.endsWith("века") || cleanSelected.endsWith("месяца")) {
        whyWrong = `L'opzione «${selectedText}» è al caso Genitivo senza preposizione. In russo il genitivo temporale semplice si impiega solo per specificare una data completa con giorno del mese (es. «пятого мая прошлого года»), mentre per indicare l'anno o il mese di svolgimento di un evento («когда? / в каком году?») è indispensabile la costruzione preposizionale con «в» + Prepositivo locativo.`;
        mnemonicTip = `Ricorda: per indicare l'anno o il secolo in cui accade qualcosa si usa sempre «в + Prepositivo» (es. «в прошлом году», «в XXI веке»).`;
      } else {
        whyWrong = `L'opzione «${selectedText}» è al caso diretto (Nominativo/Accusativo semplice) senza preposizione. L'accusativo temporale senza preposizione indica la durata continuativa (es. «я ждал целый год» = ho aspettato un anno intero), non il momento puntuale («in quale anno?»), che richiede invece «в + Prepositivo locativo».`;
        mnemonicTip = `Durata nel tempo = Accusativo senza preposizione («весь год»). Momento preciso nel tempo = «в» + Prepositivo («в этом году»).`;
      }
    } else {
      whyWrong = `L'opzione «${selectedText}» contiene una forma grammaticale o una desinenza non corretta per il caso Prepositivo locativo richiesto dopo «в».`;
      mnemonicTip = `Attenzione alla desinenza speciale del locativo con «в»: «в году́» (con accento tonico finale), non «в годе».`;
    }
  }

  // Pattern: Place preposition "в / на" followed by location (где?)
  else if (prompt.includes(" в ___") || prompt.includes(" на ___") || prompt.includes("в ___") || prompt.includes("на ___")) {
    const caseHint = detectCaseHint(cleanSelected);
    if (caseHint?.includes("Accusativo")) {
      whyWrong = `L'opzione «${selectedText}» è al caso Accusativo («куда? / verso dove?»). Nella frase il verbo indica uno stato in luogo («dove? / где?»), che con le preposizioni «в» o «на» esige categoricamente il caso Prepositivo locativo, non l'Accusativo di moto.`;
      mnemonicTip = `Moto a luogo (куда?) = «в/на» + Accusativo. Stato in luogo (где?) = «в/на» + Prepositivo (generalmente in -е).`;
    } else if (caseHint?.includes("Strumentale")) {
      whyWrong = `L'opzione «${selectedText}» è al caso Strumentale. Le preposizioni «в» e «на» per esprimere stato in luogo non reggono mai il caso strumentale.`;
      mnemonicTip = `Stato in luogo dopo «в/на» = sempre Prepositivo (desinenza tipica -е per i sostantivi singolari).`;
    } else if (cleanSelected.endsWith("а") || cleanSelected.endsWith("я") || cleanSelected.endsWith("о") || cleanSelected.endsWith("е")) {
      whyWrong = `L'opzione «${selectedText}» è al caso Nominativo (forma base non declinata). Dopo la preposizione di luogo («в» / «на») il sostantivo deve essere obbligatoriamente declinato al caso Prepositivo.`;
      mnemonicTip = `Nessun sostantivo dopo «в» o «на» può rimanere al caso nominativo quando indica luogo.`;
    } else {
      whyWrong = `L'opzione «${selectedText}» presenta un caso o una desinenza non compatibile con la reggenza di stato in luogo («где?») richiesta dal contesto.`;
      mnemonicTip = `Controlla la declinazione dei sostantivi al Prepositivo: maschili e femminili in consonante/-а/-я prendono -е; parole in -ия/-ие prendono -ии.`;
    }
  }

  // Pattern: Personal Pronouns (я, меня, мне, мной; ты, тебя, тебе, тобой; etc.)
  const pronouns: Record<string, { caseName: string; question: string }> = {
    я: { caseName: "Nominativo (forma soggetto)", question: "кто?" },
    меня: { caseName: "Accusativo / Genitivo", question: "кого?" },
    мне: { caseName: "Dativo (complemento di termine)", question: "кому?" },
    мной: { caseName: "Strumentale", question: "кем?" },
    мною: { caseName: "Strumentale", question: "кем?" },
    ты: { caseName: "Nominativo (forma soggetto)", question: "кто?" },
    тебя: { caseName: "Accusativo / Genitivo", question: "кого?" },
    тебе: { caseName: "Dativo (complemento di termine)", question: "кому?" },
    тобой: { caseName: "Strumentale", question: "кем?" },
    тобою: { caseName: "Strumentale", question: "кем?" },
    он: { caseName: "Nominativo", question: "кто?" },
    она: { caseName: "Nominativo", question: "кто?" },
    оно: { caseName: "Nominativo", question: "что?" },
    его: { caseName: "Accusativo / Genitivo", question: "кого?" },
    её: { caseName: "Accusativo / Genitivo", question: "кого?" },
    ему: { caseName: "Dativo", question: "кому?" },
    ей: { caseName: "Dativo o Strumentale", question: "кому? / кем?" },
    им: { caseName: "Strumentale o Dativo plurale", question: "кем? / кому?" },
    мы: { caseName: "Nominativo", question: "кто?" },
    нас: { caseName: "Accusativo / Genitivo", question: "кого?" },
    нам: { caseName: "Dativo", question: "кому?" },
    нами: { caseName: "Strumentale", question: "кем?" },
    вы: { caseName: "Nominativo", question: "кто?" },
    вас: { caseName: "Accusativo / Genitivo", question: "кого?" },
    вам: { caseName: "Dativo", question: "кому?" },
    вами: { caseName: "Strumentale", question: "кем?" },
    они: { caseName: "Nominativo", question: "кто?" },
    их: { caseName: "Accusativo / Genitivo", question: "кого?" },
    ими: { caseName: "Strumentale", question: "кем?" },
  };

  if (pronouns[cleanSelected.toLowerCase()] && pronouns[cleanCorrect.toLowerCase()]) {
    const selPron = pronouns[cleanSelected.toLowerCase()]!;
    const corrPron = pronouns[cleanCorrect.toLowerCase()]!;
    whyWrong = `L'opzione «${selectedText}» è al caso ${selPron.caseName} (${selPron.question}). Nel contesto di questa frase, il verbo o la preposizione richiede specificamente il caso ${corrPron.caseName} (${corrPron.question}). Spesso questo errore è causato dal calco con l'italiano.`;
    mnemonicTip = `Verifica sempre la reggenza del verbo: individua la domanda a cui risponde il pronome (${corrPron.question}) per scegliere la forma corretta («${cleanCorrect}»).`;
  }

  // Pattern: Possessive agreement (Это мой / моя / моё / мои)
  else if (prompt.includes("мой ___") || prompt.includes("моя́ ___") || prompt.includes("моё ___") || prompt.includes("мои́ ___") || prompt.includes("наш ___") || prompt.includes("ваш ___")) {
    whyWrong = `L'opzione «${selectedText}» non concorda in genere o numero con il pronome possessivo presente nella frase. In russo l'aggettivo possessivo deve concordare esattamente in genere (maschile, femminile, neutro), numero e caso con il sostantivo a cui si riferisce.`;
    mnemonicTip = `Maschile = мой / наш; Femminile = моя / наша (-а/-я); Neutro = моё / наше (-о/-е); Plurale = мои / наши (-и/-ы).`;
  }

  // Pattern: Verb agreement / Person (говорю, говорит, говорим, говорят)
  else if (
    (cleanSelected.endsWith("ю") || cleanSelected.endsWith("у") || cleanSelected.endsWith("ит") || cleanSelected.endsWith("ет") || cleanSelected.endsWith("им") || cleanSelected.endsWith("ем") || cleanSelected.endsWith("ят") || cleanSelected.endsWith("ут")) &&
    (cleanCorrect.endsWith("ю") || cleanCorrect.endsWith("у") || cleanCorrect.endsWith("ит") || cleanCorrect.endsWith("ет") || cleanCorrect.endsWith("им") || cleanCorrect.endsWith("ем") || cleanCorrect.endsWith("ят") || cleanCorrect.endsWith("ут"))
  ) {
    whyWrong = `L'opzione «${selectedText}» presenta una desinenza verbale di persona o numero diversa da quella richiesta dal soggetto della proposizione. È necessario accordare il verbo con la persona grammaticale del soggetto (io, tu, egli/ella, noi, voi, essi).`;
    mnemonicTip = `Verifica sempre il soggetto della frase: Я (-ю/-у), Ты (-ешь/-ишь), Он/Она (-ет/-ит), Мы (-ем/-им), Вы (-ете/-ите), Они (-ут/-ют/-ат/-ят).`;
  }

  // Pattern: Verb of motion (идти/ходить, ехать/ездить, prefixes по-, при-, у-, etc.)
  else if (
    (cleanSelected.includes("ход") || cleanSelected.includes("ид") || cleanSelected.includes("езд") || cleanSelected.includes("ех") || cleanSelected.includes("лет") || cleanSelected.includes("бег")) &&
    (cleanCorrect.includes("ход") || cleanCorrect.includes("ид") || cleanCorrect.includes("езд") || cleanCorrect.includes("ех") || cleanCorrect.includes("лет") || cleanCorrect.includes("бег"))
  ) {
    if (cleanSelected.includes("ид") && cleanCorrect.includes("ход")) {
      whyWrong = `Hai scelto una forma del verbo unidirezionale «идти». Nel contesto della frase si descrive un'azione abituale, ripetuta o un viaggio di andata e ritorno già concluso, che in russo richiede tassativamente il verbo multidirezionale «ходить».`;
      mnemonicTip = `Andata e ritorno conclusa nel passato = sempre «ходить / ездить» (es. «вчера мы ходили в кино»), MAI «идти / ехать».`;
    } else if (cleanSelected.includes("ход") && cleanCorrect.includes("ид")) {
      whyWrong = `Hai scelto il verbo multidirezionale «ходить». Il contesto richiede invece un moto in una direzione precisa in un momento determinato («идти»).`;
      mnemonicTip = `Movimento verso una meta in corso di svolgimento = unidirezionale («идти / ехать»).`;
    } else {
      whyWrong = `L'opzione «${selectedText}» usa un verbo di moto o un prefisso con un significato spaziale o temporale non coerente con la situazione espressa nella frase.`;
      mnemonicTip = `I prefissi nei verbi di moto cambiano radicalmente il senso: при- (arrivo), у- (partenza/allontanamento), в- (ingresso), вы- (uscita), пере- (attraversamento).`;
    }
  }

  // Pattern: Gerunds and Participles (деепричастия и причастия: -в, -вша, -ая, -щий, -нный)
  else if (
    (cleanSelected.endsWith("ая") || cleanSelected.endsWith("яя") || cleanSelected.endsWith("в") || cleanSelected.endsWith("вшись") || cleanSelected.endsWith("нный") || cleanSelected.endsWith("вший") || cleanSelected.endsWith("щий")) &&
    cleanSelected.length > 3 &&
    (cleanCorrect.endsWith("ая") || cleanCorrect.endsWith("яя") || cleanCorrect.endsWith("в") || cleanCorrect.endsWith("вшись") || cleanCorrect.endsWith("нный") || cleanCorrect.endsWith("вший") || cleanCorrect.endsWith("щий"))
  ) {
    if (cleanSelected.endsWith("ая") || cleanSelected.endsWith("яя")) {
      whyWrong = `«${selectedText}» è un gerundio imperfettivo (деепричастие несовершенного вида). Esprime un'azione durativa e contemporanea al verbo principale, mentre il contesto richiede un'azione anteriore o conclusa (gerundio perfettivo) oppure un participio accordato.`;
      mnemonicTip = `Gerundio imperfettivo (-а/-я) = azione contemporanea («mentre faceva»). Gerundio perfettivo (-в/-вшись) = azione anteriore («dopo aver fatto»).`;
    } else if (cleanSelected.endsWith("нный") || cleanSelected.endsWith("тый")) {
      whyWrong = `«${selectedText}» è un participio passivo. La frase richiede una voce attiva o una forma verbale con reggenza differente.`;
      mnemonicTip = `Controlla chi compie l'azione: se il soggetto compie l'azione su di sé o su altri, non si può usare un participio passivo.`;
    } else {
      whyWrong = `La forma verbale scelta «${selectedText}» presenta un aspetto o una funzione sintattica non adeguata al legame logico tra le due azioni della frase.`;
      mnemonicTip = `I gerundi russi (деепричастия) devono sempre avere lo stesso soggetto del verbo principale della proposizione.`;
    }
  }

  // Pattern: Concessive, Causal and Conditional connectors (несмотря на, благодаря, вследствие, из-за, чтобы)
  else if (
    cleanCorrect.includes("несмотря") || cleanCorrect.includes("благодаря") || cleanCorrect.includes("вследствие") || cleanCorrect.includes("из-за") || cleanCorrect.includes("чтобы")
  ) {
    if (cleanSelected.includes("благодаря")) {
      whyWrong = `«Благодаря» si usa esclusivamente per cause con esito positivo o favorevole («grazie a + Dativo»). Non si può usare quando la frase esprime un ostacolo, una difficoltà o una conseguenza negativa.`;
      mnemonicTip = `Esito positivo = «благодаря» (+ Dat). Causa negativa/colpa = «из-за» (+ Gen). Contrasto/ostacolo superato = «несмотря на» (+ Acc).`;
    } else if (cleanSelected.includes("из-за")) {
      whyWrong = `«Из-за» esprime una causa sfavorevole o un ostacolo che impedisce l'azione («a causa di»). Se la frase ha valore concessivo («nonostante») o positivo («grazie a»), l'uso di «из-за» è un errore di registro e di logica.`;
      mnemonicTip = `«Из-за» risponde a «per quale motivo negativo?». «Несмотря на» risponde a «nonostante quale ostacolo?».`;
    } else if (cleanSelected === "что" && cleanCorrect === "чтобы") {
      whyWrong = `Hai scelto la congiunzione dichiarativa semplice «что». Quando la frase esprime un desiderio, un ordine, una preghiera o un obiettivo (con due soggetti distinti), è indispensabile la congiunzione finale/volitiva «чтобы» seguita dal tempo passato.`;
      mnemonicTip = `Verbi di richiesta/volontà (просить, хотеть, требовать) con soggetti diversi richiedono sempre «чтобы + verbo al passato».`;
    } else {
      whyWrong = `Il connettivo «${selectedText}» esprime una relazione logica (causale, concessiva o consecutiva) non corrispondente al senso del periodo, oppure richiede una reggenza di caso diversa da quella presente.`;
      mnemonicTip = `Attenzione alla reggenza dei connettivi: «несмотря на» (+ Acc.), «благодаря» (+ Dat.), «вследствие» (+ Gen.), «ввиду» (+ Gen.).`;
    }
  }

  // Pattern: Reading comprehension / Passage questions
  else if (question.passage || question.category === "reading" || question.category === "audio") {
    whyWrong = `L'opzione «${selectedText}» è un classico distrattore dei test ТРКИ: estrapola una parola o un concetto non confermato dal testo, oppure attribuisce all'autore un'affermazione opposta o esagerata (es. una generalizzazione assoluta) rispetto a quanto effettivamente dichiarato nel brano.`;
    mnemonicTip = `Nelle prove di lettura e comprensione, scarta sempre le opzioni che contengono affermazioni categoriche non esplicitamente scritte nel testo («всегда», «только», «никогда»).`;
  }

  // Pattern: Lexicon & Paronyms (паронимы)
  else if (question.category === "lexicon") {
    whyWrong = `«${selectedText}» è un paronimo o un falso amico lessicale. Sebbene la radice o la pronuncia sia simile, il suo significato o la sua collocazione fissa nella lingua russa non si combinano correttamente con il resto della frase.`;
    mnemonicTip = `Fai attenzione alle collocazioni fisse (устойчивые сочетания): in russo i verbi hanno partner lessicali obbligati (es. «принять участие», «оказать помощь», «произвести впечатление»).`;
  }

  // Default general grammatical fallback
  else {
    const caseHint = detectCaseHint(cleanSelected);
    if (caseHint) {
      whyWrong = `L'opzione «${selectedText}» si presenta con una forma riconducibile al caso ${caseHint}. Questa forma non rispetta le regole di concordanza o la reggenza sintattica richiesta dal verbo o dalla preposizione della frase.`;
    } else {
      whyWrong = `L'opzione «${selectedText}» non si adatta al contesto della frase: presenta una desinenza, un aspetto verbale o una reggenza non compatibile con le regole della sintassi russa.`;
    }
    mnemonicTip = `Analizza sempre la struttura della frase: individua prima il soggetto e il verbo reggente per capire quale caso o accordo è grammaticalmente richiesto.`;
  }

  return {
    selectedOptionText: selectedText,
    correctOptionText: correctText,
    whyWrong,
    ruleSummary: explanation,
    mnemonicTip: mnemonicTip || extractOrBuildTip(question, selectedText, correctText),
  };
}

function extractOrBuildTip(question: Question, selected: string, correct: string): string {
  if (question.category === "grammar") {
    return `In ТРКИ verifica sempre: 1) il caso retto dalla preposizione o dal verbo; 2) l'aspetto verbale (durata/ripetizione vs risultato); 3) l'accordo in genere e numero.`;
  }
  if (question.category === "lexicon") {
    return `Nei test di lessico ТРКИ le parole hanno collocazioni fisse: memorizza sempre i sostantivi insieme al loro verbo tipico.`;
  }
  if (question.category === "reading") {
    return `Rileggi attentamente il passaggio del testo in cui compare la frase chiave: la risposta corretta riflette esattamente il pensiero dell'autore senza aggiunte arbitrarie.`;
  }
  return `Confronta attentamente «${clean(selected)}» con la forma corretta «${clean(correct)}» per consolidare la regola.`;
}
