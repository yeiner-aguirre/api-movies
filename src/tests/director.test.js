const request = require('supertest');
const app = require('../app');

test("GET/directors debe retornar todos los directores", async () => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test("POST/directors debe crear un director", async () => {
    const body = {
        firtsName: "yeiner",
        lastName: "estiven",
        nationality: "colombia",
        image: "foto del director",
        birthday: "03-06-2000",
    };
    const res = await request(app).post('/directors').send(body);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(body.firstName);
});
test("PUT/directors/:id debe actualizar un director", async () => {
    const body = {
        firtsName: "yeiner actualizado"
    }
    const res = await request(app).put(`/directors/${id}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body.firtsName).toBe(body.firtsName);
});

test("DELETE/directors/:id debe eliminar un director", async () => {
    const res = await request(app).delete(`/directors/${id}`);
    expect(res.status).toBe(204);
});
