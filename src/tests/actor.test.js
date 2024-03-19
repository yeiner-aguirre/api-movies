const request = require('supertest');
const app = require('../app');

test("GET/actors debe retornar todos los actores", async () => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test("POST/actors debe crear un actor", async () => {
    const body = {
        firtsName: "leonardo",
        lastName: "dicaprio",
        nationality: "estados unidos",
        image: "foto del actor",
        birthday: "11-11-1974",
    };
    const res = await request(app).post('/actors').send(body);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(body.firstName);
});
test("PUT/actors/:id debe actualizar un actor", async () => {
    const body = {
        firtsName: "leonardo actualizado"
    }
    const res = await request(app).put(`/actors/${id}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body.firtsName).toBe(body.firtsName);
});

test("DELETE/actors/:id debe eliminar un actor", async () => {
    const res = await request(app).delete(`/actors/${id}`);
    expect(res.status).toBe(204);
});
