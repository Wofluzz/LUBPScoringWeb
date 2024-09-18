// admin.js

document.getElementById('add-participant-form').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;

    // Récupérer la liste des participants depuis le localStorage
    let participants = JSON.parse(localStorage.getItem('participants')) || [];

    // Ajouter le nouveau participant
    participants.push({ name });

    // Sauvegarder la liste dans le localStorage
    localStorage.setItem('participants', JSON.stringify(participants));

    // Réinitialiser le formulaire
    document.getElementById('add-participant-form').reset();

    alert('Participant ajouté !');
});

// Fonction pour charger les participants dans la page index.html
function loadParticipants() {
    const participants = JSON.parse(localStorage.getItem('participants')) || [];
    
    const participantsList = document.getElementById('participants-list');
    
    participantsList.innerHTML = '';  // Vider la liste avant de la recharger
    
    participants.forEach((participant, index) => {
        const div = document.createElement('div');
        div.textContent = `${index + 1}. ${participant.name}`;
        participantsList.appendChild(div);
    });
}

// Si nous sommes sur la page d'accueil, charger les participants
if (document.getElementById('participants-list')) {
    loadParticipants();
}
