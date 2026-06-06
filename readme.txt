
  DZAIR TRAVEL - Guide touristique de l'Algerie
  Projet : Developpement d'Applications Web
  Universite Mouloud MAMMERI de Tizi-Ouzou - 2025/2026

 DESCRIPTION DU SITE 
Dzair Travel est un mini-site web (sans backend) presentant
un guide touristique de l'Algerie. Il permet de :
  - Decouvrir l'Algerie et ses 9 categories de destinations
  - Parcourir toutes les destinations avec un filtrage par
    categorie cote client
  - Cliquer sur une destination pour ouvrir une fenetre
    (modale) affichant une image, une description, un systeme
    de notation par etoiles et des commentaires
  - S'inscrire et se connecter (authentification simulee)
  - Commenter une destination uniquement si l'on est connecte
  - Activer/desactiver le MODE SOMBRE (bouton lune/soleil)

 INSTRUCTIONS D'UTILISATION 
1. Ouvrir le fichier "index.html" dans un navigateur web.
2. Naviguer via le menu present sur toutes les pages.
3. Une fois connecte, ouvrir une destination puis ajouter
   une note (etoiles) et un commentaire.
4. Le bouton en haut a droite active le mode sombre ;

 DETAILS TECHNIQUES
  - HTML5 semantique (header, nav, main, section, footer)
  - CSS externe unique (style/style.css), site responsive
  - JavaScript externe, donnees produits dans un tableau JS
  - Validation des formulaires par expressions regulieres
  - localStorage pour la session, les notes et commentaires
  - Filtrage des categories 100% cote client (aucune page
    HTML par categorie)

 STRUCTURE DES FICHIERS 
  index.html
  content      -> destinations.html,
                   inscription.html,
                   connexion.html,
                   auth.html
  style       -> destination.css,
                   connexion.css,
                   inscription.css,
                   index.css,
                   auth.css,
  javascript  -> donnees.js,
                   commun.js,
                   accueil.js,
                   destinations.js,
                   auth.js
  images       -> (dossier pour les imagess),
  readme.txt

 MEMBRES DU GROUPE 
  YAHI Houda
  GRIM Dounia
  AKHROUF Yanis
