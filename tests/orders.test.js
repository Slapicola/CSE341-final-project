const request = require("supertest");
const { MongoClient } = require("mongodb");
const app = require("../app");
const { setDatabase, getDatabase } = require("../data/database");
require("dotenv").config();
jest.setTimeout(20000);

let connection;
let db;

beforeAll(async () => {
  connection = await MongoClient.connect(process.env.MONGODB_URI);
  db = connection.db("cse341Team");
  setDatabase(db);
});

afterAll(async () => {
  await connection.close();
});

// 1
test("GET /order → returns array", async () => {
  const res = await request(app).get("/order");
  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});

// 2
test("GET /order/:id → works", async () => {
  const mock = { total: 30 };
  const { insertedId } = await db.collection("orders").insertOne(mock);

  const res = await request(app).get(`/order/${insertedId}`);
  expect(res.statusCode).toBe(200);
});

// 3
test("GET /order/invalid → 400 or 500", async () => {
  const res = await request(app).get("/order/123");
  expect([400, 500]).toContain(res.statusCode);
});

// 4
test("GET /order/missing → 404", async () => {
  const id = "64df00f8d10a5f1e6cab1234";
  const res = await request(app).get(`/order/${id}`);
  expect(res.statusCode).toBe(404);
});
