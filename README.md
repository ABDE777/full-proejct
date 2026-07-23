# Registre des Appels - Full Stack Application

Application complète pour la gestion des appels sinistre auto avec frontend et backend déployés ensemble sur Netlify.

## Nouvelles fonctionnalités

### Sécurité
- **Validation PIN administrateur** : Toutes les opérations CRUD sur les comptes (agents/admins) nécessitent une validation par PIN (2026)
- **Authentification JWT** avec bcrypt pour le hachage des mots de passe
- **Rôles différenciés** : Admin et Agent avec permissions spécifiques

### Interface utilisateur
- **Responsive design** : Interface optimisée pour mobile et desktop
- **États de chargement** : Indicateurs visuels pour toutes les opérations asynchrones
- **Messages d'erreur améliorés** : Notifications toast pour les erreurs réseau et d'authentification
- **Dialogues de confirmation** : Confirmation avant les actions destructives (suppression de comptes)

### Filtrage et recherche
- **Filtres avancés** :
  - Période (aujourd'hui, cette semaine, ce mois, cette année)
  - Motif d'appel
  - Agent/Compte
  - Type d'appelant (Client/Agent)
  - Plage de dates (début/fin)
  - Recherche par référence
- **Alertes en temps réel** :
  - Références en alerte (références avec appel répété)
  - Dossiers à risque (références avec 2+ codifications sur 30 jours)
  - Pics d'activité par motif

### Export de données
- **Export Excel** : Génération de fichier Excel avec résumé et statistiques
- **Export PDF** : Génération de PDF avec mise en page professionnelle

### Notes administrateur
- **Notes par appel** : Chaque entrée peut avoir sa propre note admin
- **Notes par agent** : Notes personnalisées pour chaque agent
- **Synchronisation** : Sauvegarde automatique dans Supabase

### Tableau de bord
- **Statistiques en temps réel** :
  - Appels sur la période
  - Appels aujourd'hui
  - Références en alerte
  - Motif dominant
- **Graphiques professionnels** :
  - Volume horaire des appels
  - Répartition par motif
  - Type d'appelants
  - Évolution quotidienne

## Structure du projet

```
full-proejct/
├── frontend/           # Application frontend (HTML/CSS/JS)
│   ├── index.html      # Interface utilisateur complète
│   └── WAFA-IMA.png    # Logo
├── registre-code/      # API Backend (Express + Supabase)
│   ├── api/
│   │   └── index.js    # Serveur Express avec toutes les routes API
│   ├── .env            # Variables d'environnement
│   └── package.json    # Dépendances backend
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
ADMIN_PIN=2026
```

4. Lancer le serveur de développement:
```bash
npm run dev
```

## Déploiement sur Netlify

### Via l'interface Netlify

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
   - `ADMIN_PIN`

7. Cliquez sur "Deploy site"

### Via Netlify CLI

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

### Authentification
- `GET /api/auth/users` - Liste des utilisateurs publics
- `POST /api/auth/login` - Connexion
- `POST /api/auth/change-password` - Changement de mot de passe

### Entrées d'appels
- `GET /api/entries` - Liste des appels
- `POST /api/entries` - Créer un appel
- `PUT /api/entries/:id` - Modifier un appel
- `DELETE /api/entries/:id` - Supprimer un appel

### Agents (Admin)
- `GET /api/agents` - Liste des agents
- `POST /api/agents` - Créer un agent (nécessite PIN)
- `DELETE /api/agents/:name` - Supprimer un agent (nécessite PIN)
- `PUT /api/agents/:name` - Modifier un agent (nécessite PIN)

### Administrateurs (Admin)
- `GET /api/admins` - Liste des admins
- `POST /api/admins` - Créer un admin (nécessite PIN)
- `DELETE /api/admins/:name` - Supprimer un admin (nécessite PIN)
- `PUT /api/admins/:name` - Modifier un admin (nécessite PIN)

### Notes (Admin)
- `GET /api/notes` - Récupérer les notes
- `POST /api/notes` - Sauvegarder les notes

### Autres
- `GET /api/status` - Health check
- `GET /api/threshold` - Récupérer le seuil d'alerte
- `POST /api/threshold` - Modifier le seuil d'alerte

## Sécurité

- Rate limiting sur les routes sensibles
- CORS configuré
- Security headers (X-Content-Type-Options, X-Frame-Options, etc.)
- Authentification JWT requise pour la plupart des routes
- Rôles admin/agent avec permissions différenciées
- Validation PIN pour les opérations CRUD sur les comptes
- Variables d'environnement requises (fail-fast si manquantes)

## Support

Pour toute question ou problème, veuillez ouvrir une issue sur GitHub.

