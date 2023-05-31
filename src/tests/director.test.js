const request = require("supertest");
const app = require("../app");

let directorId;

test("POST /directors should create a director ", async () => {
  const director = {
    firstName: "ger",
    lastName: "ortiz",
    nationality: "colombiano",
    image: "https://image.jpg",
    birthday: "1998-27-05",
  };

  const res = await request(app).post("/directors").send(director);
  directorId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test("GET /directors should return all the directors", async () => {
  const res = await request(app).get("/directors");
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT /directors should update a director", async () => {
  const updatedDirector = {
    firstName: "Gerson",
    lastName: "Ortiz",
    nationality: "colombiano",
    image: "https://image.jpg",
    birthday: "1998-27-05",
  };

  const res = await request(app)
    .put(`/directors/${directorId}`)
    .send(updatedDirector);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(updatedDirector.name);
});

test("DELETE /directors should delete a director", async () => {
  const res = await request(app).delete(`/directors/${directorId}`);
  expect(res.status).toBe(204);
});
