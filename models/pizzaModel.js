const mongoose = require('mongoose');

const pizzaSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A pizza must have a name'],
    },
    varient: [],
    prices: [],
    category: {
      type: String,
      required: [true, 'A pizza must have a category'],
    },
    image: {
      type: String,
      required: [true, 'A pizza must have in image'],
    },
    description: {
      type: String,
      required: [true, 'A pizza must have own description'],
    },
  },
  {
    timestamps: true,
  }
);
const Pizza = mongoose.model('Pizza', pizzaSchema);
module.exports = Pizza;
