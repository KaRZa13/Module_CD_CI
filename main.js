// Gestion des données des profils freelance
class FreelanceManager {
  constructor() {
    this.profiles = this.loadProfiles();
    this.init();
  }

  // Initialisation de l'application
  init() {
    this.bindEvents();
    this.displayProfiles();
    this.loadSampleData();
  }

  // Chargement des profils depuis le localStorage
  loadProfiles() {
    const saved = localStorage.getItem('freelanceProfiles');
    return saved ? JSON.parse(saved) : [];
  }

  // Sauvegarde des profils dans le localStorage
  saveProfiles() {
    localStorage.setItem('freelanceProfiles', JSON.stringify(this.profiles));
  }

  // Chargement de données d'exemple (si aucun profil existant))
  loadSampleData() {
    // If no profiles are saved, try to load sample profiles from an external file
    if (this.profiles.length === 0) {
      if (window.sampleProfiles && Array.isArray(window.sampleProfiles) && window.sampleProfiles.length > 0) {
        this.profiles = window.sampleProfiles;
        this.saveProfiles();
        this.displayProfiles();
      }
    }
  }

  // Liaison des événements
  bindEvents() {
    // Navigation entre les sections
    document.getElementById('addProfileBtn').addEventListener('click', () => {
      this.showAddProfileForm();
    });

    document.getElementById('showAllBtn').addEventListener('click', () => {
      this.showProfilesList();
    });

    document.getElementById('cancelBtn').addEventListener('click', () => {
      this.showProfilesList();
    });

    // Soumission du formulaire
    document.getElementById('profileForm').addEventListener('submit', (e) => {
      this.handleFormSubmit(e);
    });

    // Filtrage par catégorie
    document.getElementById('categoryFilter').addEventListener('change', (e) => {
      this.filterProfiles(e.target.value);
    });

    // Bouton pour afficher les articles (si présent)
    var articlesBtn = document.getElementById('showArticlesBtn');
    if (articlesBtn) {
      articlesBtn.addEventListener('click', () => {
        this.showArticlesSection();
      });
    }
  }

  // Affichage de la liste des profils
  showProfilesList() {
    document.getElementById('profilesSection').classList.remove('hidden');
    document.getElementById('addProfileSection').classList.add('hidden');
    const articlesSection = document.getElementById('articlesSection');
    if (articlesSection) articlesSection.classList.add('hidden');
    document.getElementById('showAllBtn').classList.add('bg-blue-600');
    document.getElementById('showAllBtn').classList.remove('bg-gray-500');
    document.getElementById('addProfileBtn').classList.remove('bg-green-600');
    document.getElementById('addProfileBtn').classList.add('bg-gray-500');
    const showArticlesBtn = document.getElementById('showArticlesBtn');
    if (showArticlesBtn) {
      showArticlesBtn.classList.remove('bg-yellow-600');
      showArticlesBtn.classList.add('bg-gray-500');
    }
  }

  // Affichage du formulaire d'ajout
  showAddProfileForm() {
    document.getElementById('profilesSection').classList.add('hidden');
    document.getElementById('addProfileSection').classList.remove('hidden');
    const articlesSection = document.getElementById('articlesSection');
    if (articlesSection) articlesSection.classList.add('hidden');
    document.getElementById('addProfileBtn').classList.add('bg-green-600');
    document.getElementById('addProfileBtn').classList.remove('bg-gray-500');
    document.getElementById('showAllBtn').classList.remove('bg-blue-600');
    document.getElementById('showAllBtn').classList.add('bg-gray-500');

    const showArticlesBtn = document.getElementById('showArticlesBtn');
    if (showArticlesBtn) {
      showArticlesBtn.classList.remove('bg-yellow-600');
      showArticlesBtn.classList.add('bg-gray-500');
    }

    // Réinitialiser le formulaire
    document.getElementById('profileForm').reset();
  }

  // Affiche la section Articles
  showArticlesSection() {
    var profilesSection = document.getElementById('profilesSection');
    var addProfileSection = document.getElementById('addProfileSection');
    var articlesSection = document.getElementById('articlesSection');

    if (profilesSection) profilesSection.classList.add('hidden');
    if (addProfileSection) addProfileSection.classList.add('hidden');
    if (articlesSection) articlesSection.classList.remove('hidden');

    // Buttons state
    var showArticlesBtn = document.getElementById('showArticlesBtn');
    if (showArticlesBtn) {
      showArticlesBtn.classList.add('bg-yellow-600');
      showArticlesBtn.classList.remove('bg-gray-500');
    }

    var showAllBtn = document.getElementById('showAllBtn');
    if (showAllBtn) {
      showAllBtn.classList.remove('bg-blue-600');
      showAllBtn.classList.add('bg-gray-500');
    }

    var addProfileBtn = document.getElementById('addProfileBtn');
    if (addProfileBtn) {
      addProfileBtn.classList.remove('bg-green-600');
      addProfileBtn.classList.add('bg-gray-500');
    }
  }

  // Gestion de la soumission du formulaire
  handleFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const profileData = {
      id: Date.now(), // ID unique basé sur le timestamp
      name: formData.get('name').trim(),
      title: formData.get('title').trim(),
      category: formData.get('category'),
      rate: parseInt(formData.get('rate')),
      email: formData.get('email').trim(),
      description: formData.get('description').trim(),
      skills: formData.get('skills') ? formData.get('skills').split(',').map(s => s.trim()).filter(s => s) : [],
      photo: formData.get('photo').trim() || `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 50) + 1}.jpg`
    };

    // Validation
    if (!this.validateProfile(profileData)) {
      return;
    }

    // Ajout du profil
    this.profiles.push(profileData);
    this.saveProfiles();
    this.displayProfiles();
    this.showProfilesList();

    // Message de succès
    this.showNotification('Profil ajouté avec succès !', 'success');
  }

  // Validation des données du profil
  validateProfile(profile) {
    if (!profile.name || !profile.title || !profile.category || !profile.rate || !profile.email || !profile.description) {
      this.showNotification('Veuillez remplir tous les champs obligatoires.', 'error');
      return false;
    }

    if (profile.rate < 0) {
      this.showNotification('Le tarif doit être positif.', 'error');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profile.email)) {
      this.showNotification('Veuillez entrer une adresse email valide.', 'error');
      return false;
    }

    return true;
  }

  // Affichage des profils
  displayProfiles(profilesToShow = null) {
    const profiles = profilesToShow || this.profiles;
    const grid = document.getElementById('profilesGrid');

    if (profiles.length === 0) {
      grid.innerHTML = '<div class="col-span-full text-center py-12 text-gray-500"><p class="text-xl">Aucun profil trouvé.</p></div>';
      return;
    }

    grid.innerHTML = profiles.map(profile => this.createProfileCard(profile)).join('');
  }

  // Création d'une carte de profil
  createProfileCard(profile) {
    const skillsHtml = profile.skills.slice(0, 3).map(skill =>
      `<span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">${skill}</span>`
    ).join('');

    const moreSkills = profile.skills.length > 3 ?
      `<span class="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">+${profile.skills.length - 3}</span>` : '';

    return `
            <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div class="p-6">
                    <div class="flex items-center mb-4">
                        <img src="${profile.photo}" alt="${profile.name}" class="w-16 h-16 rounded-full object-cover mr-4">
                        <div>
                            <h4 class="text-xl font-semibold text-gray-800">${profile.name}</h4>
                            <p class="text-blue-600 font-medium">${profile.title}</p>
                        </div>
                    </div>
                    
                    <div class="mb-4">
                        <span class="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">${profile.category}</span>
                    </div>
                    
                    <p class="text-gray-600 mb-4 line-clamp-3">${profile.description}</p>
                    
                    <div class="flex flex-wrap gap-2 mb-4">
                        ${skillsHtml}
                        ${moreSkills}
                    </div>
                    
                    <div class="flex justify-between items-center">
                        <div class="text-2xl font-bold text-green-600">${profile.rate}€<span class="text-sm text-gray-500 font-normal">/jour</span></div>
                        <div class="flex space-x-2">
                            <a href="mailto:${profile.email}" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm">
                                Contacter
                            </a>
                            <button onclick="freelanceManager.deleteProfile(${profile.id})" class="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition text-sm">
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
  }

  // Filtrage des profils par catégorie
  filterProfiles(category) {
    const filtered = category ?
      this.profiles.filter(profile => profile.category === category) :
      this.profiles;
    this.displayProfiles(filtered);
  }

  // Suppression d'un profil
  deleteProfile(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce profil ?')) {
      this.profiles = this.profiles.filter(profile => profile.id !== id);
      this.saveProfiles();
      this.displayProfiles();
      this.showNotification('Profil supprimé avec succès !', 'success');
    }
  }

  // Affichage des notifications
  showNotification(message, type = 'info') {
    // Supprimer les notifications existantes
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 ${type === 'success' ? 'bg-green-500 text-white' :
        type === 'error' ? 'bg-red-500 text-white' :
          'bg-blue-500 text-white'
      }`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Suppression automatique après 3 secondes
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
}

// Initialisation de l'application
const freelanceManager = new FreelanceManager();

// CSS personnalisé pour le line-clamp
const style = document.createElement('style');
style.textContent = `
    .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
`;
document.head.appendChild(style);