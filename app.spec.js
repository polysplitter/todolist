const request = require('supertest')
const app = require('./app')

it('will return 200 at route /', done => {
    request(app).get('/').expect(200, done)
})