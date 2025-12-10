const request = require("supertest");
const app = require("../app");
const { MongoClient } = require("mongodb");
const { getDatabase, setDatabase } = require("../data/database");
require("dotenv").config();
jest.setTimeout(20000);


let connection;
let db;

beforeAll(async () => {
  globalThis.MONGODB_URI = process.env.MONGODB_URI;
  globalThis.getDatabase = getDatabase;
  connection = await MongoClient.connect(globalThis.MONGODB_URI);
  db = connection.db(globalThis.getDatabase);
  setDatabase(connection);
});

afterAll(async () => {
  await connection.close();
});

// 1
test("GET /user → returns array", async () => {
  const res = await request(app).get("/user");
  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});

// 2
test("GET /user/:id → works", async () => {
  const mock = { firstName: "Ana", lastName: "Test", email: "ana@test.com" };
  const { insertedId } = await db.collection("users").insertOne(mock);

  const res = await request(app).get(`/user/${insertedId}`);
  expect(res.statusCode).toBe(200);
  expect(res.body.firstName).toBe("Ana");
});

// 3
test("GET /user/invalid → 400", async () => {
  const res = await request(app).get("/user/123");
  expect(res.statusCode).toBe(400);
});

// 4
test("GET /user/missing → 404", async () => {
  const id = "64df00f8d10a5f1e6cab1234";
  const res = await request(app).get(`/user/${id}`);
  expect(res.statusCode).toBe(404);
});
