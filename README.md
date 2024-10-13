# AlloMedia - Application de Livraison (Authentification Frontend)

## Description du Projet
Ce projet est la première partie de l'application de livraison AlloMedia, qui inclut les fonctionnalités d'inscription, de connexion, de réinitialisation de mot de passe, et de déconnexion. Le frontend est développé avec React.js et utilise Vite pour un environnement de développement rapide. Il communique avec un backend pour l'authentification via des jetons JWT.

## Fonctionnalités
 **Inscription :** Les nouveaux utilisateurs peuvent s'inscrire en fournissant leurs informations (nom, email, mot de passe).
 **Connexion :** Les utilisateurs enregistrés peuvent se connecter en utilisant leur email et mot de passe. Un jeton JWT est généré et stocké.
 **Réinitialisation de Mot de Passe :** Si un utilisateur oublie son mot de passe, il peut recevoir un lien de réinitialisation par email.
 **Déconnexion :** Les utilisateurs peuvent se déconnecter et le jeton JWT est supprimé.

## Technologies Utilisées
 **React.js :** Pour le développement de l'interface utilisateur.
 **Vite :** Pour un développement rapide et léger.
 **Axios :** Pour les requêtes HTTP vers le backend.
 **React Router Dom :** Pour la gestion de la navigation.
 **Formik ou React Hook Form :** Pour la gestion des formulaires et leur validation.
 **Tailwind CSS :** Pour le design et le style des composants.

## Prérequis
Avant de commencer, assurez-vous d'avoir installé :
 **Node.js** (Version 16 ou plus récente)
 **Docker** (pour la dockerisation)

## Installation
1. Clonez le dépot:
     ```bash
    git clone https://github.com/CHERKAOUIfatimazahra/alloMedia-frontend
    cd alloMedia-frontend
2. Installez les dépendances:
     ```bash
     npm install
3. Créez un fichier .env à la racine du projet pour stocker vos variables d'environnement :
     ```bash
       VITE_APP_BASE_URL=http://localhost:5000/auth
4. Lancez l'application en mode développement :
     ```bash
     npm run dev
   

