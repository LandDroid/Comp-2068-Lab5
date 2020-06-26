const mongoose = require("mongoose");

// You need to create a new schema and assign it the following
// constant
const SuperheroSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    alias: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Superhero", SuperheroSchema);
