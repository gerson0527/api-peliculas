const request = require("supertest");
const app = require("../app");

let genreId;

test("POST /genres should create a genre ", async () => {
  const genre = {
    name: "Vallenato",
  };

  const res = await request(app).post("/genres").send(genre);
  genreId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test("GET /genres should return all the genres", async () => {
  const res = await request(app).get("/genres");
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT /genres should update a genre", async () => {
  const updatedGenre = {
    name: "Cumbia",
  };

  const res = await request(app).put(`/genres/${genreId}`).send(updatedGenre);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(updatedGenre.name);
});

test("DELETE /genres should delete a genre", async () => {
  const res = await request(app).delete(`/genres/${genreId}`);
  expect(res.status).toBe(204);
});
