// models/Match.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matchSchema = new mongoose.Schema({
  participantA: { type: Schema.Types.ObjectId, ref: 'Participant', required: true },
  participantB: { type: Schema.Types.ObjectId, ref: 'Participant', required: true },
  pointsA: { type: Number, required: true },
  pointsB: { type: Number, required: true },
  matchDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Match', matchSchema);
