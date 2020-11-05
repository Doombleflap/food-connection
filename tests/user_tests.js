//configure API for supertesting
var request = require('supertest');

/* Test User must exist in your test DB */

//open the server for testing
describe('loading express', function () {
    var server;

	//clear the cache before each test
    beforeEach(function () {
        delete require.cache[require.resolve('../backend/server')];
        server = require('../backend/server');
    });

	//at the conclusion of each test, refresh the server
    afterEach(function (done) {
        server.close(done);
    });

	//test that testSlash function returns code 200
    it('Responds to /users', function testSlash(done) {
        request(server)
            .get('/users')
            .expect(200, done);
    });

	//test that server returns code 400 when adding a null user
    it('Errors on Null User', function testPath(done) {
        request(server)
            .post('/users/add')
            .send({})
            .expect(400, done);
    });

	//test that the server accepts login credentials of the testUser
    it('Accepts valid login', function testPath(done) {
        const testUser = {
            username: "TestUser",
            email: "TestUser",
            password: "TestUser"
        }
        request(server)
            .post('/users/login')
            .send(testUser)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

	//test that the server rejects a password that is too short
    it('Rejects short password', function testPath(done) {
        const testUser = {
            username: "TestUser",
            email: "TestUser",
            password: "TestU",
            
        }
        request(server)
            .post('/users/update')
            .send({user: testUser})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });

	//test that the server rejects a username that is too short
    it('Rejects short username', function testPath(done) {
        const testUser = {
            username: "Te",
            email: "TestUser",
            password: "TestUser",
            
        }
        request(server)
            .post('/users/update')
            .send({user: testUser})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });

	//test that the server accepts a valid mutation of a user's credentials
    it('Accepts valid change', function testPath(done) {
        const testUser = {
            username: "TestUser",
            email: "TestUser" + Date.now(),
            password: "TestUser",
        }
        request(server)
            .post('/users/update')
            .send({user: testUser})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

	//test that the server rejects a user's age being a String instead of an int
    it('Rejects string age', function testPath(done) {
        const testUser = {
            username: "TestUser",
            email: "TestUser",
            password: "TestUser",
            age: "cool",
        }
        request(server)
            .post('/users/update')
            .send({user: testUser})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });

	//test that the server rejects a user's height being a String instead of an int
    it('Rejects string height', function testPath(done) {
        const testUser = {
            username: "TestUser",
            email: "TestUser",
            password: "TestUser",
            age: 20,
            height: "cool",
        }
        request(server)
            .post('/users/update')
            .send({user: testUser})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });

	//test that the server rejects a user's weight being a String instead of an int
    it('Rejects string weight', function testPath(done) {
        const testUser = {
            username: "TestUser",
            email: "TestUser",
            password: "TestUser",
            age: 20,
            height: 70,
            weight: "heavy",
        }
        request(server)
            .post('/users/update')
            .send({user: testUser})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });

	//test that the server rejects a user's weight being a negative number
    it('Rejects negative weight', function testPath(done) {
        const testUser = {
            username: "TestUser",
            email: "TestUser",
            password: "TestUser",
            age: 20,
            height: 70,
            weight: -10,
        }
        request(server)
            .post('/users/update')
            .send({user: testUser})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });

	//test that the server rejects a user's height being a negative number
    it('Rejects negative height', function testPath(done) {
        const testUser = {
            username: "TestUser",
            email: "TestUser",
            password: "TestUser",
            age: 20,
            height: -1,
            weight: 150,
        }
        request(server)
            .post('/users/update')
            .send({user: testUser})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });

	//test that the server rejects a user's age being a negative number
    it('Rejects negative age', function testPath(done) {
        const testUser = {
            username: "TestUser",
            email: "TestUser",
            password: "TestUser",
            age: -10,
            height: 70,
            weight: 150,
        }
        request(server)
            .post('/users/update')
            .send({user: testUser})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });
});