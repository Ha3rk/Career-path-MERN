const mongoose = require('mongoose');

const CareerSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
  // type: String
  parents: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Career',
    required: false,
  }],
  children: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Career',
      required: false,
    },
  ],
});

module.exports = mongoose.model('Career', CareerSchema);
