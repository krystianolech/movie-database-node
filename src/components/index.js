const MovieService = require('./MovieService')
const CommentService = require('./CommentService')
const OmdbapiConnector = require('./OmdbapiConnector')
const FilterData = require('./FilterData')

const omdbapiConnector = new OmdbapiConnector(process.env.OMDBAPIKEY || "6dc9f3f5")
const movieService = new MovieService(omdbapiConnector)
const commentService = new CommentService()

module.exports = {
    MovieService : movieService,
    OmdbapiConnector : omdbapiConnector,
    CommentService : commentService,
    FilterData : FilterData
}