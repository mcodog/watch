const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }, // URL or path to the image
});

module.exports = mongoose.model('Brand', brandSchema);
