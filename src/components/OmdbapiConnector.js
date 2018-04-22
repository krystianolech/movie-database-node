const axios = require('axios')
const boom = require('boom')

class OmbdbapiConnector {

    /**
     * 
     * @param {string} apiToken 
     */
    constructor(apiToken) {
        this.apiToken = apiToken;
    }

    /**
     * 
     * @param {string} title 
     */
    fetchMovieByTitle(title) {
        return axios
        .get(`http://www.omdbapi.com/?apikey=${this.apiToken}&t=${title}`)
        .then((response) => {
            if (response.data.Response === "False") {
                return Promise.reject(boom.notFound(`Movie "${title}" not found in modbapi`))
            }
            return response.data
        })
    }

}

module.exports = OmbdbapiConnector;