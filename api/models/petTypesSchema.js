const mongoose = require("mongoose");

const petTypesSchema = new mongoose.Schema({
  dogs: { type: Boolean, default: false },
  cats: { type: Boolean, default: false },
  rodents: { type: Boolean, default: false },
  birds: { type: Boolean, default: false },
  fishes: { type: Boolean, default: false },
  terrarium: { type: Boolean, default: false },
  other: { type: Boolean, default: false },
});

module.exports = petTypesSchema;
