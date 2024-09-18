// models/Participant.js
const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  matchesPlayed: { type: Number, default: 0 },
  matchesWon: { type: Number, default: 0 },
  winningPalets: { type: Number, default: 0 }
});

module.exports = mongoose.model('Participant', participantSchema);
