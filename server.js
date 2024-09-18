const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;
const ADMIN_CODE = 'aaaa'; // Remplacez ceci par votre code d'administration

// Connect to MongoDB
mongoose.connect('mongodb://localhost/tournamentdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '')));

// Serve HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/admin.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

app.get('/admin-panel.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin-panel.html'));
});

// Authentication route
app.post('/admin-auth', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_CODE) {
    res.sendStatus(200);
  } else {
    res.sendStatus(403); // Forbidden
  }
});

// Add a new tournament
app.post('/add-tournament', async (req, res) => {
  const { name, date } = req.body;
  const tournament = new Tournament({ name, date });
  await tournament.save();
  res.sendStatus(200);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
