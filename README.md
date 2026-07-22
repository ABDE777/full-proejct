# Registre des Appels - Full Stack Application

Application complète pour la gestion des appels sinistre auto avec frontend et backend déployés ensemble sur Netlify.

## Structure du projet

```
enregistre-appel/
├── frontend/           # Application frontend (HTML/CSS/JS)
├── registre-code/       # API Backend (Express + Supabase)
├── netlify/            # Configuration Netlify Functions
│   └── functions/
│       └── api.js      # Wrapper pour Netlify Functions
├── netlify.toml        # Configuration Netlify
├── package.json        # Dépendances racine
└── .gitignore          # Fichiers ignorés par Git
```

## Prérequis

- Node.js 18+
- Compte Supabase avec base de données configurée
- Compte Netlify

## Configuration locale

1. Cloner le repository
2. Installer les dépendances:
```bash
npm install
```

3. Configurer les variables d'environnement dans `registre-code/.env`:
```
SUPABASE_URL=votre_url_supabase
SUPABASE_SECRET_KEY=votre_cle_secrete_supabase
JWT_SECRET=votre_secret_jwt
```

4. Lancer le serveur de développement:
```bash
npm run dev
```

## Déploiement sur Netlify

### Méthode 1: Via l'interface Netlify

1. Connectez-vous à [Netlify](https://app.netlify.com)
2. Cliquez sur "Add new site" → "Import an existing project"
3. Connectez votre compte GitHub
4. Sélectionnez ce repository
5. Configurez les paramètres de build:
   - **Build command**: (laisser vide)
   - **Publish directory**: `frontend`
   - **Functions directory**: `netlify/functions`

6. Ajoutez les variables d'environnement dans "Site settings" → "Environment variables":
   - `SUPABASE_URL`
   - `SUPABASE_SECRET_KEY`
   - `JWT_SECRET`

7. Cliquez sur "Deploy site"

### Méthode 2: Via Netlify CLI

1. Installer Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Se connecter:
```bash
netlify login
```

3. Initialiser le site:
```bash
netlify init
```

4. Déployer:
```bash
netlify deploy --prod
```

## Architecture

- **Frontend**: Application HTML/CSS/JS statique servie depuis le dossier `frontend`
- **Backend**: API Express convertie en Netlify Function via `@netlify/serverless-http`
- **Base de données**: Supabase (PostgreSQL)
- **Authentification**: JWT avec bcrypt pour le hachage des mots de passe

## Routes API

Toutes les routes API sont accessibles via `/api/*`:

- `GET /api/status` - Health check
- `GET /api/auth/users` - Liste des utilisateurs
- `POST /api/auth/login` - Connexion
- `GET /api/entries` - Liste des appels
- `POST /api/entries` - Créer un appel
- `PUT /api/entries/:id` - Modifier un appel
- `POST /api/entries/batch` - Import en masse
- `GET /api/agents` - Liste des agents (admin)
- `POST /api/agents` - Créer un agent (admin)
- `DELETE /api/agents/:name` - Supprimer un agent (admin)
- `PUT /api/agents/:name` - Modifier un agent (admin)
- Et plus...

## Sécurité

- Rate limiting sur les routes sensibles
- CORS configuré
- Security headers (X-Content-Type-Options, X-Frame-Options, etc.)
- Authentification JWT requise pour la plupart des routes
- Rôles admin/agent avec permissions différenciées

## Support

Pour toute question ou problème, veuillez ouvrir une issue sur GitHub.
