const Joi = require('joi');
const MovieController = require('../controllers/MovieController')

module.exports = [
    {
        method: 'POST',
        path: '/movies',
        handler: MovieController.create,
        options: {
            validate: {
                payload: {
                    title: Joi.string().max(255).required()
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/movies',
        handler: MovieController.list
    },
];