const request = require('supertest');
const app = require('../../server');
const movieRepository = require('../../src/repository/MovieRepository')
const sampleMovieList = require('../data/sampleMovieList.json')

jest.mock('../../src/repository/MovieRepository')

test('POST /movies create endpoint returns bad request error if no input provided', () => {
    return request(app.server.listener).post('/movies').then(response => {
        expect(response.statusCode).toBe(400)
        expect(response.body.message).toBe('Invalid request payload input')
    })
})

test('POST /movies create should return object with movie details when creating new one', () => {    
    const sampleMovie = sampleMovieList[0];
    movieRepository.save.mockResolvedValue(sampleMovie);
    return request(app.server.listener).post('/movies')
        .send({'title' : sampleMovie.title})
        .then(response => {
            expect(response.statusCode).toBe(201)
            expect(response.body).toEqual(sampleMovie)
        })
})

test('GET /movies Should fetch list of all movies already present in application database', () => {
    movieRepository.getAll.mockResolvedValue(sampleMovieList);
    return request(app.server.listener).get('/movies').then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual(sampleMovieList)
    })
})

test('GET /movies with filters should return filtered data ', () => {
    movieRepository.getAll.mockResolvedValue(sampleMovieList);
    return request(app.server.listener).get('/movies?year=2017').then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveLength(3)
    })
})

test('GET /movies with filters should return filtered data for multiple filters ', () => {
    movieRepository.getAll.mockResolvedValue(sampleMovieList);
    return request(app.server.listener).get('/movies?year=2017&title=baby').then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveLength(1)
    })
})

test('GET /movies Should fetch list of all and ignore not existing filters', () => {
    movieRepository.getAll.mockResolvedValue(sampleMovieList);
    return request(app.server.listener).get('/movies?nonexistingfilter=baby').then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual(sampleMovieList)
    })
})