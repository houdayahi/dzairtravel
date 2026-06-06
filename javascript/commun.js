"use strict";

// script commun chargé sur toutes les pages

// thème clair / sombre

function appliquerTheme() {
  const t = localStorage.getItem("theme") || "clair";
  if (t === "sombre") document.body.classList.add("sombre");
}

function basculerTheme() {
  document.body.classList.toggle("sombre");
  const estSombre = document.body.classList.contains("sombre");
  localStorage.setItem("theme", estSombre ? "sombre" : "clair");
  majBoutonTheme();
}

function majBoutonTheme() {
  const btn = document.getElementById("btn-theme");
  if (btn)
    btn.textContent = document.body.classList.contains("sombre") ? "☀️" : "🌙";
}

// langue fr / en
let langueActuelle = localStorage.getItem("langue") || "fr";

function appliquerLangue(lang) {
  langueActuelle = lang;
  localStorage.setItem("langue", lang);
  document.documentElement.lang = lang;

  // met à jour tous les éléments qui ont data-fr / data-en
  document.querySelectorAll("[data-fr]").forEach((el) => {
    const val = lang === "fr" ? el.dataset.fr : el.dataset.en;
    if (val === undefined) return;
    if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
      el.placeholder = val;
    } else {
      el.textContent = val;
    }
  });

  majBoutonLangue();
  // on prévient les autres scripts qu'il faut re-générer le contenu dynamique
  document.dispatchEvent(new CustomEvent("langueChange", { detail: { lang } }));
}

function basculerLangue() {
  appliquerLangue(langueActuelle === "fr" ? "en" : "fr");
}

function majBoutonLangue() {
  const btn = document.getElementById("btn-langue");
  if (btn) btn.textContent = langueActuelle === "fr" ? "EN" : "FR";
}

//navbar qui se cache au défilement et sidebar

function initNav() {
  const navbar = document.getElementById("navbar");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebar-overlay");
  const btnOuvrir = document.getElementById("btn-sidebar");
  const btnFermer = document.getElementById("btn-fermer-sidebar");

  if (!navbar || !sidebar) return;

  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > 80) {
        document.body.classList.add("scrolled");
      } else {
        document.body.classList.remove("scrolled");
        document.body.classList.remove("sidebar-ouvert");
      }
    },
    { passive: true },
  );

  if (btnOuvrir) {
    btnOuvrir.addEventListener("click", () => {
      document.body.classList.toggle("sidebar-ouvert");
    });
  }

  function fermerSidebar() {
    document.body.classList.remove("sidebar-ouvert");
  }

  if (btnFermer) btnFermer.addEventListener("click", fermerSidebar);
  if (overlay) overlay.addEventListener("click", fermerSidebar);
}

//  zone utilisateur (connecté ou lien connexion)

function majMenuSession() {
  const zone = document.getElementById("zone-session");
  const zoneSb = document.getElementById("zone-session-sidebar");
  const user = utilisateurConnecte();

  [zone, zoneSb].forEach((z) => {
    if (!z) return;
    if (user) {
      const initiales = (user.prenom[0] + user.nom[0]).toUpperCase();
      z.innerHTML = `<span class="badge-user">${initiales}</span>
         <span class="nom-user">${user.prenom}</span>
         <button class="btn-deco"
           data-fr="Déconnexion" data-en="Logout"
           id="btn-deco-${z.id}">Déconnexion</button>`;
      document
        .getElementById("btn-deco-" + z.id)
        .addEventListener("click", () => {
          deconnecter();
          const estContent =
            window.location.pathname.indexOf("/content/") !== -1;
          window.location.href = estContent ? "../index.html" : "index.html";
        });
    } else {
      const href =
        window.location.pathname.indexOf("/content/") !== -1
          ? "connexion.html"
          : "content/connexion.html";
      z.innerHTML = `<a href="${href}" class="lien-auth">
           <span data-fr="Connexion / Inscription" data-en="Sign In / Sign Up">Connexion / Inscription</span>
         </a>`;
    }
  });
}

// initialisation

document.addEventListener("DOMContentLoaded", () => {
  appliquerTheme();
  majBoutonTheme();
  appliquerLangue(langueActuelle);
  initNav();
  majMenuSession();

  document.getElementById("btn-theme").addEventListener("click", basculerTheme);
  document
    .getElementById("btn-langue")
    .addEventListener("click", basculerLangue);

  // mêmes boutons dans la sidebar
  document
    .getElementById("btn-theme-sb")
    .addEventListener("click", basculerTheme);
  document
    .getElementById("btn-langue-sb")
    .addEventListener("click", basculerLangue);
});
