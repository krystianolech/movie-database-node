const MovieRepository = require('../repository/MovieRepository')
const Components = require('../components')
const Boom = require('boom')

exports.create = async (req, h) => {
    const movie = await Components.MovieService.createMovieByTitle(req.payload.title)    
    return MovieRepository.save(movie).catch((error) => Boom.internal('Error while saving movie', movie))
}

exports.list = async (req, h) => {
    return Components.FilterData(await MovieRepository.getAll(), req.query, { 'title' : String, 'year' : Number })
}