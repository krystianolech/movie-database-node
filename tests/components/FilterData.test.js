const FilterData = require('../../src/components/FilterData')
const sampleData = require('../data/sampleMovieList.json')

test('It correctly filter data for no filters', () => {
    expect(FilterData(sampleData, {})).toEqual(sampleData)
})

test('It correctly filter data for number filter', () => {
    const filtred = FilterData(sampleData, {year : 2017})
    const movieTitle = filtred.map((movie) => movie.title)
    expect(filtred).toHaveLength(3)
    expect(movieTitle).toContain('Baby Driver')
    expect(movieTitle).toContain('Lady Bird')
    expect(movieTitle).toContain('The Disaster Artist')
})

test('It correctly filter data for string filter', () => {
    const filtred = FilterData(sampleData, {title : 'Baby'})
    const movieTitle = filtred.map((movie) => movie.title)
    expect(filtred).toHaveLength(2)
    expect(movieTitle).toContain('Baby Driver')
    expect(movieTitle).toContain('Baby')
})

test('It correctly filter data for string filter with incorrect case', () => {
    const filtred = FilterData(sampleData, {title : 'baby'})
    const movieTitle = filtred.map((movie) => movie.title)
    expect(filtred).toHaveLength(2)
    expect(movieTitle).toContain('Baby Driver')
    expect(movieTitle).toContain('Baby')
})


test('It correctly filter data for two filters of diffrent type', () => {
    const filtred = FilterData(sampleData, {title : 'Baby', year : 2017})
    const movieTitle = filtred.map((movie) => movie.title)
    expect(filtred).toHaveLength(1)
    expect(movieTitle).toContain('Baby Driver')    
})

test('It correctly filter data when limited types are allowed', () => {
    const filtred = FilterData(sampleData, {title : 'Baby', year : 2017}, {year : Number})
    const movieTitle = filtred.map((movie) => movie.title)
    expect(filtred).toHaveLength(3)    
})

test('It correctly filter data when declared type is provided', () => {
    const data = [{ title: "300" }];
    const filtred = FilterData(data, {title : '300'}, {title: String})    
    expect(filtred).toHaveLength(1)    
})