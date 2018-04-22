const mongoose = require('mongoose')

module.exports = mongoose.model('Comment', new mongoose.Schema(
    {
        movieId: mongoose.Schema.Types.ObjectId,
        body: String
    },
    { timestamps: true }
))