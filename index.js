require('dotenv').config()
const serverManager = require('./server')
const mongoose = require('mongoose');
const omdbAccessToken = process.env.OMDBAPI_TOKEN

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

serverManager.startServer().then(server => {
    console.log('Server running at:', server.info.uri)
    return server
}).catch(err => {
    console.log(err)
});