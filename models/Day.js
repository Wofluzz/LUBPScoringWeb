// models/Day.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const daySchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  matches: [{ type: Schema.Types.ObjectId, ref: 'Match' }]
});

module.exports = mongoose.model('Day', daySchema);
