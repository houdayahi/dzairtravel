"use strict";

// page destinations : filtrage, recherche, modale et carte GPS

let filtreActif = "tous";
let texteRecherche = "";

function etoiles(note) {
  const plein = Math.floor(note);
  return "★".repeat(plein) + "☆".repeat(5 - plein) + " " + note.toFixed(1);
}

// génère les boutons de filtre par catégorie
function rendreFiltres() {
  const zone = document.getElementById("filtres");
  if (!zone) return;
  const lang = langueActuelle;

  const tousLabel = lang === "fr" ? "Tout" : "All";
  zone.innerHTML = `<button class="filtre${filtreActif === "tous" ? " actif" : ""}"
    onclick="changerFiltre('tous')">${tousLabel}</button>`;

  CATEGORIES.forEach((cat) => {
    const nom = lang === "fr" ? cat.fr : cat.en;
    zone.innerHTML += `<button class="filtre${filtreActif === cat.id ? " actif" : ""}"
      onclick="changerFiltre('${cat.id}')">${nom}</button>`;
  });
}

// filtre les destinations et met à jour la grille
function rendreDestinations() {
  const grille = document.getElementById("grille-destinations");
  const msgVide = document.getElementById("msg-vide");
  const compteur = document.getElementById("compteur");
  if (!grille) return;

  const lang = langueActuelle;
  const rechercheLower = texteRecherche.toLowerCase();

  const liste = DESTINATIONS.filter((d) => {
    const correspondCat = filtreActif === "tous" || d.categorie === filtreActif;
    const nom = (lang === "fr" ? d.nom_fr : d.nom_en).toLowerCase();
    const desc = (lang === "fr" ? d.desc_fr : d.desc_en).toLowerCase();
    const reg = (lang === "fr" ? d.region_fr : d.region_en).toLowerCase();
    const correspondRecherche =
      !rechercheLower ||
      nom.includes(rechercheLower) ||
      desc.includes(rechercheLower) ||
      reg.includes(rechercheLower);
    return correspondCat && correspondRecherche;
  });

  // compteur de résultats
  if (compteur) {
    const txt =
      lang === "fr"
        ? `${liste.length} destination${liste.length !== 1 ? "s" : ""} trouvée${liste.length !== 1 ? "s" : ""}`
        : `${liste.length} destination${liste.length !== 1 ? "s" : ""} found`;
    compteur.textContent = txt;
  }

  // message si aucun résultat
  if (msgVide) msgVide.style.display = liste.length === 0 ? "block" : "none";

  grille.innerHTML = liste
    .map((d) => {
      const nom = lang === "fr" ? d.nom_fr : d.nom_en;
      const region = lang === "fr" ? d.region_fr : d.region_en;
      const desc = lang === "fr" ? d.desc_fr : d.desc_en;
      const cat = CATEGORIES.find((c) => c.id === d.categorie);
      const etiq = cat ? (lang === "fr" ? cat.fr : cat.en) : d.categorie;
      const voirTxt = lang === "fr" ? "Détails & carte" : "Details & map";

      return `
      <article class="carte" data-cat="${d.categorie}" role="listitem">
        <img class="carte-img"
             src="../images/${d.image}"
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
            <button class="btn-carte primaire"
                    onclick="ouvrirModale(${d.id})">${voirTxt}</button>
          </div>
        </div>
      </article>`;
    })
    .join("");
}

function changerFiltre(id) {
  filtreActif = id;
  rendreFiltres();
  rendreDestinations();
}

//  gestion des commentaires (stockés dans localStorage par destination)

function chargerCommentaires(idDest) {
  return JSON.parse(localStorage.getItem("commentaires_" + idDest) || "[]");
}

function sauvegarderCommentaire(idDest, texte) {
  const user = utilisateurConnecte();
  if (!user || !texte.trim()) return false;
  const initiales = (
    (user.prenom || "?")[0] + (user.nom || "?")[0]
  ).toUpperCase();
  const liste = chargerCommentaires(idDest);
  liste.push({
    auteur: user.prenom + " " + user.nom,
    initiales,
    texte: texte.trim(),
    date: new Date().toLocaleDateString("fr-DZ"),
  });
  localStorage.setItem("commentaires_" + idDest, JSON.stringify(liste));
  return true;
}

function afficherCommentaires(idDest) {
  const conteneur = document.getElementById("liste-commentaires");
  if (!conteneur) return;
  const liste = chargerCommentaires(idDest);
  const lang = langueActuelle;

  if (liste.length === 0) {
    conteneur.innerHTML = `<p class="commentaires-vide">${
      lang === "fr" ? "Aucun commentaire pour l'instant." : "No comments yet."
    }</p>`;
    return;
  }

  conteneur.innerHTML = liste
    .map(
      (c) => `
    <div class="commentaire">
      <div class="commentaire-header">
        <div class="commentaire-badge">${c.initiales}</div>
        <span class="commentaire-auteur">${c.auteur}</span>
        <span class="commentaire-date">${c.date}</span>
      </div>
      <p class="commentaire-texte">${c.texte}</p>
    </div>`,
    )
    .join("");
}

function afficherZoneAjout(idDest) {
  const zone = document.getElementById("zone-ajout-commentaire");
  if (!zone) return;
  const user = utilisateurConnecte();
  const lang = langueActuelle;

  if (user) {
    // utilisateur connecté : formulaire de saisie
    zone.innerHTML = `
      <div class="form-commentaire">
        <textarea id="textarea-commentaire"
                  placeholder="${lang === "fr" ? "Partagez votre avis sur ce lieu..." : "Share your thoughts about this place..."}"
                  aria-label="${lang === "fr" ? "Votre commentaire" : "Your comment"}"></textarea>
        <button type="button" class="btn-publier" id="btn-publier">
          ${lang === "fr" ? "Publier" : "Post"}
        </button>
      </div>`;

    document.getElementById("btn-publier").addEventListener("click", () => {
      const ta = document.getElementById("textarea-commentaire");
      const texte = ta ? ta.value : "";
      if (!texte.trim()) return;
      sauvegarderCommentaire(idDest, texte);
      afficherCommentaires(idDest);
      if (ta) ta.value = "";
    });
  } else {
    // non connecté : invitation à se connecter
    zone.innerHTML = `
      <div class="connexion-requise">
        ${lang === "fr" ? "Connectez-vous pour laisser un commentaire" : "Sign in to leave a comment"}
        &nbsp;—&nbsp;
        <a href="connexion.html">${lang === "fr" ? "Se connecter" : "Sign In"}</a>
        &nbsp;/&nbsp;
        <a href="inscription.html">${lang === "fr" ? "S'inscrire" : "Register"}</a>
      </div>`;
  }
}

// ouvre la modale avec les détails de la destination et la carte OSM
function ouvrirModale(idDest) {
  const dest = DESTINATIONS.find((d) => d.id === idDest);
  if (!dest) return;
  const lang = langueActuelle;

  const nom = lang === "fr" ? dest.nom_fr : dest.nom_en;
  const region = lang === "fr" ? dest.region_fr : dest.region_en;
  const desc = lang === "fr" ? dest.desc_fr : dest.desc_en;
  const cat = CATEGORIES.find((c) => c.id === dest.categorie);
  const etiq = cat ? (lang === "fr" ? cat.fr : cat.en) : dest.categorie;

  const img = document.getElementById("m-image");
  img.src = `../images/${dest.image}`;
  img.alt = nom;
  img.style.display = "block";
  img.onerror = () => {
    img.style.display = "none";
  };

  document.getElementById("m-etiq").textContent = etiq;
  document.getElementById("m-nom").textContent = nom;
  document.getElementById("m-region").textContent = "📍 " + region;
  document.getElementById("m-note").textContent =
    "★ " + dest.note.toFixed(1) + " / 5";
  document.getElementById("m-desc").textContent = desc;

  // lien OpenStreetMap externe
  const osmUrl = `https://www.openstreetmap.org/?mlat=${dest.lat}&mlon=${dest.lng}#map=10/${dest.lat}/${dest.lng}`;
  const osmLien = document.getElementById("m-osm-lien");
  osmLien.href = osmUrl;
  osmLien.textContent =
    lang === "fr" ? "Ouvrir dans OpenStreetMap ↗" : "Open in OpenStreetMap ↗";

  // carte embarquée
  const delta = 0.5;
  const bbox = `${dest.lng - delta},${dest.lat - delta},${dest.lng + delta},${dest.lat + delta}`;
  document.getElementById("m-carte").src =
    `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${dest.lat},${dest.lng}`;

  document.getElementById("modale").classList.add("ouverte");
  document.body.style.overflow = "hidden";

  // charger les commentaires et la zone d'ajout
  afficherCommentaires(idDest);
  afficherZoneAjout(idDest);
}

function fermerModale() {
  document.getElementById("modale").classList.remove("ouverte");
  document.body.style.overflow = "";
  document.getElementById("m-carte").src = ""; // vider le src pour arrêter le chargement
}

// gestion de la barre de recherche
function initRecherche() {
  const input = document.getElementById("recherche");
  const btn = document.getElementById("btn-recherche");
  if (!input) return;

  input.addEventListener("input", () => {
    texteRecherche = input.value.trim();
    rendreDestinations();
  });
  if (btn)
    btn.addEventListener("click", () => {
      texteRecherche = input.value.trim();
      rendreDestinations();
    });
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      texteRecherche = input.value.trim();
      rendreDestinations();
    }
  });
}

// re-générer quand la langue change
document.addEventListener("langueChange", () => {
  rendreFiltres();
  rendreDestinations();
});

document.addEventListener("DOMContentLoaded", () => {
  // lire les paramètres d'url (?cat=... ou ?id=...)
  const params = new URLSearchParams(window.location.search);
  if (params.get("cat")) filtreActif = params.get("cat");

  rendreFiltres();
  rendreDestinations();
  initRecherche();

  // si un id est passé en url, ouvrir directement la modale
  const idParam = parseInt(params.get("id"), 10);
  if (!isNaN(idParam)) setTimeout(() => ouvrirModale(idParam), 300);

  // fermer la modale
  document
    .getElementById("fermer-modale")
    .addEventListener("click", fermerModale);
  document.getElementById("modale").addEventListener("click", (e) => {
    if (e.target.id === "modale") fermerModale();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") fermerModale();
  });
});
