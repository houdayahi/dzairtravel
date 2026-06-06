"use strict";

// données du site : catégories et destinations (fr / en)

const CATEGORIES = [
  {
    id: "plage",
    en: "Beaches & Coasts",
    fr: "Plages & Côtes",
    image: "bejaia_cote.jpg",
  },
  {
    id: "desert",
    en: "Deserts",
    fr: "Déserts",
    image: "tassili.jpg",
  },
  {
    id: "montagne",
    en: "Mountains",
    fr: "Montagnes",
    image: "ghoufi.jpg",
  },
  {
    id: "histoire",
    en: "Archaeological Sites",
    fr: "Sites archéologiques",
    image: "Ruines-romaines-de-Tipaza.jpg",
  },
  {
    id: "ville",
    en: "Historical Cities",
    fr: "Villes historiques",
    image: "constantine.png",
  },
  {
    id: "oasis",
    en: "Oases",
    fr: "Oasis",
    image: "tassili2.jpg",
  },
  {
    id: "nature",
    en: "Nature & Parks",
    fr: "Nature & Parcs",
    image: "grottes.png",
  },
  {
    id: "gorges",
    en: "Gorges & Canyons",
    fr: "Gorges & Canyons",
    image: "chiffa.jpg",
  },
  {
    id: "culture",
    en: "Culture & Traditions",
    fr: "Culture & Traditions",
    image: "oran.jpg",
  },
];

// dégradés de secours si l'image de la catégorie ne charge pas
const CAT_GRADIENTS = {
  plage: "linear-gradient(135deg,#1a78c2,#48b1dd)",
  desert: "linear-gradient(135deg,#c87941,#e8b86d)",
  montagne: "linear-gradient(135deg,#2e7d32,#81c784)",
  histoire: "linear-gradient(135deg,#78909c,#b0bec5)",
  ville: "linear-gradient(135deg,#5c4033,#a1887f)",
  oasis: "linear-gradient(135deg,#e65100,#ffb74d)",
  nature: "linear-gradient(135deg,#33691e,#8bc34a)",
  gorges: "linear-gradient(135deg,#4527a0,#9575cd)",
  culture: "linear-gradient(135deg,#880e4f,#e91e63)",
};

const DESTINATIONS = [
  /* plage et cotes*/
  {
    id: 1,
    categorie: "plage",
    nom_fr: "Corniche de Jijel",
    nom_en: "Jijel Corniche",
    region_fr: "Wilaya de Jijel",
    region_en: "Jijel Province",
    desc_fr:
      "Des eaux émeraude, des falaises calcaires plongeant dans la mer et des criques secrètes font de Jijel l'une des plus belles côtes d'Algérie. Souvent surnommée la « Perle de la Méditerranée ».",
    desc_en:
      "Emerald waters, limestone cliffs dropping into the sea and hidden coves make Jijel one of Algeria's most beautiful coastlines. Often nicknamed the 'Pearl of the Mediterranean.'",
    image: "jijel.jpg",
    lat: 36.82,
    lng: 5.77,
    note: 4.8,
    vedette: true,
  },
  {
    id: 2,
    categorie: "plage",
    nom_fr: "Calanques de Béjaïa",
    nom_en: "Calanques of Béjaïa",
    region_fr: "Wilaya de Béjaïa",
    region_en: "Béjaïa Province",
    desc_fr:
      "Les calanques creusent les falaises calcaires en criques turquoise d'une beauté sauvage. Grottes marines, eaux cristallines et forêt de pins font de ce littoral un trésor naturel.",
    desc_en:
      "The calanques carve turquoise coves into the limestone cliffs with wild beauty. Sea caves, crystal water and pine forest make this coastline a natural treasure.",
    image: "bejaia_cote.jpg",
    lat: 36.77,
    lng: 5.07,
    note: 4.7,
    vedette: false,
  },
  {
    id: 3,
    categorie: "plage",
    nom_fr: "Plage de Tigzirt",
    nom_en: "Tigzirt Beach",
    region_fr: "Wilaya de Tizi Ouzou",
    region_en: "Tizi Ouzou Province",
    desc_fr:
      "Station balnéaire de Kabylie au passé romain, Tigzirt offre de belles plages, les ruines d'Iomnium et une atmosphère méditerranéenne détendue toute l'année.",
    desc_en:
      "A Kabyle seaside resort with a Roman past, Tigzirt offers lovely beaches, the ruins of Iomnium and a relaxed Mediterranean atmosphere year-round.",
    image: "tigzirt.jpg",
    lat: 36.89,
    lng: 4.12,
    note: 4.4,
    vedette: false,
  },

  /* desert */
  {
    id: 4,
    categorie: "desert",
    nom_fr: "Tassili n'Ajjer",
    nom_en: "Tassili n'Ajjer",
    region_fr: "Wilaya d'Illizi",
    region_en: "Illizi Province",
    desc_fr:
      "Vaste plateau gréseux classé à l'UNESCO, le Tassili recèle plus de 15 000 peintures rupestres préhistoriques et des formations rocheuses aux allures extraterrestres.",
    desc_en:
      "A vast sandstone plateau listed by UNESCO, Tassili holds over 15,000 prehistoric rock paintings and rock formations with an otherworldly appearance.",
    image: "tassili.jpg",
    lat: 25.5,
    lng: 8.5,
    note: 4.9,
    vedette: true,
  },
  {
    id: 5,
    categorie: "desert",
    nom_fr: "Massif du Hoggar",
    nom_en: "Hoggar Mountains",
    region_fr: "Wilaya de Tamanrasset",
    region_en: "Tamanrasset Province",
    desc_fr:
      "Au cœur du Sahara, les pics volcaniques noirs du Hoggar surgissent des sables dorés. Un paysage d'une austère beauté, perché à 2 918 m au sommet de l'Assekrem.",
    desc_en:
      "At the heart of the Sahara, the Hoggar's black volcanic peaks rise from golden sands. A landscape of austere beauty, peaking at 2,918 m at the Assekrem.",
    image: "hoggar.jpg",
    lat: 23.3,
    lng: 5.8,
    note: 4.8,
    vedette: true,
  },
  {
    id: 6,
    categorie: "desert",
    nom_fr: "Taghit",
    nom_en: "Taghit",
    region_fr: "Wilaya de Béchar",
    region_en: "Béchar Province",
    desc_fr:
      "Oasis enchantée entourée de dunes roses et d'une palmeraie verdoyante, Taghit est l'un des plus beaux villages sahariens du sud-ouest algérien.",
    desc_en:
      "An enchanting oasis surrounded by pink dunes and a lush palm grove, Taghit is one of the most beautiful Saharan villages in southwestern Algeria.",
    image: "taghit.jpg",
    lat: 30.9,
    lng: -2.08,
    note: 4.7,
    vedette: false,
  },

  /* montagnes*/
  {
    id: 7,
    categorie: "montagne",
    nom_fr: "Djurdjura",
    nom_en: "Djurdjura",
    region_fr: "Tizi Ouzou / Béjaïa",
    region_en: "Tizi Ouzou / Béjaïa",
    desc_fr:
      "Chaîne calcaire de Kabylie dominant les vallées verdoyantes, le Djurdjura se couvre de neige en hiver. Son point culminant, Lalla Khedidja (2 308 m), offre un panorama exceptionnel.",
    desc_en:
      "A Kabyle limestone range dominating green valleys, the Djurdjura is snow-capped in winter. Its highest point, Lalla Khedidja (2,308 m), offers an exceptional panorama.",
    image: "djurdjura.jpg",
    lat: 36.45,
    lng: 4.1,
    note: 4.7,
    vedette: true,
  },
  {
    id: 8,
    categorie: "montagne",
    nom_fr: "Massif des Aurès",
    nom_en: "Aurès Mountains",
    region_fr: "Wilaya de Batna",
    region_en: "Batna Province",
    desc_fr:
      "Terre de culture berbère chaoui, les Aurès abritent Chélia (2 328 m), plus haut sommet du nord de l'Algérie. Des gorges profondes et des villages perchés composent ce décor grandiose.",
    desc_en:
      "A land of Chaouïa Berber culture, the Aurès is home to Chélia (2,328 m), the highest peak in northern Algeria. Deep gorges and perched villages complete this grand scenery.",
    image: "aures.jpg",
    lat: 35.28,
    lng: 6.62,
    note: 4.6,
    vedette: false,
  },
  {
    id: 9,
    categorie: "montagne",
    nom_fr: "Chréa",
    nom_en: "Chréa",
    region_fr: "Wilaya de Blida",
    region_en: "Blida Province",
    desc_fr:
      "À 60 km d'Alger, Chréa est une station de montagne dans l'Atlas Blidéen. Ses forêts de cèdres abritent les célèbres singes magots ; l'hiver, elle se transforme en station de ski.",
    desc_en:
      "60 km from Algiers, Chréa is a mountain resort in the Blida Atlas. Its cedar forests shelter the famous Barbary macaques; in winter it becomes a ski resort.",
    image: "chrea.jpg",
    lat: 36.42,
    lng: 2.87,
    note: 4.3,
    vedette: false,
  },

  /* site archeologiques */
  {
    id: 10,
    categorie: "histoire",
    nom_fr: "Timgad",
    nom_en: "Timgad",
    region_fr: "Wilaya de Batna",
    region_en: "Batna Province",
    desc_fr:
      "Fondée par l'Empereur Trajan en 100 apr. J.-C., Timgad est l'une des villes romaines les mieux conservées du monde. Son plan en grille parfaite lui vaut le surnom de « Pompéi de l'Afrique ». Classée UNESCO.",
    desc_en:
      "Founded by Emperor Trajan in 100 AD, Timgad is one of the best-preserved Roman cities in the world. Its perfect grid plan earned it the nickname 'Pompeii of Africa.' UNESCO-listed.",
    image: "timgad.jpg",
    lat: 35.49,
    lng: 6.47,
    note: 4.9,
    vedette: true,
  },
  {
    id: 11,
    categorie: "histoire",
    nom_fr: "Djémila",
    nom_en: "Djémila",
    region_fr: "Wilaya de Sétif",
    region_en: "Sétif Province",
    desc_fr:
      "Perchée à 900 m dans les montagnes, l'ancienne Cuicul romaine conserve un forum, des temples et des arcs de triomphe remarquables. Albert Camus fut fasciné par ses ruines baignées de lumière. Site UNESCO.",
    desc_en:
      "Perched at 900 m in the mountains, the ancient Roman Cuicul preserves a forum, temples and remarkable triumphal arches. Albert Camus was fascinated by its sun-bathed ruins. UNESCO site.",
    image: "djemila.jpg",
    lat: 36.32,
    lng: 5.74,
    note: 4.8,
    vedette: false,
  },
  {
    id: 12,
    categorie: "histoire",
    nom_fr: "Tipaza",
    nom_en: "Tipaza",
    region_fr: "Wilaya de Tipaza",
    region_en: "Tipaza Province",
    desc_fr:
      "Sur la côte méditerranéenne, les ruines romano-phéniciennes de Tipaza se mêlent aux vagues. Ce site inspira Camus qui écrivit : « Ici, je comprends ce qu'on appelle la gloire. » Site UNESCO.",
    desc_en:
      "On the Mediterranean coast, Tipaza's Romano-Phoenician ruins blend with the waves. The site inspired Camus who wrote: 'Here I understand what glory means.' UNESCO site.",
    image: "tipaza.jpg",
    lat: 36.59,
    lng: 2.44,
    note: 4.7,
    vedette: false,
  },

  /* ville historiques */
  {
    id: 13,
    categorie: "ville",
    nom_fr: "Constantine",
    nom_en: "Constantine",
    region_fr: "Wilaya de Constantine",
    region_en: "Constantine Province",
    desc_fr:
      "Construite sur un plateau rocheux traversé par les gorges du Rhummel, Constantine est la « Ville des Ponts ». Ses sept ponts suspendus au-dessus du gouffre en font l'une des villes les plus spectaculaires du monde.",
    desc_en:
      "Built on a rocky plateau split by the Rhummel gorge, Constantine is the 'City of Bridges.' Its seven bridges suspended over the chasm make it one of the world's most spectacular cities.",
    image: "constantine.jpg",
    lat: 36.37,
    lng: 6.61,
    note: 4.8,
    vedette: true,
  },
  {
    id: 14,
    categorie: "ville",
    nom_fr: "Tlemcen",
    nom_en: "Tlemcen",
    region_fr: "Wilaya de Tlemcen",
    region_en: "Tlemcen Province",
    desc_fr:
      "Surnommée la « Perle de l'Occident », Tlemcen est la plus importante ville islamique médiévale d'Algérie. Ses mosquées, minarets et les ruines du palais de Mansourah témoignent d'un riche passé andalou.",
    desc_en:
      "Nicknamed the 'Pearl of the West,' Tlemcen is Algeria's most important medieval Islamic city. Its mosques, minarets and the ruins of Mansourah palace reflect a rich Andalusian past.",
    image: "tlemcen.jpg",
    lat: 34.88,
    lng: -1.32,
    note: 4.7,
    vedette: false,
  },
  {
    id: 15,
    categorie: "ville",
    nom_fr: "Casbah d'Alger",
    nom_en: "Casbah of Algiers",
    region_fr: "Alger",
    region_en: "Algiers",
    desc_fr:
      "Dédale de ruelles, de maisons ottomanes et de palais surplombant la Méditerranée, la Casbah d'Alger est un site du patrimoine mondial. Elle a inspiré peintres et poètes depuis des siècles.",
    desc_en:
      "A maze of alleyways, Ottoman houses and palaces overlooking the Mediterranean, the Casbah of Algiers is a World Heritage Site. It has inspired painters and poets for centuries.",
    image: "casbah.jpg",
    lat: 36.79,
    lng: 3.06,
    note: 4.6,
    vedette: false,
  },

  /* oasis */
  {
    id: 16,
    categorie: "oasis",
    nom_fr: "Ghardaïa (Vallée du M'Zab)",
    nom_en: "Ghardaïa (M'Zab Valley)",
    region_fr: "Wilaya de Ghardaïa",
    region_en: "Ghardaïa Province",
    desc_fr:
      "La vallée du M'Zab abrite cinq ksour (cités fortifiées) bâtis au Xe siècle par les Ibadites. Ces villages en forme de pentagone surgissant de la plaine désertique sont classés au patrimoine mondial.",
    desc_en:
      "The M'Zab valley holds five ksour (fortified cities) built in the 10th century by the Ibadites. These pentagonal villages rising from the desert plain are listed as a World Heritage Site.",
    image: "ghardaia.jpg",
    lat: 32.49,
    lng: 3.67,
    note: 4.8,
    vedette: true,
  },
  {
    id: 17,
    categorie: "oasis",
    nom_fr: "Timimoun",
    nom_en: "Timimoun",
    region_fr: "Wilaya d'Adrar",
    region_en: "Adrar Province",
    desc_fr:
      "L'« Oasis Rouge » : ses maisons en pisé rouge ocre, ses palmeraies et le lac salé qui l'entoure forment un tableau d'une beauté rare. L'architecture soudano-saharienne de Timimoun est unique en son genre.",
    desc_en:
      "The 'Red Oasis': its ochre-red mud-brick houses, palm groves and surrounding salt lake form a picture of rare beauty. Timimoun's Sudano-Saharan architecture is unique.",
    image: "timimoun.jpg",
    lat: 29.26,
    lng: 0.24,
    note: 4.7,
    vedette: false,
  },
  {
    id: 18,
    categorie: "oasis",
    nom_fr: "Béni Abbès",
    nom_en: "Béni Abbès",
    region_fr: "Wilaya de Béchar",
    region_en: "Béchar Province",
    desc_fr:
      "À la lisière du Grand Erg Occidental, Béni Abbès est une oasis pittoresque où les bâtiments blancs et les palmiers-dattiers tranchent sur les dunes d'or. Un havre de paix en plein Sahara.",
    desc_en:
      "On the edge of the Grand Erg Occidental, Béni Abbès is a picturesque oasis where white buildings and date palms stand out against golden dunes. A haven of peace in the middle of the Sahara.",
    image: "beni_abbes.jpg",
    lat: 30.13,
    lng: -2.17,
    note: 4.6,
    vedette: false,
  },

  /* nature parc */
  {
    id: 19,
    categorie: "nature",
    nom_fr: "Parc National de Taza",
    nom_en: "Taza National Park",
    region_fr: "Wilaya de Jijel",
    region_en: "Jijel Province",
    desc_fr:
      "Là où la montagne rencontre la mer. Le parc de Taza mêle forêts de chênes zéens, gorges fluviales et une magnifique baie méditerranéenne. Les dauphins y sont régulièrement observés.",
    desc_en:
      "Where the mountain meets the sea. Taza park blends zeen oak forests, river gorges and a magnificent Mediterranean bay. Dolphins are regularly spotted here.",
    image: "parc_taza.jpg",
    lat: 36.87,
    lng: 5.67,
    note: 4.7,
    vedette: false,
  },
  {
    id: 20,
    categorie: "nature",
    nom_fr: "Parc National d'El Kala",
    nom_en: "El Kala National Park",
    region_fr: "Wilaya d'El Tarf",
    region_en: "El Tarf Province",
    desc_fr:
      "Le parc le plus riche en biodiversité d'Algérie : forêts de chênes-lièges, lagunes côtières accueillant les flamants roses, et der­nières zones humides méditerranéennes préservées.",
    desc_en:
      "Algeria's most biodiverse park: cork oak forests, coastal lagoons hosting flamingos, and the last preserved Mediterranean wetlands.",
    image: "el_kala.jpg",
    lat: 36.89,
    lng: 8.44,
    note: 4.6,
    vedette: false,
  },
  {
    id: 21,
    categorie: "nature",
    nom_fr: "Parc National de Gouraya",
    nom_en: "Gouraya National Park",
    region_fr: "Wilaya de Béjaïa",
    region_en: "Béjaïa Province",
    desc_fr:
      "Le cap Carbon et le mont Gouraya dominent la Méditerranée. Forêts denses, falaises vertigineuses, singes magots et vues spectaculaires sur Béjaïa font de ce parc un joyau côtier.",
    desc_en:
      "Cap Carbon and Mount Gouraya dominate the Mediterranean. Dense forests, vertiginous cliffs, Barbary macaques and spectacular views over Béjaïa make this park a coastal gem.",
    image: "gouraya.jpg",
    lat: 36.77,
    lng: 5.1,
    note: 4.7,
    vedette: false,
  },

  /* gorges et canyons */
  {
    id: 22,
    categorie: "gorges",
    nom_fr: "Gorges de la Chiffa",
    nom_en: "Gorges de la Chiffa",
    region_fr: "Wilaya de Blida",
    region_en: "Blida Province",
    desc_fr:
      "La rivière Chiffa a sculpté un canyon sauvage dans l'Atlas Blidéen. C'est l'habitat naturel de la seule colonie de singes magots sauvages d'Algérie. À 60 km d'Alger, facile d'accès.",
    desc_en:
      "The Chiffa river carved a wild canyon in the Blida Atlas. It's the natural habitat of Algeria's only wild Barbary macaque colony. Just 60 km from Algiers, easy to reach.",
    image: "chiffa.jpg",
    lat: 36.43,
    lng: 2.61,
    note: 4.5,
    vedette: false,
  },
  {
    id: 23,
    categorie: "gorges",
    nom_fr: "Gorges de Kerrata",
    nom_en: "Gorges de Kerrata",
    region_fr: "Wilaya de Béjaïa",
    region_en: "Béjaïa Province",
    desc_fr:
      "La Soummam coule entre des falaises calcaires vertigineuses, créant cascades et vasques d'émeraude. L'un des plus beaux canyons d'Algérie, dans un cadre forestier exceptionnel.",
    desc_en:
      "The Soummam river flows between vertiginous limestone cliffs, creating waterfalls and emerald pools. One of Algeria's most beautiful canyons, in an exceptional forest setting.",
    image: "gorges_kerrata.jpg",
    lat: 36.47,
    lng: 5.54,
    note: 4.6,
    vedette: false,
  },
  {
    id: 24,
    categorie: "gorges",
    nom_fr: "Gorges du Rhummel",
    nom_en: "Gorges du Rhummel",
    region_fr: "Constantine",
    region_en: "Constantine",
    desc_fr:
      "Le canyon qui divise Constantine en deux plateaux. Sept ponts historiques le franchissent à des hauteurs vertigineuses, créant l'un des paysages urbains les plus saisissants du monde.",
    desc_en:
      "The canyon that splits Constantine in two. Seven historic bridges cross it at dizzying heights, creating one of the world's most striking urban landscapes.",
    image: "gorges_rhummel.jpg",
    lat: 36.37,
    lng: 6.61,
    note: 4.8,
    vedette: true,
  },

  /* cultures et traditons */
  {
    id: 25,
    categorie: "culture",
    nom_fr: "Oran — Vieille Ville",
    nom_en: "Oran — Old City",
    region_fr: "Wilaya d'Oran",
    region_en: "Oran Province",
    desc_fr:
      "Berceau du raï, Oran est une ville vibrante aux influences espagnoles et ottomanes. Le fort Santa Cruz, le vieux port et les ruelles animées témoignent d'un riche passé méditerranéen.",
    desc_en:
      "Birthplace of raï music, Oran is a vibrant city with Spanish and Ottoman influences. Fort Santa Cruz, the old port and lively alleyways reflect a rich Mediterranean past.",
    image: "oran.jpg",
    lat: 35.7,
    lng: -0.63,
    note: 4.5,
    vedette: false,
  },
  {
    id: 26,
    categorie: "culture",
    nom_fr: "Béni Yenni",
    nom_en: "Béni Yenni",
    region_fr: "Wilaya de Tizi Ouzou",
    region_en: "Tizi Ouzou Province",
    desc_fr:
      "Village kabyle perché dans les hauteurs, Béni Yenni est réputé dans toute l'Afrique du Nord pour ses bijoux en argent et corail. Les artisans y perpétuent un savoir-faire millénaire.",
    desc_en:
      "A Kabyle village perched in the heights, Béni Yenni is renowned throughout North Africa for its silver and coral jewellery. Craftsmen there continue an age-old tradition.",
    image: "beni_yenni.jpg",
    lat: 36.52,
    lng: 4.14,
    note: 4.5,
    vedette: false,
  },
  {
    id: 27,
    categorie: "culture",
    nom_fr: "Tamanrasset & Fête du Sahara",
    nom_en: "Tamanrasset & Saharan Festival",
    region_fr: "Wilaya de Tamanrasset",
    region_en: "Tamanrasset Province",
    desc_fr:
      "Capitale du Hoggar et carrefour des cultures touarègues, Tamanrasset accueille chaque année un festival qui célèbre la musique, l'artisanat et les traditions des peuples du désert.",
    desc_en:
      "Capital of the Hoggar and crossroads of Tuareg cultures, Tamanrasset hosts an annual festival celebrating the music, crafts and traditions of the desert peoples.",
    image: "tamanrasset.jpg",
    lat: 22.79,
    lng: 5.53,
    note: 4.6,
    vedette: false,
  },
];

// gestion des utilisateurs (localStorage + quelques comptes de test)

const USERS_BASE = [
  {
    nom: "Admin",
    prenom: "Site",
    email: "admin@dzairtravel.dz",
    motDePasse: "Admin123!",
  },
  {
    nom: "Amine",
    prenom: "K.",
    email: "amine@mail.com",
    motDePasse: "Amine123",
  },
  { nom: "Sara", prenom: "B.", email: "sara@mail.com", motDePasse: "Sara1234" },
];

function tousLesUtilisateurs() {
  const inscrits = JSON.parse(
    localStorage.getItem("utilisateursInscrits") || "[]",
  );
  return USERS_BASE.concat(inscrits);
}

function enregistrerUtilisateur(user) {
  const inscrits = JSON.parse(
    localStorage.getItem("utilisateursInscrits") || "[]",
  );
  inscrits.push(user);
  localStorage.setItem("utilisateursInscrits", JSON.stringify(inscrits));
}

function utilisateurConnecte() {
  return JSON.parse(localStorage.getItem("utilisateurConnecte") || "null");
}

function deconnecter() {
  localStorage.removeItem("utilisateurConnecte");
}
