export type ContentPage = {
  slug: string;
  title: string;
  heading: string;
  description: string;
  category: string;
  intro: string;
  sections: { heading: string; paragraphs: string[] }[];
  related: string[];
};
export const contentPages: ContentPage[] = [
  {
    slug: "boek-aanstaande-vader",
    title:
      "Boek voor aanstaande vaders | De vergeten vader – Sem de Wachter",
    heading: "Een boek voor de man naast de buik",
    category: "Het boek",
    description:
      "Zoek je een boek voor een aanstaande vader? Ontdek De vergeten vader van Sem de Wachter: korte hoofdstukken, droge humor en eerlijke herkenning.",
    intro:
      "Er zijn boeken die vertellen hoe groot de baby deze week is. Dit boek gaat over degene die naast de buik staat. Die ook iets voelt, maar daar nog geen handig woord voor heeft.",
    sections: [
      {
        heading: "Herkenning tussen de afspraken door",
        paragraphs: [
          "Je gaat mee naar de echo. Je luistert, knikt en probeert tegelijk te onthouden wat er net gezegd is. Thuis vraagt iemand hoe het met haar gaat. Terecht. Alleen had je zelf misschien ook nog iets te vertellen.",
          "De vergeten vader van Sem de Wachter geeft die kant van de zwangerschap ruimte. Met persoonlijke verhalen over betrokken willen zijn, onhandige opmerkingen en langzaam beseffen dat ‘straks’ echt komt. Geen perfecte vader op de omslag die je binnen drie hoofdstukken moet worden.",
        ],
      },
      {
        heading: "Korte hoofdstukken, geen huiswerk",
        paragraphs: [
          "Je hoeft er geen studieavond voor vrij te houden. Lees een hoofdstuk in de trein, in een wachtkamer of voordat je gaat slapen. Elk hoofdstuk eindigt met De Vergeetschaal: een volstrekt onwetenschappelijk cijfer voor hoe vergeten de vader zich voelt.",
          "Het fragment ‘Hormonen: een veldgids’ laat je alvast kennismaken met de toon. Lees het voordat je beslist. Een boek moet bij je passen, ook als het over een leven gaat dat je nog niet kent.",
        ],
      },
      {
        heading: "Voor jezelf. Of voor iemand die vader wordt",
        paragraphs: [
          "Verwacht je je eerste kind en zoek je vooral herkenning? Dan is dit boek voor jou. Zoek je als partner, zus, broer of collega iets voor de aanstaande vader? Dan geef je met dit boek ook een kleine boodschap mee: we zien jou ook.",
          "Dit is geen medisch zwangerschapshandboek. Je vindt hier geen diagnose, behandeladvies of belofte dat je na het lezen alles weet. Wel humor en een eerlijk perspectief van iemand die zelf naast die buik stond.",
        ],
      },
    ],
    related: ["eerste-keer-vader-worden", "cadeau-aanstaande-vader"],
  },
  {
    slug: "cadeau-aanstaande-vader",
    title: "Cadeau voor een aanstaande vader | De vergeten vader",
    heading: "Tussen alle rompertjes: iets voor hem",
    category: "Cadeau-idee",
    description:
      "Een persoonlijk cadeau voor een aanstaande vader, partner, broer of collega. Waarom een eerlijk en grappig boek past bij iemand die voor het eerst vader wordt.",
    intro:
      "De baby heeft inmiddels drie knuffelkonijnen. Zij krijgt bloemen. En hij? Die krijgt meestal de vraag of hij de doos even kan tillen. Een cadeau voor de aanstaande vader mag ook gewoon voor hem zijn.",
    sections: [
      {
        heading: "Kies op de persoon, niet op het etiket ‘papa’",
        paragraphs: [
          "Niet iedere vader in spe zit te wachten op een mok met een functietitel. Bedenk waar hij normaal blij van wordt. Leest hij graag, houdt hij van droge humor of praat hij makkelijker over iets dat hij ergens heeft gelezen? Dan kan een boek een mooie opening zijn.",
          "Bij een cadeau voor je partner weet je waarschijnlijk al wat raakt. Voor een collega hoef je het niet groot te maken. Een klein, persoonlijk gebaar met een kaartje kan genoeg zijn. Het gaat om aandacht, niet om bewijzen dat je de beste cadeaugever bent.",
        ],
      },
      {
        heading: "Een boek dat hem aanspreekt",
        paragraphs: [
          "De vergeten vader van Sem de Wachter vertelt over zwangerschap vanuit de man naast de buik. De korte hoofdstukken gaan over betrokkenheid, onzekerheid en momenten waarop een goedbedoelde zin heel anders landt dan gepland.",
          "Daarmee is het een zwangerschapscadeau dat niet in de babykamer verdwijnt. Hij mag het zelf lezen. Of een herkenbaar stukje voorlezen, als jullie daar allebei zin in hebben. Lees het fragment om te bepalen of de humor bij hem past.",
        ],
      },
      {
        heading: "Een kaartje zonder grootse vaderwijsheid",
        paragraphs: [
          "Je hoeft hem geen succes te wensen met achttien jaar slaaptekort. Schrijf liever iets eenvoudigs: ‘Voor jou, want dit is ook een nieuw hoofdstuk in jouw leven.’ Of vertel waarom je ernaar uitkijkt om hem als vader te zien.",
          "Let bij het bestellen op de verwachte verzendperiode. Het boek is een pre-order: betaling gebeurt nu, verzending later. Is er binnenkort een babyshower of verjaardag, controleer dan of die planning past. Een pre-order is geen belofte van levering voor een specifieke feestdag.",
        ],
      },
    ],
    related: ["boek-aanstaande-vader", "wat-niemand-aan-de-vader-vraagt"],
  },
  {
    slug: "eerste-keer-vader-worden",
    title: "Eerste keer vader worden: waar begin je? | De vergeten vader",
    heading: "Je wordt vader. En nu?",
    category: "Vader worden",
    description:
      "Voor het eerst vader worden brengt vragen waar geen boodschappenlijst bij zit. Over wennen aan het nieuws, samen praten en je eigen plek vinden.",
    intro:
      "Er is nieuws. Groot nieuws. Je bent blij, stil, zenuwachtig, of alle drie binnen een minuut. Ondertussen verwacht de wereld misschien al een overtuigend ‘geweldig’. Je hoeft niet meteen een afgerond antwoord te hebben.",
    sections: [
      {
        heading: "Laat het nieuws even landen",
        paragraphs: [
          "Voor de één voelt het vaderschap direct echt. Voor de ander komt dat besef tijdens een echo, bij het uitzoeken van een naam of pas veel later. Maak van je eerste reactie geen toelatingsexamen. Begin bij wat je wél kunt zeggen: waar je naar uitkijkt en wat je spannend vindt.",
          "Een gesprek hoeft geen complete analyse te worden. ‘Ik vind het mooi en ik weet nog niet zo goed wat ik moet doen’ is al een bruikbare zin. Je partner kan niet raden wat zich achter je enthousiaste knik afspeelt.",
        ],
      },
      {
        heading: "Maak betrokkenheid concreet",
        paragraphs: [
          "Vraag welke afspraken jullie samen willen bijwonen. Zet ze zelf in je agenda. Kies een paar praktische taken die je van begin tot eind regelt, inclusief uitzoeken en onthouden. Alleen vragen wat je kunt doen laat het plannen nog steeds bij de ander liggen.",
          "Bespreek ook hoe jullie tijd voor elkaar houden. Dat kan een wandeling zijn waarop het tien minuten niet over babyspullen gaat. Je blijft partners terwijl je ouders wordt. Dat klinkt vanzelfsprekend, tot je derde gesprek op rij over een commode gaat.",
        ],
      },
      {
        heading: "Je hoeft niet overal een oplossing voor te hebben",
        paragraphs: [
          "Soms wil iemand iets vertellen zonder dat er een actieplan uitkomt. Vraag: ‘Wil je dat ik meedenk of zal ik gewoon luisteren?’ Het is een kleine vraag die een hoop goedbedoelde verbouwplannen voorkomt.",
          "Zoek zelf ook iemand met wie je eerlijk kunt praten: een vriend, broer of andere vader. Een ander verhaal horen kan helpen om woorden te vinden voor je eigen ervaring. Blijven zorgen je dagelijks leven beheersen, bespreek dat dan met je huisarts.",
        ],
      },
      {
        heading: "Lees iets waarin je jezelf tegenkomt",
        paragraphs: [
          "Praktische informatie is nuttig. Herkenning is dat ook. De vergeten vader kijkt met humor naar de man die meedoet, soms over het hoofd wordt gezien en langzaam vader wordt. Begin gerust met het gratis fragment. Je hoeft vandaag niet je hele vaderschap af te hebben.",
        ],
      },
    ],
    related: ["tips-aanstaande-vader", "boek-aanstaande-vader"],
  },
  {
    slug: "tips-aanstaande-vader",
    title: "Tips voor een aanstaande vader: meedoen in het dagelijks leven",
    heading: "Aanstaande vader? Begin klein. Doe het zelf.",
    category: "Praktisch samen",
    description:
      "Praktische tips voor aanstaande vaders: zelf afspraken onthouden, taken helemaal overnemen, luisteren en samen verwachtingen bespreken. Zonder perfecte-papa-lijst.",
    intro:
      "Je hoeft geen wandelende zwangerschapsencyclopedie te worden. Je kunt wel zorgen dat je partner niet ook nog projectleider van jouw betrokkenheid hoeft te zijn.",
    sections: [
      {
        heading: "Neem een taak over, inclusief het denkwerk",
        paragraphs: [
          "Kies samen iets dat jij regelt. Bijvoorbeeld boodschappen, de route naar een afspraak of het uitzoeken van een praktisch onderdeel van de babykamer. ‘Regelen’ betekent ook controleren of het klaar is. Een lege koelkast met een uitstekend plan blijft een lege koelkast.",
          "Maak afspraken die bij jullie passen. Niet iedere zwangere wil dat alles wordt overgenomen. Vraag wat prettig is en kom daar later op terug; behoeften kunnen veranderen.",
        ],
      },
      {
        heading: "Bewaar vragen voor de juiste plek",
        paragraphs: [
          "Schrijf vóór een afspraak op wat jullie willen vragen. Tijdens een gesprek vergeet je makkelijk de vraag waarvoor je eigenlijk was meegekomen. Vraag je partner welke onderwerpen zij zelf wil bespreken en waar jij kunt aanvullen.",
          "Medische vragen horen bij de verloskundige of arts. Een forum, een vriend en een grappig boek kunnen ervaringen delen, maar kennen jullie situatie niet zoals de zorgverlener die kent.",
        ],
      },
      {
        heading: "Bespreek bezoek voordat iedereen op de stoep staat",
        paragraphs: [
          "Wie willen jullie straks zien? Wie houdt familie op de hoogte? Wie zegt dat het vandaag niet uitkomt? Je hoeft geen draaiboek met toegangsbadges te maken. Een gedeelde afspraak geeft wel rust als je moe bent.",
          "Bespreek tegelijk jullie eigen verwachtingen. Wat betekent ‘even helpen’ voor de één en voor de ander? Wie denkt aan eten, was en telefoontjes? Het gaat niet om punten tellen, maar om voorkomen dat alles vanzelf bij dezelfde persoon belandt.",
        ],
      },
      {
        heading: "Vraag ook hoe het met jullie gaat",
        paragraphs: [
          "Een wekelijkse wandeling kan al ruimte maken voor iets anders dan praktische zaken. Vraag wat fijn was deze week en wat lastig was. Vertel zelf ook iets. ‘Goed hoor’ is een antwoord, maar je kunt er moeilijk een gesprek op bouwen.",
          "In De vergeten vader krijgen juist die kleine, soms onhandige momenten een plek. Geen handleiding voor de perfecte partner. Wel een boek dat je eraan herinnert dat je deel uitmaakt van het verhaal.",
        ],
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
    heading: "En hoe gaat het eigenlijk met jou?",
    category: "De man naast de buik",
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
          "Ken je iemand die vader wordt? Vraag eens waar hij naar uitkijkt. Of wat hem bezighoudt. Laat de grap over luiers een keer wachten en luister naar het antwoord zonder er direct jouw eigen bevallingsverhaal overheen te leggen.",
          "Word je zelf vader, dan mag je die ruimte ook vragen. ‘Ik wil nog even vertellen hoe ik die afspraak vond.’ Klein, concreet en zonder dat je eerst moet aantonen dat je het zwaar genoeg hebt.",
        ],
      },
      {
        heading: "Daarom bestaat De vergeten vader",
        paragraphs: [
          "De man naast de buik is aanwezig in het verhaal. Soms alleen nog niet in het gesprek. Het boek van Sem de Wachter kijkt met droge humor en warmte naar die plek. De Vergeetschaal geeft daar een cijfer aan. Niet omdat gevoelens meetbaar zijn, maar omdat je er soms eerst om moet lachen voordat je erover kunt praten.",
        ],
      },
    ],
    related: [
      "over-sem",
      "eerste-keer-vader-worden",
      "boek-aanstaande-vader",
    ],
  },
  {
    slug: "vader-tijdens-de-bevalling",
    title: "Vader tijdens de bevalling: jouw rol als partner",
    heading: "Naast haar staan is ook iets doen",
    category: "Samen voorbereiden",
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
          "Weet waar de tas staat, hoe jullie de zorgverlener bereiken en welke afspraken jullie met het geboorteteam hebben gemaakt. Zorg dat je telefoon opgeladen is. Bespreek wie eventuele andere kinderen opvangt en wie familie op de hoogte houdt.",
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
          "De vergeten vader gaat over de menselijke kant van die plek naast haar: betrokken, soms zoekend, steeds meer vader. Het boek en dit artikel vervangen geen begeleiding door verloskundige of arts.",
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
