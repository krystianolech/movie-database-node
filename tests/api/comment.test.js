const request = require('supertest');
const app = require('../../server');
const movieRepository = require('../../src/repository/MovieRepository')
const commentRepository = require('../../src/repository/CommentRepository')
const sampleMovieList = require('../data/sampleMovieList.json')
const sampleCommentsList = require('../data/sampleCommentsList.json')


jest.mock('../../src/repository/MovieRepository')
jest.mock('../../src/repository/CommentRepository')


test('POST /comments fail on adding comment to not existing movie', () => {
    movieRepository.getById.mockResolvedValue(new Error());        
    commentRepository.getAll.mockResolvedValue(sampleCommentsList);
    return request(app.server.listener).post('/comments')
    .send({'movieId' : '5adcbb9a47fd631e505b2xxx', 'body' : 'slaby!!1'})
    .then(response => {
        expect(response.statusCode).toBe(400)        
    })
})

test('POST /comments fail on adding comment to not existing movie', () => {
    movieRepository.getById.mockResolvedValue(sampleMovieList[0]);        
    commentRepository.save.mockResolvedValue({'movieId' : '5adcbb9a47fd631e505b27f7', 'body' : 'slaby!!1'});
    return request(app.server.listener).post('/comments')
    .send({'movieId' : '5adcbb9a47fd631e505b27f7', 'body' : 'slaby!!1'})
    .then(response => {
        expect(response.statusCode).toBe(201)        
    })
})

test('GET /comments return all comments in database', () => {
    commentRepository.getAll.mockResolvedValue(sampleCommentsList);
    return request(app.server.listener).get('/comments').then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual(sampleCommentsList)
    })
})

test('GET /comments with movieId filter return comments attached to given movie', () => {
    commentRepository.getAll.mockResolvedValue(sampleCommentsList);
    return request(app.server.listener).get('/comments?movieId=5adcbb9a47fd631e505b27f7').then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveLength(2)
    })
})