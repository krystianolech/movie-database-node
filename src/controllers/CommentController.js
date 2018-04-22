const CommentRepository = require('../repository/CommentRepository')
const Components = require('../components')
const Boom = require('boom')

exports.create = async (req, h) => {
    const comment = await Components.CommentService.createComment(req.payload.movieId, req.payload.body)
    return CommentRepository.save(comment)
}

exports.list = async (req, h) => {
    return Components.FilterData(await CommentRepository.getAll(), req.query, {
        'movieId' : String,
        'body' : String
    })
}