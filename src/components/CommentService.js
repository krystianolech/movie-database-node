const MovieRepository = require('../repository/MovieRepository')
const boom = require('boom')

class CommentService {

    async createComment(movieId, body) {
        try {
            await MovieRepository.getById(movieId)
        } catch (e) {
            throw boom.notFound(e)
        }
        return {
            movieId : movieId,
            body : body
        };        
    }

}

module.exports = CommentService