# 🚀 SkillHub – Site Communautaire Flat-File

Bienvenue sur **SkillHub**, un site communautaire statique destiné aux **freelances IT** (développeurs, experts data, cybersécurité, IA, infrastructure, etc.).
L’objectif est de créer une plateforme simple et collaborative où chacun peut :

* 🧑‍💻 **Ajouter son profil** pour se présenter (compétences, services, contact).
* 🛠️ **Proposer des améliorations** du site (nouvelles sections, design, templates, etc.).

Toutes les contributions passent par **Git** et la validation se fait via **pull requests**, avec un déploiement automatisé grâce à la CI/CD.

---

## 🌟 Objectif

* Créer un espace **ouvert et communautaire** pour les freelances IT.
* Favoriser les échanges et la mise en avant de profils professionnels.
* S’appuyer sur une architecture **statique** (Markdown + générateur de site) pour garantir simplicité, sécurité et performance.
* Déployer automatiquement les contributions validées (inspiré du processus *Brown Bag Lunch*).

---

## 📂 Dépôt

* **Nom du projet** : SkillHub
* **Type** : Site statique versionné
* **Techno envisagée** : générateur de site statique (Hugo, Jekyll ou autre), déploiement via GitHub Pages/GitLab Pages.

### 🖼️ Maquette

👉 [Lien vers la maquette](https://karza13.github.io/Module_CD_CI/).

---

## 🔄 Processus de contribution

Nous accueillons toutes les contributions ! 🎉

### 1. Fork et clone

```bash
git clone https://github.com/<votre_repo>.git
git checkout -b feature/ajout-profil-nom
```

### 2. Ajouter un profil

* Créez un fichier dans `/profils/` au format **Markdown**.
  Exemple : `profils/rafael-m.md`

```markdown
# Rafael M.
- 💼 Développeur Fullstack
- 🚀 Spécialisé en Vue.js, Node.js, Supabase
- ✉️ Contact : rafael@example.com
```

### 3. Proposer une fonctionnalité

* Modifiez ou ajoutez des fichiers dans `/site/` (HTML/CSS/JS).
* Exemple : nouvelle section FAQ, amélioration du design, etc.

### 4. Commit et push

```bash
git add .
git commit -m "Ajout profil Rafael M."
git push origin feature/ajout-profil-nom
```

### 5. Pull Request

* Ouvrez une PR avec une description claire de votre ajout ou modification.
* La CI vérifiera la validité du fichier (lint + format).
* Une fois la PR validée, la mise en production est automatique via CI/CD 🚀

---

## ⚙️ CI/CD

* Build et validation via GitHub Actions (ou GitLab CI).
* Vérification automatique des formats (profils Markdown/YAML).
* Déploiement automatique sur GitHub Pages/GitLab Pages après merge.

---

## 👥 Crédits

* Rafael MURO.
* Matt PEAU
* Ethan RAMPNOUX
* Nicolas CHICHE

---

## 📜 Licence

Projet open-source sous licence MIT.
Vous êtes libres de contribuer et d’utiliser ce projet.
