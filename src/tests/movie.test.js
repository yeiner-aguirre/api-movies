const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');

let id;

test("GET/movies debe retornar todos las peliculas", async () => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test("POST/movies debe crear una pelicula", async () => {
    const body = {
        name: "titanic",
        image: "imagen de la pelicula",
        synopsis: "resumen de la pelicuka",
        releaseYear:2000     
    };
    const res = await request(app).post('/movies').send(body);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(body.name);
});
test("PUT/movies/:id debe actualizar una pelicula", async () => {
    const body = {
        name: "titanic 2"
    }
    const res = await request(app).put(`/movies/${id}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
});

test('POST/movies/:id/actors agrega los actores a una pelicula', async () => {
    const actor = await Actor.create({
        firtsName:"keaune",
        lastName:"teves",
        nationality:"EEUU",
        image:"IMAGEN DEL ACTOR",
        birthday:"2000-06-15"
    });
    const res = await request(app)
        .post(`/movies/${id}/actors`)
        .send([actor.id]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
});

test('POST /movies/:id/directors agrega los directores a una pelicula', async () => {
    const director = await Director.create({
        firtsName:"yeiner director",
        lastName:"aguirre",
        nationality:"Colombia",
        image:"imagen del director",
        birthday:"03-00-2000"
    });
    const res = await request(app)
        .post(`/movies/${id}/directors`)
        .send([director.id]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
});

test('POST /movies/:id/genres agrega el genero a una pelicula ', async () => {
    const genre = await Genre.create({
        name:"romance"
    });
    const res = await request(app)
        .post(`/movies/${id}/genres`)
        .send([genre.id]);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
});


test("DELETE/movies/:id debe eliminar una pelicula", async () => {
    const res = await request(app).delete(`/movies/${id}`);
    expect(res.status).toBe(204);
});
