"use strict";

// page d'accueil : génère les cartes de catégories et les destinations en vedette

function etoiles(note) {
  const plein = Math.floor(note);
  return "★".repeat(plein) + "☆".repeat(5 - plein) + " " + note.toFixed(1);
}

// grille des 9 catégories
function afficherCategories() {
  const grille = document.getElementById("grille-cats");
  if (!grille) return;

  grille.innerHTML = CATEGORIES.map(cat => {
    const nom = langueActuelle === "fr" ? cat.fr : cat.en;
    const nb  = DESTINATIONS.filter(d => d.categorie === cat.id).length;
    const imgTag = cat.image
      ? `<img src="images/${cat.image}" alt="${nom}" onerror="this.style.display='none'">`
      : "";
    return `
      <a href="content/destinations.html?cat=${cat.id}"
         class="cat-carte" role="listitem"
         aria-label="${nom}">
        ${imgTag}
        <div class="cat-overlay"></div>
        <div class="cat-texte">
          <span class="cat-nom" data-fr="${cat.fr}" data-en="${cat.en}">${nom}</span>
          <span class="cat-count">${nb} destination${nb > 1 ? "s" : ""}</span>
        </div>
      </a>`;
  }).join("");
}

// destinations en vedette (max 6)
function afficherVedettes() {
  const grille = document.getElementById("grille-vedette");
  if (!grille) return;

  const vedettes = DESTINATIONS.filter(d => d.vedette).slice(0, 6);
  const lang = langueActuelle;

  grille.innerHTML = vedettes.map(d => {
    const nom    = lang === "fr" ? d.nom_fr    : d.nom_en;
    const region = lang === "fr" ? d.region_fr : d.region_en;
    const desc   = lang === "fr" ? d.desc_fr   : d.desc_en;
    const cat    = CATEGORIES.find(c => c.id === d.categorie);
    const etiq   = cat ? (lang === "fr" ? cat.fr : cat.en) : d.categorie;

    return `
      <article class="carte" data-cat="${d.categorie}" role="listitem">
        <img class="carte-img"
             src="images/${d.image}"
             alt="${nom}"
             loading="lazy"
             onerror="this.style.display='none'">
        <div class="carte-corps">
          <span class="carte-etiquette">${etiq}</span>
          <h3>${nom}</h3>
          <p class="carte-region">📍 ${region}</p>
          <p class="carte-desc">${desc}</p>
          <p class="carte-note">${etoiles(d.note)}</p>
          <div class="carte-actions">
            <a href="content/destinations.html?id=${d.id}" class="btn-carte primaire"
               data-fr="Voir plus" data-en="See more">Voir plus</a>
          </div>
        </div>
      </article>`;
  }).join("");
}

// re-générer quand la langue change
document.addEventListener("langueChange", () => {
  afficherCategories();
  afficherVedettes();
});

document.addEventListener("DOMContentLoaded", () => {
  afficherCategories();
  afficherVedettes();
});
