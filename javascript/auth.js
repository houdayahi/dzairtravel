"use strict";

// validation des champs par regex
const REGEX_NOM   = /^[a-zA-ZÀ-ÿ\s'-]{2,40}$/;
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const REGEX_MDP   = /^(?=.*[A-Z])(?=.*\d).{8,}$/;   // 8 chars min, 1 maj, 1 chiffre
const REGEX_TEL   = /^(\+213|0)(5|6|7)\d{8}$/;       // numéro algérien

// afficher ou masquer le mot de passe
function toggleMdp(idInput, btn) {
  const input = document.getElementById(idInput);
  if (!input) return;
  const visible = input.type === "text";
  input.type = visible ? "password" : "text";
  btn.textContent = visible ? "👁" : "🙈";
}

// messages de retour utilisateur
function afficherMessage(texte, type) {
  const el = document.getElementById("msg-global");
  if (!el) return;
  el.className   = "message " + type;
  el.textContent = texte;
  el.style.display = "block";
}
function masquerMessage() {
  const el = document.getElementById("msg-global");
  if (el) { el.style.display = "none"; el.className = "message"; }
}

// affiche ou efface une erreur sous un champ
function afficherErreur(idErr, texte) {
  const el = document.getElementById(idErr);
  if (!el) return;
  el.textContent = texte;
  el.style.display = texte ? "block" : "none";
}
function reinitErreurs(...ids) {
  ids.forEach(id => afficherErreur(id, ""));
}

// export csv de tous les inscrits (téléchargement automatique)
function exporterCSV() {
  const tous    = JSON.parse(localStorage.getItem("utilisateursInscrits") || "[]");
  const entetes = ["Nom", "Prenom", "Email", "Telephone", "Date_Inscription"];
  const lignes  = tous.map(u =>
    [u.nom, u.prenom, u.email, u.telephone || "", u.dateInscription || ""].join(",")
  );
  const contenu = [entetes.join(","), ...lignes].join("\n");
  const blob = new Blob(["﻿" + contenu], { type: "text/csv;charset=utf-8;" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = "inscriptions_dzairtravel.csv";
  a.click();
  URL.revokeObjectURL(url);
}

// gestion du formulaire de connexion (page connexion.html)
function initConnexion() {
  const form = document.getElementById("form-connexion");
  if (!form) return;

  // bouton oeil sur le champ mot de passe
  document.getElementById("btn-oeil-co")
    ?.addEventListener("click", function () { toggleMdp("mdp-co", this); });

  form.addEventListener("submit", e => {
    e.preventDefault();
    reinitErreurs("err-email-co", "err-mdp-co");
    masquerMessage();

    const email = document.getElementById("email-co").value.trim().toLowerCase();
    const mdp   = document.getElementById("mdp-co").value;
    let ok = true;

    if (!REGEX_EMAIL.test(email)) {
      afficherErreur("err-email-co",
        langueActuelle === "fr" ? "Format email invalide." : "Invalid email format.");
      ok = false;
    }
    if (mdp.length === 0) {
      afficherErreur("err-mdp-co",
        langueActuelle === "fr" ? "Veuillez saisir votre mot de passe." : "Please enter your password.");
      ok = false;
    }
    if (!ok) return;

    const user = tousLesUtilisateurs().find(u =>
      u.email === email && u.motDePasse === mdp
    );

    if (user) {
      localStorage.setItem("utilisateurConnecte", JSON.stringify(user));
      const msg = langueActuelle === "fr"
        ? `Bienvenue ${user.prenom || user.nom} ! Redirection...`
        : `Welcome ${user.prenom || user.nom}! Redirecting...`;
      afficherMessage(msg, "succes");
      setTimeout(() => { window.location.href = "destinations.html"; }, 1200);
    } else {
      afficherMessage(
        langueActuelle === "fr" ? "Email ou mot de passe incorrect." : "Incorrect email or password.",
        "erreur"
      );
    }
  });
}

// gestion du formulaire d'inscription (page inscription.html)
function initInscription() {
  const form = document.getElementById("form-inscription");
  if (!form) return;

  // bouton oeil sur le champ mot de passe
  document.getElementById("btn-oeil-ins")
    ?.addEventListener("click", function () { toggleMdp("mdp-ins", this); });

  form.addEventListener("submit", e => {
    e.preventDefault();
    reinitErreurs("err-nom", "err-prenom", "err-email-ins", "err-tel", "err-mdp-ins", "err-conf");
    masquerMessage();

    const nom    = document.getElementById("nom-ins").value.trim();
    const prenom = document.getElementById("prenom-ins").value.trim();
    const email  = document.getElementById("email-ins").value.trim().toLowerCase();
    const tel    = document.getElementById("tel-ins").value.trim();
    const mdp    = document.getElementById("mdp-ins").value;
    const conf   = document.getElementById("mdp-conf").value;
    const fr     = langueActuelle === "fr";
    let ok = true;

    if (!REGEX_NOM.test(nom)) {
      afficherErreur("err-nom",
        fr ? "Nom invalide (lettres uniquement, 2–40 caractères)."
           : "Invalid last name (letters only, 2–40 chars).");
      ok = false;
    }
    if (!REGEX_NOM.test(prenom)) {
      afficherErreur("err-prenom",
        fr ? "Prénom invalide (lettres uniquement, 2–40 caractères)."
           : "Invalid first name (letters only, 2–40 chars).");
      ok = false;
    }
    if (!REGEX_EMAIL.test(email)) {
      afficherErreur("err-email-ins",
        fr ? "Adresse e-mail invalide." : "Invalid email address.");
      ok = false;
    }
    if (tel && !REGEX_TEL.test(tel)) {
      afficherErreur("err-tel",
        fr ? "Format attendu : 06XXXXXXXX ou 07XXXXXXXX."
           : "Expected format: 06XXXXXXXX or 07XXXXXXXX.");
      ok = false;
    }
    if (!REGEX_MDP.test(mdp)) {
      afficherErreur("err-mdp-ins",
        fr ? "8 caractères minimum, au moins 1 majuscule et 1 chiffre."
           : "At least 8 characters, 1 uppercase and 1 digit.");
      ok = false;
    }
    if (mdp !== conf) {
      afficherErreur("err-conf",
        fr ? "Les deux mots de passe ne correspondent pas."
           : "Passwords do not match.");
      ok = false;
    }
    if (!ok) return;

    if (tousLesUtilisateurs().some(u => u.email === email)) {
      afficherMessage(
        fr ? "Cet e-mail est déjà utilisé. Essayez de vous connecter."
           : "This email is already in use. Try signing in.",
        "erreur"
      );
      return;
    }

    const nouvelUser = {
      nom, prenom, email,
      telephone: tel || null,
      motDePasse: mdp,
      dateInscription: new Date().toLocaleDateString("fr-DZ")
    };
    enregistrerUtilisateur(nouvelUser);
    exporterCSV();

    afficherMessage(
      fr ? `Compte créé pour ${prenom} ${nom} ! Redirection vers la connexion...`
         : `Account created for ${prenom} ${nom}! Redirecting to sign in...`,
      "succes"
    );
    form.reset();

    // redirige vers la page connexion après inscription réussie
    setTimeout(() => { window.location.href = "connexion.html"; }, 1500);
  });
}

// initialisation selon la page ouverte
document.addEventListener("DOMContentLoaded", () => {
  initConnexion();
  initInscription();
});
