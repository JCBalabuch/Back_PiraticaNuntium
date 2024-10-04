// Imports
const mongoose = require('mongoose');

// News Schema
const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    link: { type: String, required: true },
    site: { type: String, required: true },
    score: { type: Number, required: true },
    user: { type: String, required: true },
    time: { type: Date, required: true },
    comment: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return typeof v === 'Number' || typeof v === 'String';
        },
      },
    },
  },
  {
    timestamps: true,
    collection: 'news',
  }
);

const News = mongoose.model('news', newsSchema, 'news');

// Export
module.exports = News;
