const movieRoutes = require('./Movie')
const commentsRoutes = require('./Comments')

module.exports = [
    ...movieRoutes,
    ...commentsRoutes
]