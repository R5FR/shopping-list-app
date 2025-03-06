# Liste des Courses

Ce projet est une application web pour gérer une liste de courses. Les utilisateurs peuvent ajouter des articles, les marquer comme prioritaires, les déplacer dans le panier et les supprimer. Les données sont stockées dans un fichier JSON.

## Fonctionnalités

- Ajouter des articles à la liste de courses
- Marquer des articles comme prioritaires
- Déplacer des articles dans le panier
- Supprimer des articles
- Persistance des données dans un fichier JSON

## Prérequis

- Node.js (version 14 ou supérieure)
- npm (version 6 ou supérieure)

## Installation

1. Clonez le dépôt :

    ```sh
    git clone https://github.com/R5FR/shopping-list-app.git
    ```

2. Installez les dépendances :

    ```sh
    npm install
    ```

## Utilisation

1. Démarrez le serveur :

    ```sh
    npm start
    ```

2. Ouvrez votre navigateur et accédez à `http://localhost:3000`.

## Structure du Projet

- [server](http://_vscodecontentref_/0)
  - `models/`
    - `database.js` : Fonctions pour lire et écrire les données dans le fichier JSON.
  - `routes/`
    - `items.js` : Routes API pour gérer les articles.
  - `data.json` : Fichier JSON pour stocker les données.
  - `server.js` : Point d'entrée du serveur Express.
- [client](http://_vscodecontentref_/1)
  - `index.html` : Page HTML principale.
  - `app.js` : Logique côté client pour gérer les interactions avec l'interface utilisateur.
  - `styles.css` : Styles CSS pour l'application.

## API

### Obtenir tous les articles

- **URL** : `/api/items`
- **Méthode** : `GET`
- **Réponse** : Tableau d'articles

### Ajouter un nouvel article

- **URL** : `/api/items`
- **Méthode** : `POST`
- **Corps de la requête** : `{ "name": "Nom de l'article", "priority": true/false }`
- **Réponse** : Article ajouté

### Mettre à jour un article

- **URL** : `/api/items/:id`
- **Méthode** : `PUT`
- **Corps de la requête** : `{ "name": "Nom de l'article", "priority": true/false, "inBasket": true/false }`
- **Réponse** : Article mis à jour

### Supprimer un article

- **URL** : `/api/items/:id`
- **Méthode** : `DELETE`
- **Réponse** : `{ "success": true }`

## Contribution

Les contributions sont les bienvenues ! Veuillez ouvrir une issue ou soumettre une pull request.

## Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.
