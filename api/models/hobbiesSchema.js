const mongoose = require("mongoose");

const hobbiesSchema = new mongoose.Schema({
  collecting: { type: Number, min: 1, max: 7 },
  crafts: { type: Number, min: 1, max: 7 },
  informationTech: { type: Number, min: 1, max: 7 },
  sports: { type: Number, min: 1, max: 7 },
  music: { type: Number, min: 1, max: 7 },
  games: { type: Number, min: 1, max: 7 },
  reading: { type: Number, min: 1, max: 7 },
  art: { type: Number, min: 1, max: 7 },
  culture: { type: Number, min: 1, max: 7 },
  cooking: { type: Number, min: 1, max: 7 },
  travelling: { type: Number, min: 1, max: 7 },
  voluntaryWork: { type: Number, min: 1, max: 7 },
});

module.exports = hobbiesSchema;
