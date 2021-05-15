const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');


const newTeacher = {
    name: 'Aimar Lints',

};

let newTeacherId;
let adminToken;


describe('Teachers controller', function () {
    describe('GET /teachers', function () {
        it('responds with list of teachers and statusCode 200', async function () {
            const response = await request(app).get('/teachers');
            expect(response.body).to.be.a('object');
            expect(response.statusCode).to.equal(200);
        });
    });

    describe('POST /teachers', function () {
        it('responds with error message in json and statusCode 400 because of missing data', async function () {
            const response = await request(app).post('/teachers');
            expect(response.body).to.be.a('object');
            expect(response.statusCode).to.equal(400);
            expect(response.body.error).to.equal('Name is missing');
        });
        it('responds with id of created teacher', async function () {
            const response = await request(app).post('/teachers').send(newTeacher);
            newTeacherId = response.body.id;
            expect(response.body).to.be.a('object');
            expect(response.statusCode).to.equal(201);
            expect(response.body.id).to.be.a('object');
        });
    });
    describe('DELETE /teachers', function () {
        it('responds with status code 204', async function () {
            const response = await request(app).delete(`/teachers/${newTeacherId}`).set('Authorization', `Bearer ${adminToken}`);
            expect(response.statusCode).to.equal(204);
        });
    });
});
