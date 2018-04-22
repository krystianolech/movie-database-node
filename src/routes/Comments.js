const Joi = require('joi');
const CommentController = require('../controllers/CommentController')


module.exports = [
    {
        method: 'POST',
        path: '/comments',
        handler: CommentController.create,
        options: {
            validate: {
                payload: {
                    body: Joi.string().max(10000).required(),
                    movieId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/comments',
        handler: CommentController.list
    },
];