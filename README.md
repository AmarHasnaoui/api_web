# API Web Service

Ce projet est une API web développée en Node.js avec Express et Mongoose. Elle est structurée autour de trois modules principaux :

- `users`
- `posts`
- `likes`

Chaque module possède sa propre structure (routes, models, controller, etc.), et un point d’entrée (`index_*.js`) permet de les lancer indépendamment.

---

## Structure du projet
```bash
api_web/
├── likes/
| ├── index_likes.js
│ ├── controller/
│ │ └── likeController.js
│ ├── lib/
│ │ └── sendError.js
│ ├── models/
│ │ └── likes.js
│ └── routes/
│ ├── likes.js
│ └── main.js
├── users/
│ └── ... (même structure que likes)
├── posts/
│ └── ... (même structure que likes)
├── .env
├── .env_glob
└── README.md
```

## Démarrage

### 1. Installer les dépendances

```bash
npm install
npm install concurrently --save-dev
```

### 2. Lancer les modules

```bash
npm run start-all
```

## Remarques
Les routes de chaque module sont définies dans leurs propres répertoires (routes/).
Chaque module peut fonctionner indépendamment sur un port différent (ex: users sur 3000, likes sur 3002, etc.).
