const Movie = require('../models/Movie')

exports.getAll = () => {
    return Movie.find({}).lean().exec()    
}

exports.getById = (movieId) => {
    return Movie.findById(movieId).lean().exec()
        .then(movie => movie !== null ? movie : Promise.reject(`Movie ${movieId} not found`))
}

exports.save = (payload) => {
    return new Movie(payload).save()
}