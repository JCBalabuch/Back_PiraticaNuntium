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
    comments: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      validate: {
        validator: function (v) {
          return typeof v === 'number' || typeof v === 'string';
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
