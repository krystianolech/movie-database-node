const Comment = require('../models/Comment')

exports.getAll = () => {
    return Comment.find({}).lean().exec()    
}

exports.save = (payload) => {
    return new Comment(payload).save()
}