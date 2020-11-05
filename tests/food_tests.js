//configure API for supertesting
var request = require('supertest');

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

	////test that server responds to testSlash function
    it('Responds to /foods', function testSlash(done) {
        request(server)
            .get('/foods')
            .expect(200, done);
    });

	//test that server returns code 400 when adding a null user
    it('Errors on Null Food', function testPath(done) {
        request(server)
            .post('/foods/add')
            .send({food: {}})
            .expect(400, done);
    });

	//test that the server successfully adds a valid food
    it('Accepts valid food', function testPath(done) {
        const testFood = {
            name: "Owl Stix",
            calories: 200,
            protein: 10,
            fat: 10,
            carbs: 10,
            restaurant: {
                name: "Goonies",
                location: "123 Apple Street",
            },
            fiber: 10
        }
        request(server)
            .post('/foods/add')
            .send({food: testFood})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
	
	//test that the server rejects a food without a name variable
    it('Rejects food without name', function testPath(done) {
        const testFood = {
            calories: 200,
            protein: 10,
            fat: 10,
            carbs: 10,
            restaurant: {
                name: "Goonies",
                location: "123 Apple Street",
            },
            fiber: 10
        }
        request(server)
            .post('/foods/add')
            .send({food: testFood})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });

	//test that the server rejects a food with a name variable too short
    it('Rejects food with short name', function testPath(done) {
        const testFood = {
            calories: 200,
            protein: 10,
            fat: 10,
            carbs: 10,
            restaurant: {
                name: "Goonies",
                location: "123 Apple Street",
            },
            fiber: 10
        }
        request(server)
            .post('/foods/add')
            .send({food: testFood})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });

	//test that the server rejects a food without a resteraunt variable
    it('Rejects food without restaurant', function testPath(done) {
        const testFood = {
            name: "Owl Stix",
            calories: 200,
            protein: 10,
            fat: 10,
            carbs: 10,
            fiber: 10
        }
        request(server)
            .post('/foods/add')
            .send({food: testFood})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });

	//test that the server rejects a food without a calorie variable
    it('Rejects food without calories', function testPath(done) {
        const testFood = {
            name: "Owl Stix",
            protein: 10,
            fat: 10,
            carbs: 10,
            restaurant: {
                name: "Goonies",
                location: "123 Apple Street",
            },
            fiber: 10
        }
        request(server)
            .post('/foods/add')
            .send({food: testFood})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });

	//test that the server rejects a food without a protein variable
    it('Rejects food without protein', function testPath(done) {
        const testFood = {
            name: "Owl Stix",
            calories: 200,
            fat: 10,
            carbs: 10,
            restaurant: {
                name: "Goonies",
                location: "123 Apple Street",
            },
            fiber: 10
        }
        request(server)
            .post('/foods/add')
            .send({food: testFood})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });

	//test that the server rejects a food without a fat variable
    it('Rejects food without fat', function testPath(done) {
        const testFood = {
            name: "Owl Stix",
            calories: 200,
            protein: 10,
            carbs: 10,
            restaurant: {
                name: "Goonies",
                location: "123 Apple Street",
            },
            fiber: 10
        }
        request(server)
            .post('/foods/add')
            .send({food: testFood})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });

	//test that the server rejects a food without a carbohydrate variable
    it('Rejects food without carbs', function testPath(done) {
        const testFood = {
            name: "Owl Stix",
            calories: 200,
            protein: 10,
            fat: 10,
            restaurant: {
                name: "Goonies",
                location: "123 Apple Street",
            },
            fiber: 10
        }
        request(server)
            .post('/foods/add')
            .send({food: testFood})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });

	//test that the server rejects a food with a non-int carb variable
    it('Rejects food with string as calories', function testPath(done) {
        const testFood = {
            name: "Owl Stix",
            calories: "ejbfesjihfbvhs",
            protein: 10,
            fat: 10,
            carbs: 10,
            restaurant: {
                name: "Goonies",
                location: "123 Apple Street",
            },
            fiber: 10
        }
        request(server)
            .post('/foods/add')
            .send({food: testFood})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });
});