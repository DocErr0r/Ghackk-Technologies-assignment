const mongoose = require('mongoose');

const WebtoonSchema = new mongoose.Schema({
    title: String,
    image: String,
    description: String,
    votes: { manhwa: Number, anime: Number }
});

module.exports = mongoose.model('Webtoon', WebtoonSchema);
