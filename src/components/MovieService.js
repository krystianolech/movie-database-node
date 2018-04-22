const OmdbApiConnector = require('./OmdbapiConnector')

class MovieService {

    /**
     * 
     * @param {OmdbApiConnector} omdbApiConnector 
     */
    constructor(omdbApiConnector) {
        this.omdbApiConnector = omdbApiConnector
    }

    /**
     * 
     * @param {string} movieTitle 
     */
    async createMovieByTitle(movieTitle) {
        const movieDetails = await this.omdbApiConnector.fetchMovieByTitle(movieTitle)        
        return {
            title: movieDetails.Title,
            year: parseInt(movieDetails.Year),
            runtime: movieDetails.Runtime,
            director: movieDetails.Director,
            actors: movieDetails.Actors.split(',').map((name) => name.trim()),
            imdbRatirng: parseFloat(movieDetails.imdbRating),
            poster: movieDetails.Poster
        }
    }
}

module.exports = MovieService