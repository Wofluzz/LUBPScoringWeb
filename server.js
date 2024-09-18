const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

// Importer les modèles
const Participant = require('./models/Participant');
const Match = require('./models/Match');
const Day = require('./models/Day');

const app = express();
const port = 3000;

// Connexion à MongoDB
mongoose.connect('mongodb://localhost/tournamentdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs'); // Utiliser EJS pour les vues dynamiques

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Routes pour l'API
app.post('/add-participant', async (req, res) => {
  const { name } = req.body;
  try {
    const participant = new Participant({ name });
    await participant.save();
    res.status(200).json({ message: 'Participant added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding participant', error });
  }
});

app.post('/add-match', async (req, res) => {
  const { participantA, participantB, pointsA, pointsB } = req.body;
  try {
    const match = new Match({ participantA, participantB, pointsA, pointsB });
    await match.save();

    // Mettre à jour les statistiques des participants
    const participantAData = await Participant.findById(participantA);
    const participantBData = await Participant.findById(participantB);

    participantAData.matchesPlayed += 1;
    participantBData.matchesPlayed += 1;

    if (pointsA > pointsB) {
      participantAData.matchesWon += 1;
    } else {
      participantBData.matchesWon += 1;
    }

    participantAData.winningPalets += pointsA;
    participantBData.winningPalets += pointsB;

    await participantAData.save();
    await participantBData.save();

    res.status(200).json({ message: 'Match added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding match', error });
  }
});

app.post('/add-day', async (req, res) => {
  const { matches } = req.body;
  try {
    const day = new Day({ matches });
    await day.save();
    res.status(200).json({ message: 'Day added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding day', error });
  }
});

// Route pour afficher la page d'accueil
app.get('/', async (req, res) => {
  try {
    const participants = await Participant.find();
    const latestDay = await Day.findOne().sort({ date: -1 }).populate('matches').populate({
      path: 'matches',
      populate: { path: 'participantA participantB' }
    });

    res.render('index', { participants, latestDay });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error });
  }
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
