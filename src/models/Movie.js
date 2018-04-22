const mongoose = require('mongoose')

module.exports = mongoose.model('Movie', new mongoose.Schema(
    {
        title: String,
        year: Number,
        runtime: String,
        directory: String,
        actors: [String],
        imdbRatirng: Number,
        poster: String
    },
    { timestamps: true }
))