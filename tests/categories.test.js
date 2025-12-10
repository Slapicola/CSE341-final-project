const request = require("supertest");
const app = require("../app");
const { MongoClient } = require("mongodb");
const { getDatabase, setDatabase } = require("../data/database");
require("dotenv").config();
jest.setTimeout(20000); 

let connection;
// let db;

beforeAll(async () => {
  connection = await MongoClient.connect(process.env.MONGODB_URI);
  db = connection.db("cse341Team");
  setDatabase(db);
});

afterAll(async () => {
  await connection.close();
});

// 1
test("GET /category → returns array", async () => {
  const res = await request(app).get("/category");
  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});

// 2
test("GET /category/:id → works", async () => {
  const mock = { CategoryName: "Test Cat", description: "abcde12345" };
  const { insertedId } = await db.collection("categories").insertOne(mock);

  const res = await request(app).get(`/category/${insertedId}`);
  expect(res.statusCode).toBe(200);
  expect(res.body.CategoryName).toBe("Test Cat");
});

// 3
test("GET /category/invalid → 400", async () => {
  const res = await request(app).get("/category/123");
  expect(res.statusCode).toBe(400);
});

// 4
test("GET /category/missing → 404", async () => {
  const id = "64df00f8d10a5f1e6cab1234";
  const res = await request(app).get(`/category/${id}`);
  expect(res.statusCode).toBe(404);
});
