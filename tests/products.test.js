const request = require("supertest");
const app = require("../app");
const { MongoClient } = require("mongodb");
const { setDatabase } = require("../data/database");
require("dotenv").config();

let connection;
let db;

beforeAll(async () => {
  globalThis.MONGODB_URI = process.env.MONGODB_URI;
  globalThis.getDatabase = getDatabase;
  connection = await MongoClient.connect(globalThis.MONGODB_URI);
  db = connection.db(globalThis.getDatabase);
  // Inject DB for the API
  setDatabase(connection);
});

afterAll(async () => {
  await connection.close();
});

// --- TEST 1: GET ALL PRODUCTS ---
test("GET /product → returns array", async () => {
  const res = await request(app).get("/product");
  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});

// --- TEST 2: GET PRODUCT BY ID (valid) ---
test("GET /product/:id → returns single product", async () => {
  const mock = { productName: "Test", price: 10, stock: 5 };
  const { insertedId } = await db.collection("products").insertOne(mock);

  const res = await request(app).get(`/product/${insertedId}`);
  expect(res.statusCode).toBe(200);
  expect(res.body.productName).toBe("Test");
});

// --- TEST 3: GET PRODUCT BY INVALID ID ---
test("GET /product/invalid → returns 500", async () => {
  const res = await request(app).get("/product/123");
  expect(res.statusCode).toBe(500);
});

// --- TEST 4: GET PRODUCT BY NON-EXISTENT ID ---
test("GET /product/:id non-existent → 404", async () => {
  const validButMissing = "64df00f8d10a5f1e6cab1234";
  const res = await request(app).get(`/product/${validButMissing}`);
  expect(res.statusCode).toBe(404);
});
