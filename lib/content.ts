/**
 * Editorial content for the article and landing pages.
 *
 * Text fields (`intro`, `paragraphs`, `items[].text`, `faq[].a`) accept inline
 * links as `[label](/pad)` or `[label](https://...)`, and the tokens `{price}`,
 * `{shipping}` and `{period}`, which are filled from `lib/site.ts` so
 * commercial facts live in one place. See `components/RichText.tsx`.
 *
 * `heading` is the H1 and carries the search phrase; `tagline` is the
 * editorial line shown directly under it.
 */
export type ContentItem = { title: string; text: string };
export type ContentSection = {
  id?: string;
  heading: string;
  paragraphs: string[];
  items?: ContentItem[];
  ordered?: boolean;
  after?: string[];
};
export type ContentFaq = { q: string; a: string };
export type ContentPage = {
  slug: string;
  title: string;
  heading: string;
  tagline?: string;
  description: string;
  category: string;
  published: string;
  updated: string;
  intro: string;
  sections: ContentSection[];
  faq?: ContentFaq[];
  related: string[];
};

const PUBLISHED = "2026-09-14";
const UPDATED = "2026-11-13";

export const contentPages: ContentPage[] = [
  {
    slug: "boek-aanstaande-vader",
    title: "Boek voor aanstaande vaders | De vergeten vader – Sem de Wachter",
    heading: "Boek voor aanstaande vaders: De vergeten vader",
    tagline: "Een boek voor de man naast de buik",
    category: "Het boek",
    published: PUBLISHED,
    updated: UPDATED,
    description:
      "Zoek je een boek voor een aanstaande vader? De vergeten vader van Sem de Wachter is grappig, eerlijk en leest in korte hoofdstukken. Voor jezelf of als cadeau.",
    intro:
      "Er zijn boeken die vertellen hoe groot de baby deze week is. Dit boek gaat over degene die naast de buik staat. Die ook iets voelt, maar daar nog geen handig woord voor heeft.",
    sections: [
      {
        heading: "Waar gaat De vergeten vader over?",
        paragraphs: [
          "Je gaat mee naar de echo. Je luistert, knikt en probeert tegelijk te onthouden wat er net gezegd is. Thuis vraagt iemand hoe het met haar gaat. Terecht. Alleen had je zelf misschien ook nog iets te vertellen.",
          "De vergeten vader van Sem de Wachter geeft die kant van de zwangerschap ruimte. Met persoonlijke verhalen over betrokken willen zijn, onhandige opmerkingen en langzaam beseffen dat ‘straks’ echt komt. Geen perfecte vader op de omslag die je binnen drie hoofdstukken moet worden.",
          "Sem schreef het boek dat hij zelf had willen lezen toen hij vader werd: negen maanden wachtkamers, blunders en zenuwen, opgeschreven door iemand die er middenin zat. [Lees meer over Sem de Wachter](/over-sem).",
        ],
      },
      {
        heading: "Wat voor boek is het, en wat niet?",
        paragraphs: [
          "Boeken voor aanstaande vaders vallen grofweg in twee soorten uiteen. Het is handig om te weten welke je zoekt.",
        ],
        items: [
          {
            title: "Het praktische handboek",
            text: "Uitleg over zwangerschap, bevalling en kraamtijd, met checklists en advies. Bekende titels zijn Aanpakken voor aanstaande vaders en Je eerste 1000 vaderdagen van David Borman, en Vader op komst. Nuttig als je wilt weten hoe het werkt.",
          },
          {
            title: "Het herkenbare verhaal",
            text: "Een boek dat niet uitlegt wat je moet doen, maar laat zien hoe het voelt. Dat is De vergeten vader: persoonlijke verhalen met droge humor, van een vader die het net heeft meegemaakt.",
          },
        ],
        after: [
          "De twee bijten elkaar niet. Een handboek vertelt je wat ontsluiting is. Dit boek vertelt je hoe het is om er op een krukje naast te zitten. Veel aanstaande vaders hebben aan allebei iets.",
          "Dit is dus geen medisch zwangerschapshandboek. Je vindt hier geen diagnose, behandeladvies of belofte dat je na het lezen alles weet. Voor medische vragen ga je naar je verloskundige of arts. Zoek je vooral praktische houvast? Begin dan bij onze [tips voor aanstaande vaders](/tips-aanstaande-vader) en de checklist [wat je moet regelen als je vader wordt](/eerste-keer-vader-worden#regelen).",
        ],
      },
      {
        heading: "Korte hoofdstukken, geen huiswerk",
        paragraphs: [
          "Je hoeft er geen studieavond voor vrij te houden. Lees een hoofdstuk in de trein, in een wachtkamer of voordat je gaat slapen. Elk hoofdstuk eindigt met De Vergeetschaal: een volstrekt onwetenschappelijk cijfer voor hoe vergeten de vader zich voelt.",
          "Het fragment uit hoofdstuk 10, ‘Hormonen: een veldgids’, laat je alvast kennismaken met de toon. [Lees het gratis fragment](/#fragment) voordat je beslist. Een boek moet bij je passen, ook als het over een leven gaat dat je nog niet kent.",
        ],
      },
      {
        heading: "Voor wie is dit boek?",
        paragraphs: [],
        items: [
          {
            title: "Voor jezelf",
            text: "Je verwacht je eerste kind en zoekt vooral herkenning. Iemand die hardop zegt wat jij in de wachtkamer dacht.",
          },
          {
            title: "Voor je partner",
            text: "Je bent zwanger en wilt hem iets geven dat over hém gaat. Niet weer een rompertje met een tekst erop.",
          },
          {
            title: "Voor een vriend, broer of collega",
            text: "Je zoekt een origineel cadeau voor een aanstaande vader. Met dit boek geef je ook een kleine boodschap mee: we zien jou ook. Meer ideeën vind je in onze [cadeaugids voor aanstaande vaders](/cadeau-aanstaande-vader).",
          },
        ],
      },
      {
        heading: "Praktisch: prijs, verzending en bestellen",
        paragraphs: [
          "De vergeten vader verschijnt als paperback en kost {price}. {shipping}. Het boek is een pre-order: je betaalt bij het bestellen en het boek wordt later verstuurd. De actuele verzendinformatie: {period}.",
          "Je bestelt rechtstreeks bij de auteur en rekent zonder account af met iDEAL. Geef je het cadeau? Dan vul je bij het afrekenen het adres van de ontvanger in. [Reserveer je exemplaar](/bestellen).",
        ],
      },
    ],
    faq: [
      {
        q: "Wat is een goed boek voor een aanstaande vader?",
        a: "Dat hangt af van wat hij zoekt. Wil hij weten hoe zwangerschap en bevalling werken, dan past een praktisch handboek. Zoekt hij herkenning en humor, dan past een persoonlijk verhaal zoals De vergeten vader. De twee vullen elkaar goed aan.",
      },
      {
        q: "Is De vergeten vader een handboek?",
        a: "Nee. Het is een persoonlijk en humoristisch boek over de zwangerschap door de ogen van de vader. Er staan geen medische adviezen of checklists in.",
      },
      {
        q: "Is het boek geschikt als cadeau?",
        a: "Ja. Het is geschreven voor mannen die voor het eerst vader worden en past daardoor goed als cadeau van partner, familie of vrienden. Houd rekening met de verzendperiode, want het is een pre-order.",
      },
      {
        q: "Kan ik eerst een stuk lezen?",
        a: "Ja. Op de homepage staat een [gratis fragment uit hoofdstuk 10](/#fragment). Je hoeft er geen e-mailadres voor achter te laten.",
      },
    ],
    related: [
      "cadeau-aanstaande-vader",
      "tips-aanstaande-vader",
      "eerste-keer-vader-worden",
    ],
  },
  {
    slug: "cadeau-aanstaande-vader",
    title: "Cadeau aanstaande vader: 12 originele ideeën | De vergeten vader",
    heading: "Cadeau voor een aanstaande vader: 12 originele ideeën",
    tagline: "Tussen alle rompertjes: iets voor hem",
    category: "Cadeau-idee",
    published: PUBLISHED,
    updated: UPDATED,
    description:
      "Op zoek naar een origineel cadeau voor een aanstaande vader of papa in wording? 12 ideeën voor partner, vriend, broer of collega, van klein gebaar tot groot kado.",
    intro:
      "De baby heeft inmiddels drie knuffelkonijnen. Zij krijgt bloemen. En hij? Die krijgt meestal de vraag of hij de doos even kan tillen. Een cadeau voor de aanstaande vader mag ook gewoon voor hem zijn. Hieronder twaalf ideeën, van klein gebaar tot groot kado.",
    sections: [
      {
        heading: "Eerst dit: kies op de persoon, niet op het etiket ‘papa’",
        paragraphs: [
          "Niet iedere vader in spe zit te wachten op een mok met een functietitel. Bedenk waar hij normaal blij van wordt. Leest hij graag, houdt hij van koken, is hij van de praktische spullen? Het beste cadeau voor een toekomstige papa zegt twee dingen: ik zie dat jouw leven ook verandert, en ik weet nog wie je bent.",
        ],
      },
      {
        id: "ideeen",
        heading: "12 cadeaus voor een aanstaande vader",
        paragraphs: [],
        ordered: true,
        items: [
          {
            title: "Een boek dat over hém gaat",
            text: "Bijna alles wat hij te lezen krijgt, gaat over haar en de baby. De vergeten vader vertelt de zwangerschap vanaf zijn kant, met droge humor en korte hoofdstukken. Een cadeau dat niet in de babykamer verdwijnt. [Bekijk het boek voor aanstaande vaders](/boek-aanstaande-vader) of [lees eerst het fragment](/#fragment).",
          },
          {
            title: "Een draagzak die hij zelf uitkiest",
            text: "Dragen is een fijne manier om de baby dichtbij te hebben en toch je handen vrij te houden. Geef een tegoedbon of ga samen passen, want pasvorm is persoonlijk.",
          },
          {
            title: "Een luiertas die hij ook wil dragen",
            text: "Een stevige rugzak met handige vakken, zonder beertjesprint. Hij gaat hem vaker dragen dan hij nu denkt.",
          },
          {
            title: "Een goede thermosbeker",
            text: "Koffie die warm blijft tot de baby eindelijk slaapt. Klein cadeau, dagelijks plezier. Ideaal voor een collega.",
          },
          {
            title: "Een avond uit voordat de baby er is",
            text: "Uit eten, naar de film of een concert. Met jou, of met zijn vrienden. Tijd is straks het schaarste artikel.",
          },
          {
            title: "Een vriezer vol maaltijden",
            text: "Kook een paar porties van zijn lievelingseten en vries ze in voor de kraamweek. Niet romantisch, wel het cadeau waar hij je in week twee het dankbaarst voor is.",
          },
          {
            title: "Een koptelefoon of oordopjes",
            text: "Voor podcasts tijdens nachtelijke wandelrondjes door de gang. Vraag wel even of hij al een goed setje heeft.",
          },
          {
            title: "Een invulboek of dagboek voor vaders",
            text: "Om het eerste jaar in vast te leggen. Past goed bij iemand die graag schrijft, of bij iemand die anders alles vergeet.",
          },
          {
            title: "Een bon voor hulp",
            text: "Een zelfgemaakte tegoedbon voor oppassen, boodschappen doen of een avond koken. Kost niets en is in de eerste maanden goud waard.",
          },
          {
            title: "Een fotolijst voor de eerste foto samen",
            text: "Vaders staan zelden op de foto, want ze maken hem. Geef een lijst en beloof dat jij de foto maakt.",
          },
          {
            title: "Iets matchends, met mate",
            text: "Sokken of een shirt in dezelfde stijl als die van de baby. Leuk als hij van zulke grappen houdt. Eén setje is genoeg.",
          },
          {
            title: "Een brief of kaart van jou",
            text: "Schrijf op waarom je ernaar uitkijkt om hem als vader te zien. Combineer het met een klein cadeau en het wordt het cadeau dat hij bewaart.",
          },
        ],
      },
      {
        heading: "Welk cadeau past bij wie?",
        paragraphs: [],
        items: [
          {
            title: "Van zijn partner",
            text: "Jij weet wat hem raakt. Iets persoonlijks werkt het best: het boek met een brief erin, een avond uit of die eerste foto in een lijst.",
          },
          {
            title: "Van vrienden of voor een dadchelor",
            text: "Leg samen in voor een draagzak of een goede tas, en doe er iets luchtigs bij. Een grappig boek voor de aanstaande vader is precies dat: te gebruiken en om te lachen.",
          },
          {
            title: "Van collega’s",
            text: "Houd het klein en bruikbaar. Een thermosbeker of een boek met een kaart van het hele team is genoeg.",
          },
          {
            title: "Van (schoon)ouders, broer of zus",
            text: "Praktische hulp is het beste cadeau: maaltijden, een oppasbon, of iets waar hij zelf niet aan toekomt.",
          },
        ],
      },
      {
        heading: "Waarom een boek een goed cadeau is",
        paragraphs: [
          "De vergeten vader van Sem de Wachter vertelt over zwangerschap vanuit de man naast de buik. De korte hoofdstukken gaan over betrokkenheid, onzekerheid en momenten waarop een goedbedoelde zin heel anders landt dan gepland.",
          "Daarmee is het een zwangerschapscadeau dat hij zelf gebruikt. Hij kan het in zijn eentje lezen. Of een herkenbaar stukje voorlezen, als jullie daar allebei zin in hebben. De paperback kost {price}. {shipping}.",
        ],
      },
      {
        heading: "Een kaartje zonder grootse vaderwijsheid",
        paragraphs: [
          "Je hoeft hem geen succes te wensen met achttien jaar slaaptekort. Schrijf liever iets eenvoudigs: ‘Voor jou, want dit is ook een nieuw hoofdstuk in jouw leven.’ Of vertel waarom je ernaar uitkijkt om hem als vader te zien.",
          "Let bij het bestellen van het boek op de verzendperiode. Het is een pre-order: betaling gebeurt nu, verzending later. Is er binnenkort een babyshower of verjaardag, controleer dan of die planning past. Een pre-order is geen belofte van levering voor een specifieke feestdag.",
        ],
      },
    ],
    faq: [
      {
        q: "Wat is een origineel cadeau voor een aanstaande papa?",
        a: "Iets dat voor hem persoonlijk is en niet voor de baby. Denk aan een boek over vader worden, een avond uit voor de bevalling, een draagzak die hij zelf kiest of een brief van zijn partner.",
      },
      {
        q: "Wat geef je een collega die vader wordt?",
        a: "Iets kleins en bruikbaars: een goede thermosbeker of een boek, met een kaart van het team. Het gebaar telt meer dan het bedrag.",
      },
      {
        q: "Wat geef je de aanstaande vader op een babyshower of dadchelor?",
        a: "Combineer iets praktisch met iets luchtigs. Een gezamenlijk cadeau zoals een draagzak of luiertas, met een grappig boek erbij.",
      },
      {
        q: "Kan ik het boek direct naar hem laten sturen?",
        a: "Ja. Bij het afrekenen vul je het bezorgadres van de ontvanger in; de bevestiging gaat naar jouw e-mailadres. [Bestel De vergeten vader](/bestellen).",
      },
    ],
    related: [
      "boek-aanstaande-vader",
      "wat-niemand-aan-de-vader-vraagt",
      "tips-aanstaande-vader",
    ],
  },
  {
    slug: "eerste-keer-vader-worden",
    title: "Eerste keer vader worden: wat moet je regelen en verwachten?",
    heading: "Voor het eerst vader worden: wat komt er op je af?",
    tagline: "Je wordt vader. En nu?",
    category: "Vader worden",
    published: PUBLISHED,
    updated: UPDATED,
    description:
      "Voor het eerst vader worden? Lees wat je kunt verwachten, hoe je je voorbereidt en wat je moet regelen: erkenning, geboorteverlof, kraamzorg en aangifte.",
    intro:
      "Er is nieuws. Groot nieuws. Je bent blij, stil, zenuwachtig, of alle drie binnen een minuut. Ondertussen verwacht de wereld misschien al een overtuigend ‘geweldig’. Je hoeft niet meteen een afgerond antwoord te hebben. Wel helpt het om te weten wat er ongeveer aankomt.",
    sections: [
      {
        heading: "Laat het nieuws even landen",
        paragraphs: [
          "Voor de één voelt het vaderschap direct echt. Voor de ander komt dat besef tijdens een echo, bij het uitzoeken van een naam of pas veel later. Maak van je eerste reactie geen toelatingsexamen. Begin bij wat je wél kunt zeggen: waar je naar uitkijkt en wat je spannend vindt.",
          "Een gesprek hoeft geen complete analyse te worden. ‘Ik vind het mooi en ik weet nog niet zo goed wat ik moet doen’ is al een bruikbare zin. Je partner kan niet raden wat zich achter je enthousiaste knik afspeelt.",
        ],
      },
      {
        heading: "Wat kun je verwachten als aanstaande vader?",
        paragraphs: [
          "Iedere zwangerschap loopt anders, maar in grote lijnen verschuift jouw rol mee met de maanden.",
        ],
        items: [
          {
            title: "De eerste maanden",
            text: "Vaak weten nog maar weinig mensen het. Je partner kan moe of misselijk zijn terwijl jij aan de buitenkant niets ziet veranderen. Dit is het moment om taken over te nemen zonder dat erom gevraagd wordt.",
          },
          {
            title: "Het midden",
            text: "Het nieuws is rond, de buik wordt zichtbaar en er komen afspraken en echo’s. Ga mee waar jullie dat willen en zet de data zelf in je agenda. Nu is er ook tijd voor de papierwinkel hieronder.",
          },
          {
            title: "De laatste maanden",
            text: "De babykamer, de tas, je verlof en de vraag wie je belt als het begint. Praat samen over de bevalling en over de eerste weken daarna. Lees ook [wat je als vader tijdens de bevalling kunt doen](/vader-tijdens-de-bevalling).",
          },
        ],
      },
      {
        id: "regelen",
        heading: "Ik word vader: wat moet ik regelen?",
        paragraphs: [
          "Dit zijn de belangrijkste regelzaken voor vaders en partners in Nederland. De regels kunnen veranderen en jouw situatie kan afwijken, dus controleer de details bij de bron. De Rijksoverheid heeft een [checklist voor als je een kind krijgt](https://www.rijksoverheid.nl/vraag-en-antwoord/zwangerschap-en-geboorte/checklist-kind-krijgen).",
        ],
        ordered: true,
        items: [
          {
            title: "Erken je kind als jullie niet getrouwd zijn",
            text: "Ben je niet getrouwd en heb je geen geregistreerd partnerschap, dan ben je niet automatisch de wettelijke vader. Je erkent je kind bij de gemeente. Dat kan al tijdens de zwangerschap en is gratis. Door de erkenning krijg je in de regel ook samen met de moeder het ouderlijk gezag.",
          },
          {
            title: "Meld je op tijd aan voor kraamzorg",
            text: "Kraamzorg regel je vroeg in de zwangerschap. Vraag je zorgverzekeraar of verloskundige wanneer en hoe je je aanmeldt.",
          },
          {
            title: "Vraag je geboorteverlof aan",
            text: "Werk je in loondienst, dan heb je na de geboorte recht op één werkweek geboorteverlof, volledig doorbetaald door je werkgever. Je neemt het op binnen vier weken na de geboorte.",
          },
          {
            title: "Bespreek aanvullend geboorteverlof",
            text: "Daarna kun je maximaal vijf weken aanvullend geboorteverlof opnemen, binnen zes maanden na de geboorte. Je krijgt dan geen loon maar een uitkering van UWV van 70 procent van je dagloon. Je vraagt het aan bij je werkgever; doe dat ruim van tevoren. Meer op [rijksoverheid.nl over geboorteverlof voor partners](https://www.rijksoverheid.nl/themas/werk/geboorteverlof-en-partnerverlof/geboorteverlof-voor-partners).",
          },
          {
            title: "Kijk naar ouderschapsverlof",
            text: "Naast geboorteverlof bestaat er ouderschapsverlof, waarvan een deel betaald is. Vraag je werkgever of bekijk je cao: soms vult de werkgever aan. Ben je zzp’er, dan gelden deze verlofregelingen niet voor jou en regel je het zelf.",
          },
          {
            title: "Doe binnen drie dagen aangifte van de geboorte",
            text: "Na de geboorte doe je aangifte bij de gemeente waar je kind is geboren, binnen drie dagen. De geboortedag telt niet mee. Meer op [rijksoverheid.nl over geboorteaangifte](https://www.rijksoverheid.nl/vraag-en-antwoord/aangifte-geboorte-en-naamskeuze-kind/aangifte-geboorte).",
          },
          {
            title: "Meld je kind aan bij de zorgverzekering",
            text: "Doe dat binnen vier maanden na de geboorte. Controleer meteen of jullie toeslagen veranderen.",
          },
          {
            title: "Denk vroeg na over kinderopvang",
            text: "Wachtlijsten kunnen lang zijn. Wil je opvang, schrijf je dan al tijdens de zwangerschap in.",
          },
        ],
      },
      {
        heading: "Maak betrokkenheid concreet",
        paragraphs: [
          "Vraag welke afspraken jullie samen willen bijwonen. Kies een paar praktische taken die je van begin tot eind regelt, inclusief uitzoeken en onthouden. Alleen vragen wat je kunt doen laat het plannen nog steeds bij de ander liggen. In [12 tips voor aanstaande vaders](/tips-aanstaande-vader) staat hoe je dat aanpakt.",
          "Bespreek ook hoe jullie tijd voor elkaar houden. Dat kan een wandeling zijn waarop het tien minuten niet over babyspullen gaat. Je blijft partners terwijl je ouders wordt. Dat klinkt vanzelfsprekend, tot je derde gesprek op rij over een commode gaat.",
        ],
      },
      {
        heading: "Je hoeft niet overal een oplossing voor te hebben",
        paragraphs: [
          "Soms wil iemand iets vertellen zonder dat er een actieplan uitkomt. Vraag: ‘Wil je dat ik meedenk of zal ik gewoon luisteren?’ Het is een kleine vraag die een hoop goedbedoelde verbouwplannen voorkomt.",
          "Zoek zelf ook iemand met wie je eerlijk kunt praten: een vriend, broer of andere vader. Een ander verhaal horen kan helpen om woorden te vinden voor je eigen ervaring. Blijven zorgen je dagelijks leven beheersen, bespreek dat dan met je huisarts. Lees ook [wat niemand aan de vader vraagt](/wat-niemand-aan-de-vader-vraagt).",
        ],
      },
      {
        heading: "Lees iets waarin je jezelf tegenkomt",
        paragraphs: [
          "Praktische informatie is nuttig. Herkenning is dat ook. De vergeten vader kijkt met humor naar de man die meedoet, soms over het hoofd wordt gezien en langzaam vader wordt. Bekijk [het boek voor aanstaande vaders](/boek-aanstaande-vader) of begin met het [gratis fragment](/#fragment). Je hoeft vandaag niet je hele vaderschap af te hebben.",
        ],
      },
    ],
    faq: [
      {
        q: "Hoe bereid je je voor op vader worden?",
        a: "Ga mee naar afspraken, neem thuis taken helemaal over, regel de papieren zaken zoals erkenning en verlof, en praat met je partner over de bevalling en de eerste weken. En praat ook met iemand over hoe het voor jou is.",
      },
      {
        q: "Wat moet je regelen als je vader wordt?",
        a: "De belangrijkste punten: je kind erkennen als jullie niet getrouwd zijn, kraamzorg, geboorteverlof en aanvullend geboorteverlof, aangifte van de geboorte binnen drie dagen, de zorgverzekering en eventueel kinderopvang. Zie de [checklist hierboven](/eerste-keer-vader-worden#regelen).",
      },
      {
        q: "Is het normaal dat ik me nog geen vader voel?",
        a: "Ja. Bij veel mannen komt dat gevoel later dan het nieuws: bij een echo, bij de geboorte of pas in de weken daarna. Dat zegt niets over hoe je straks als vader bent.",
      },
      {
        q: "Hoeveel verlof krijg je als vader?",
        a: "In loondienst heb je recht op één werkweek geboorteverlof met volledig loon en daarna maximaal vijf weken aanvullend geboorteverlof met een UWV-uitkering van 70 procent van je dagloon. Controleer de actuele regels op rijksoverheid.nl.",
      },
    ],
    related: [
      "tips-aanstaande-vader",
      "vader-tijdens-de-bevalling",
      "boek-aanstaande-vader",
    ],
  },
  {
    slug: "tips-aanstaande-vader",
    title: "12 tips voor aanstaande vaders (van een ervaringsdeskundige)",
    heading: "12 tips voor aanstaande vaders",
    tagline: "Begin klein. Doe het zelf.",
    category: "Praktisch samen",
    published: PUBLISHED,
    updated: UPDATED,
    description:
      "12 praktische tips voor aanstaande vaders tijdens de zwangerschap: van meegaan naar afspraken en taken overnemen tot verlof regelen en voor jezelf zorgen.",
    intro:
      "Je hoeft geen wandelende zwangerschapsencyclopedie te worden. Je kunt wel zorgen dat je partner niet ook nog projectleider van jouw betrokkenheid hoeft te zijn. Twaalf tips voor vaders in wording, zonder perfecte-papa-lijst.",
    sections: [
      {
        id: "tips",
        heading: "De 12 tips",
        paragraphs: [],
        ordered: true,
        items: [
          {
            title: "Ga mee naar afspraken en zet ze zelf in je agenda",
            text: "Vraag welke controles en echo’s jullie samen willen doen. Zet de data er zelf in. Wie herinnerd moet worden, is er wel bij maar doet nog niet mee.",
          },
          {
            title: "Neem een taak over, inclusief het denkwerk",
            text: "Kies samen iets dat jij regelt: boodschappen, de route naar het ziekenhuis, een onderdeel van de babykamer. ‘Regelen’ betekent ook controleren of het klaar is. Een lege koelkast met een uitstekend plan blijft een lege koelkast.",
          },
          {
            title: "Schrijf je vragen op vóór de afspraak",
            text: "Tijdens een gesprek vergeet je makkelijk de vraag waarvoor je was meegekomen. Vraag je partner wat zij wil bespreken en waar jij kunt aanvullen.",
          },
          {
            title: "Stel medische vragen op de juiste plek",
            text: "Medische vragen horen bij de verloskundige of arts. Een forum, een vriend en een grappig boek kunnen ervaringen delen, maar kennen jullie situatie niet.",
          },
          {
            title: "Regel de papierwinkel",
            text: "Erkenning, kraamzorg, geboorteverlof, aangifte. Dit is bij uitstek een klus die jij kunt trekken. De checklist staat in [wat moet je regelen als je vader wordt](/eerste-keer-vader-worden#regelen).",
          },
          {
            title: "Vraag: meedenken of luisteren?",
            text: "Soms wil iemand iets kwijt zonder dat er een actieplan uitkomt. Deze ene vraag voorkomt een hoop goedbedoelde oplossingen op het verkeerde moment.",
          },
          {
            title: "Vraag wat prettig is, en vraag het later nog eens",
            text: "Niet iedere zwangere wil dat alles wordt overgenomen. Behoeften veranderen per week. Wat vorige maand hielp, kan nu irriteren.",
          },
          {
            title: "Bespreek bezoek voordat iedereen op de stoep staat",
            text: "Wie willen jullie straks zien? Wie houdt familie op de hoogte? Wie zegt dat het vandaag niet uitkomt? Een gedeelde afspraak geeft rust als je moe bent.",
          },
          {
            title: "Praat over de verdeling na de geboorte",
            text: "Wat betekent ‘even helpen’ voor de één en voor de ander? Wie denkt aan eten, was en telefoontjes? Het gaat niet om punten tellen, maar om voorkomen dat alles vanzelf bij dezelfde persoon belandt.",
          },
          {
            title: "Bereid je samen voor op de bevalling",
            text: "Praat over wat zij prettig vindt, weet waar de tas staat en hoe je de zorgverlener bereikt. Meer in [vader tijdens de bevalling](/vader-tijdens-de-bevalling).",
          },
          {
            title: "Blijf partners",
            text: "Een wekelijkse wandeling kan al ruimte maken voor iets anders dan praktische zaken. Vraag wat fijn was deze week en wat lastig was. Vertel zelf ook iets. ‘Goed hoor’ is een antwoord, maar je kunt er moeilijk een gesprek op bouwen.",
          },
          {
            title: "Vergeet jezelf niet",
            text: "Jouw leven verandert ook. Praat met een vriend, broer of andere vader over hoe het voor jou is. Lees [wat niemand aan de vader vraagt](/wat-niemand-aan-de-vader-vraagt).",
          },
        ],
      },
      {
        heading: "De grootste valkuil: helpen in plaats van meedoen",
        paragraphs: [
          "‘Zeg maar wat ik moet doen’ klinkt behulpzaam. Toch blijft het bedenken, plannen en onthouden dan bij haar liggen. Het verschil tussen helpen en meedoen zit in eigenaarschap: jij ziet dat het moet gebeuren, jij regelt het, jij controleert of het af is.",
          "Begin met één ding dat helemaal van jou is. Dat werkt beter dan tien dingen half.",
        ],
      },
      {
        heading: "Wat je beter niet kunt zeggen",
        paragraphs: [
          "Iedere aanstaande vader zegt een keer iets dat anders landt dan bedoeld. ‘Ben je alweer moe?’ en ‘Bij mijn zus ging dat heel makkelijk’ zijn klassiekers. Je herstelt het niet met een betere zin, maar door te luisteren naar wat er terugkomt.",
          "In De vergeten vader krijgen juist die kleine, soms onhandige momenten een plek. Geen handleiding voor de perfecte partner. Wel een boek dat je eraan herinnert dat je deel uitmaakt van het verhaal. Bekijk [het boek voor aanstaande vaders](/boek-aanstaande-vader) of [lees het fragment](/#fragment).",
        ],
      },
    ],
    faq: [
      {
        q: "Wat kan een vader doen tijdens de zwangerschap?",
        a: "Meegaan naar afspraken, taken thuis volledig overnemen, de regelzaken oppakken, zich samen voorbereiden op de bevalling en blijven vragen wat zijn partner nodig heeft.",
      },
      {
        q: "Wat is de beste tip voor aanstaande vaders?",
        a: "Wacht niet tot je een opdracht krijgt. Kies één taak en regel die van begin tot eind, inclusief het nadenken en onthouden.",
      },
      {
        q: "Hoe steun ik mijn zwangere partner?",
        a: "Vraag wat zij prettig vindt en herhaal die vraag regelmatig. Luister zonder direct op te lossen en neem praktisch werk uit handen zonder dat zij het hoeft aan te sturen.",
      },
    ],
    related: [
      "eerste-keer-vader-worden",
      "vader-tijdens-de-bevalling",
      "boek-aanstaande-vader",
    ],
  },
  {
    slug: "wat-niemand-aan-de-vader-vraagt",
    title: "Wat niemand aan de vader vraagt | De vergeten vader",
    heading: "Wat niemand aan de aanstaande vader vraagt",
    tagline: "En hoe gaat het eigenlijk met jou?",
    category: "De man naast de buik",
    published: PUBLISHED,
    updated: UPDATED,
    description:
      "Tijdens de zwangerschap gaan veel vragen naar haar. Terecht. Maar wat gebeurt er met de man ernaast? Over betrokken zijn en zelf ook iets mogen voelen.",
    intro:
      "Hoe gaat het met haar? Groeit de baby goed? Hebben jullie al een naam? Je beantwoordt het allemaal. Daarna is het gesprek klaar. Je eigen antwoord lag nog ergens halverwege je keel.",
    sections: [
      {
        heading: "Aandacht is geen wedstrijd",
        paragraphs: [
          "Zij draagt het kind. Er gebeurt lichamelijk iets groots en de zorg richt zich daarop. Dat begrijpen neemt niet weg dat er bij jou ook van alles verschuift. Blijdschap, verantwoordelijkheid, zorgen die je nog niet eerder had.",
          "Je hoeft haar ervaring niet kleiner te maken om de jouwe te benoemen. ‘Ik merk dat ik zenuwachtig ben’ is geen claim op de hoofdrol. Het is informatie over iemand die straks ook voor dit kind gaat zorgen.",
        ],
      },
      {
        heading: "De handige man zegt al snel dat alles goed gaat",
        paragraphs: [
          "Als er een tas gedragen moet worden, heb je een duidelijke taak. Als iemand vraagt wat het met je doet om vader te worden, wordt het lastiger. Een praktische oplossing is overzichtelijker dan een gevoel dat nog geen naam heeft.",
          "Maar steeds nuttig zijn is niet hetzelfde als alles verwerkt hebben. Je mag even niet weten wat je moet zeggen. Je mag ook iets delen terwijl het nog niet keurig geformuleerd is. Aan een rommelig eerlijk antwoord heeft een gesprek vaak meer dan aan je beste persbericht.",
        ],
      },
      {
        heading: "Stel de vraag ook aan elkaar",
        paragraphs: [
          "Ken je iemand die vader wordt? Vraag eens waar hij naar uitkijkt. Of wat hem bezighoudt. Laat de grap over luiers een keer wachten en luister naar het antwoord zonder er direct jouw eigen bevallingsverhaal overheen te leggen. Zoek je iets om hem te geven? Bekijk de [cadeau-ideeën voor een aanstaande vader](/cadeau-aanstaande-vader).",
          "Word je zelf vader, dan mag je die ruimte ook vragen. ‘Ik wil nog even vertellen hoe ik die afspraak vond.’ Klein, concreet en zonder dat je eerst moet aantonen dat je het zwaar genoeg hebt. Meer houvast vind je in [voor het eerst vader worden](/eerste-keer-vader-worden).",
        ],
      },
      {
        heading: "Daarom bestaat De vergeten vader",
        paragraphs: [
          "De man naast de buik is aanwezig in het verhaal. Soms alleen nog niet in het gesprek. [Het boek van Sem de Wachter](/boek-aanstaande-vader) kijkt met droge humor en warmte naar die plek. De Vergeetschaal geeft daar een cijfer aan. Niet omdat gevoelens meetbaar zijn, maar omdat je er soms eerst om moet lachen voordat je erover kunt praten.",
        ],
      },
    ],
    related: ["over-sem", "eerste-keer-vader-worden", "boek-aanstaande-vader"],
  },
  {
    slug: "vader-tijdens-de-bevalling",
    title: "Vader tijdens de bevalling: jouw rol als partner",
    heading: "Vader tijdens de bevalling: wat kun je doen?",
    tagline: "Naast haar staan is ook iets doen",
    category: "Samen voorbereiden",
    published: PUBLISHED,
    updated: UPDATED,
    description:
      "Hoe kun je als vader of partner aanwezig zijn tijdens de bevalling? Bespreek wensen, regel praktische zaken en volg de begeleiding van de zorgverleners.",
    intro:
      "Misschien zoek je naar je taak tijdens de bevalling. Iets duidelijk afgebakends, liefst met een begin- en eindtijd. De werkelijkheid houdt zich daar zelden aan. Je kunt je wel samen voorbereiden op hoe je aanwezig wilt zijn.",
    sections: [
      {
        heading: "Praat vooraf over wat zij prettig vindt",
        paragraphs: [
          "Vraag hoe je partner denkt over aanraking, aanmoediging en stilte. Wat helpt haar normaal als iets intens is? Wie wil ze erbij hebben? Bespreek wensen samen met de verloskundige of het geboorteteam. Zie ze als gespreksbasis, niet als een contract waar de dag aan moet voldoen.",
          "Tijdens de bevalling kan haar behoefte veranderen. Blijf vragen en luisteren. Iets wat gisteren prettig klonk, kan op dat moment juist afleiden. Dat is geen beoordeling van jouw inzet.",
        ],
      },
      {
        heading: "Regel wat je vooraf kunt regelen",
        paragraphs: [
          "Weet waar de tas staat, hoe jullie de zorgverlener bereiken en welke afspraken jullie met het geboorteteam hebben gemaakt. Zorg dat je telefoon opgeladen is. Bespreek wie eventuele andere kinderen opvangt en wie familie op de hoogte houdt. Denk ook alvast aan wat daarna komt, zoals je verlof en de geboorteaangifte: zie [wat moet je regelen als je vader wordt](/eerste-keer-vader-worden#regelen).",
          "Dit zijn praktische voorbereidingen, geen medische instructies. Wanneer je moet bellen of vertrekken hangt af van jullie situatie. Volg daarvoor de afspraken met je zorgverlener; neem bij twijfel contact op met die zorgverlener.",
        ],
      },
      {
        heading: "Help het gesprek, neem het niet over",
        paragraphs: [
          "Je kunt helpen onthouden wat besproken is en vragen of iets nog eens uitgelegd kan worden. Laat je partner zelf spreken waar dat kan en waar zij dat wil. Vraag wat ze nodig heeft om te begrijpen wat er gebeurt.",
          "De zorgverleners begeleiden de bevalling. Je hoeft hun werk niet te doen. Aanwezig zijn, luisteren en praktische dingen oppakken kan juist ruimte geven. Stil naast iemand zitten is soms nuttiger dan je zevende bemoedigende spreuk.",
        ],
      },
      {
        heading: "Praat achteraf ook over jouw ervaring",
        paragraphs: [
          "Een bevalling kan anders lopen dan verwacht. Zoek later een rustig moment om te bespreken hoe jullie die dag hebben beleefd. Jullie kunnen bij dezelfde gebeurtenis verschillende dingen hebben gevoeld. Als er vragen blijven, vraag het geboorteteam om een nagesprek.",
          "[De vergeten vader](/boek-aanstaande-vader) gaat over de menselijke kant van die plek naast haar: betrokken, soms zoekend, steeds meer vader. Het boek en dit artikel vervangen geen begeleiding door verloskundige of arts. Meer praktische ideeën staan in [12 tips voor aanstaande vaders](/tips-aanstaande-vader).",
        ],
      },
    ],
    related: [
      "tips-aanstaande-vader",
      "wat-niemand-aan-de-vader-vraagt",
      "boek-aanstaande-vader",
    ],
  },
];
export const publicRoutes = [
  "/",
  ...contentPages.map((page) => `/${page.slug}`),
  "/blog",
  "/over-sem",
  "/bestellen",
  "/algemene-voorwaarden",
  "/privacy",
];
