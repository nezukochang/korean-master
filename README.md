# 🇰🇷 Korean Master (한글 마스터)

> Application web progressive (PWA) moderne, complète et gratuite pour apprendre le coréen de zéro jusqu'à tenir une conversation fluide en société.

Conçue avec **React 19, TypeScript, Vite, Tailwind CSS, Web Speech API et Canvas**, prête pour un hébergement gratuit et haute performance sur **[Render](https://render.com)**.

---

## 🌟 Les 6 Piliers Pédagogiques de l'Application

1. **L'Alphabet Hangeul (한글) & Tracé Calligraphique :**
   - 14 consonnes de base, 5 consonnes doubles/tendues, 10 voyelles simples, 11 diphtongues.
   - Ordre et sens des traits avec guide visuel pas-à-pas.
   - Atelier d'écriture interactif sur Canvas avec détection tactile et souris.
   - Astuces mnémotechniques et audio natif immédiat.

2. **Le Laboratoire d'Assemblage des Syllabes :**
   - Comprenez concrètement comment les Coréens assemblent les lettres en blocs carrés (Consonne Initiale + Voyelle + Finale Batchim).
   - Calcul mathématique et Unicode dynamique en temps réel.
   - Règles d'orientation (voyelles verticales vs horizontales).

3. **Le Moteur Phonétique & les Règles du Batchim (받침) :**
   - La loi des 7 sons représentatifs (pourquoi 7 lettres différentes se prononcent toutes [t]).
   - Les 5 mutations sonores majeures : Liaison (*Yeon-eum*), Nasalisation (*Bi-eum-hwa*), Aspiration (*Gyeok-eum-hwa*), Tension (*Gyeong-eum-hwa*), Palatalisation (*Gu-gae-eum-hwa*).
   - Comparatif audio instantané : Orthographe écrite vs Réellement prononcé.

4. **La Grammaire Vivante & les Particules :**
   - Structure SOV (Sujet - Objet - Verbe) décortiquée.
   - Démystification des particules clés : Thème (`은/는`), Sujet (`이/가`), Objet (`을/를`), Lieu (`에/에서`).
   - Niveaux de politesse : Formel (*Hasipsio-che*), Courant poli (*Haeyo-che*), Familier (*Banmal*).
   - Quiz interactifs de validation avec feedback immédiat.

5. **Le Simulateur de Conversations en Société :**
   - Dialogues réels scénarisés : Commander au café (Iced Americano), restaurant traditionnel (BBQ/Samgyeopsal, appeler le serveur *여기요!*), métro de Séoul & carte T-Money.
   - Notes d'étiquette culturelle coréenne (donner à deux mains, inclinaisons, codes de respect).
   - Défi oral avec reconnaissance vocale intégrée pour tester sa propre prononciation.

6. **L'Entraîneur Quotidien & Mémoire SRS (Spaced Repetition System) :**
   - Algorithme SM-2 / Leitner pour réviser au moment exact où la mémoire s'apprête à fléchir.
   - Cartes mémoire interactives réversibles avec prononciation audio.
   - Possibilité d'ajouter ses propres cartes et expressions personnalisées.
   - Système de flammes (série de jours consécutifs) et points d'expérience (XP).

---

## 🚀 Lancement en Local sur votre Machine

1. **Ouvrir un terminal dans le dossier du projet :**
   ```bash
   cd "C:\Users\FTAB TECH\Documents\korean-master"
   ```

2. **Lancer le serveur de développement :**
   ```bash
   npm run dev
   ```
   L'application s'ouvre instantanément sur `http://localhost:5173`.

3. **Générer le build de production optimisé :**
   ```bash
   npm run build
   ```
   Les fichiers prêts pour le déploiement sont créés dans le dossier `dist/`.

---

## 🌐 Déploiement Gratuit sur Render (Étape par Étape)

Render permet d'héberger l'application sous forme de **Static Site** gratuitement, avec HTTPS automatique, CDN mondial et renouvellement instantané à chaque mise à jour.

### Méthode la plus simple (via GitHub / GitLab) :

1. **Créer un dépôt sur GitHub** et y envoyer le code du projet :
   ```bash
   git init
   git add .
   git commit -m "Initial commit Korean Master PWA"
   git remote add origin https://github.com/VOTRE_PSEUDO/korean-master.git
   git branch -M main
   git push -u origin main
   ```

2. **Se connecter sur [render.com](https://render.com) :**
   - Cliquez sur le bouton bleu **New +** en haut à droite.
   - Sélectionnez **Static Site**.
   - Connectez votre compte GitHub et choisissez le dépôt `korean-master`.

3. **Renseigner les champs de configuration :**
   - **Name :** `korean-master` (ou le nom de votre choix)
   - **Branch :** `main`
   - **Build Command :** `npm install && npm run build`
   - **Publish Directory :** `dist`

4. **Cliquez sur "Create Static Site" !**
   - Render va compiler votre application en moins de 60 secondes.
   - Votre application sera en ligne à une adresse du type `https://korean-master.onrender.com`.
   - Le fichier `public/_redirects` inclus garantit que toutes les routes SPA fonctionnent sans erreur 404.

---

## 📱 Installation en tant qu'Application (PWA)

L'application est 100% compatible PWA :
- **Sur Android (Chrome) :** Un bouton "Installer App" s'affiche ou cliquez sur les 3 points verticaux en haut à droite -> *Ajouter à l'écran d'accueil*.
- **Sur iPhone / iPad (Safari) :** Cliquez sur le bouton de partage en bas -> *Sur l'écran d'accueil*.
- **Sur Ordinateur (Chrome / Edge) :** Cliquez sur la petite icône d'ordinateur avec flèche dans la barre d'adresse pour l'installer comme une vraie application de bureau.

---

## 🛠️ Technologies Utilisées
- **React 19**
- **TypeScript**
- **Vite**
- **Tailwind CSS v4**
- **Lucide React** (Icônes modernes)
- **Web Speech API** (Synthèse & reconnaissance vocale ko-KR)
- **HTML5 Canvas** (Calligraphie & Tracé des traits)
- **Canvas Confetti** (Gamification & Récompenses visuelles)
