const request = require("supertest");
const app = require("../app");

let actorId;

test("POST /actors should create an actor", async () => {
  const actor = {
    firstName: "Gerson",
    lastName: "Ortiz",
    nationality: "Colombiano",
    image: "https://image.jpg",
    birthday: "1998-05-27",
  };

  const res = await request(app).post("/actors").send(actor);
  actorId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test("GET /actors should return all the actors", async () => {
  const res = await request(app).get("/actors");
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT /actors should update an actor", async () => {
  const updatedActor = {
    firstName: "Giovanny",
    lastName: "Rivera",
    nationality: "Colombiano",
    image: "https://image.jpg",
    birthday: "1998-05-27",
  };

  const res = await request(app).put(`/actors/${actorId}`).send(updatedActor);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(updatedActor.name);
});

test("DELETE /actors should delete an actor", async () => {
  const res = await request(app).delete(`/actors/${actorId}`);
  expect(res.status).toBe(204);
});