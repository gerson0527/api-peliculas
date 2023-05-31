const request = require("supertest");
const app = require("../app");
const Genre = require("../models/Genre");
const Actor = require("../models/Actor");
const Director = require("../models/Director");
require("../models");

let movieId;

test("POST /movies should create a movie ", async () => {
  const movie = {
    name: "2012",
    image: "https://image.jpg",
    synopsis: "pelicula que se trata de final del mundo",
    releaseYear: 2009,
  };
  const res = await request(app).post("/movies").send(movie);
  movieId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test("GET /movies should bring all the movies", async () => {
  const res = await request(app).get("/movies");
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
  expect(res.body[0].genres).toBeDefined();
  expect(res.body[0].directors).toBeDefined();
  expect(res.body[0].actors).toBeDefined();
});

test("PUT /movies should update a movie", async () => {
  const updatedmovie = {
    name: "no mires arriba",
    image: "https://image.jpg",
    synopsis: "pelicula que trata de cae un metiorito en la tierra",
    releaseYear: 2022,
  };

  const res = await request(app).put(`/movies/${movieId}`).send(updatedmovie);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(updatedmovie.name);
});

test("POST /movies/:id/genres should set a genre to a movie", async () => {
  const genre = await Genre.create({ name: "Horror" });
  const res = await request(app)
    .post(`/movies/${movieId}/genres`)
    .send([genre.id]);
  await genre.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("POST /movies/:id/actors should set an actor to a movie", async () => {
  const actor = await Actor.create({
    firstName: "fernando",
    lastName: "Oritz",
    nationality: "colombiano",
    image: "https://image.jpg",
    birthday: "2001-05-07",
  });
  const res = await request(app)
    .post(`/movies/${movieId}/actors`)
    .send([actor.id]);
  await actor.destroy();
  expect(res.status).toBe(200);
});

test("POST /movies/:id/directors should set a director to a movie", async () => {
  const director = await Director.create({
    firstName: "camilo",
    lastName: "next",
    nationality: "colombiana",
    image: "https://image.jpg",
    birthday: "2002-04-08",
  });
  const res = await request(app)
    .post(`/movies/${movieId}/directors`)
    .send([director.id]);
  await director.destroy();
  expect(res.status).toBe(200);
});

test("DELETE /movies should delete a movie", async () => {
  const res = await request(app).delete(`/movies/${movieId}`);
  expect(res.status).toBe(204);
});
