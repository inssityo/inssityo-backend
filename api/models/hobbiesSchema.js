const mongoose = require("mongoose");

const hobbiesSchema = new mongoose.Schema({
  collecting: { type: Number, min: 1, max: 5 },
  crafts: { type: Number, min: 1, max: 5 },
  informationTech: { type: Number, min: 1, max: 5 },
  sports: { type: Number, min: 1, max: 5 },
  music: { type: Number, min: 1, max: 5 },
  games: { type: Number, min: 1, max: 5 },
  reading: { type: Number, min: 1, max: 5 },
  art: { type: Number, min: 1, max: 5 },
  culture: { type: Number, min: 1, max: 5 },
  cooking: { type: Number, min: 1, max: 5 },
  travelling: { type: Number, min: 1, max: 5 },
  voluntaryWork: { type: Number, min: 1, max: 5 },
});

module.exports = hobbiesSchema;
