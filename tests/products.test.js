const request = require("supertest");
const app = require("../app");
const { MongoClient } = require("mongodb");
const { getDatabase, setDatabase } = require("../data/database");
require("dotenv").config();
jest.setTimeout(20000); 


jest.setTimeout(20000);

let connection;
let db;

beforeAll(async () => {
  // connect to MongoDB
  connection = await MongoClient.connect(process.env.MONGODB_URI);
  db = connection.db("cse341Team");
  setDatabase(db);
});

afterAll(async () => {
  await connection.close();
});

// GET ALL PRODUCTS
test("GET /product → returns array", async () => {
  const res = await request(app).get("/product");
  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});

// GET PRODUCT BY VALID ID
test("GET /product/:id → returns single product", async () => {
  const db = getDatabase();

  const mock = { productName: "TestProduct", price: 99, stock: 3 };
  const { insertedId } = await db.collection("products").insertOne(mock);

  const res = await request(app).get(`/product/${insertedId}`);
  expect(res.statusCode).toBe(200);
  expect(res.body.productName).toBe("TestProduct");
});

// INVALID ID FORMAT
test("GET /product/invalid → returns 400", async () => {
  const res = await request(app).get("/product/123");
  expect(res.statusCode).toBe(400);
});

// VALID BUT NON-EXISTENT ID
test("GET /product/:id non-existent → 404", async () => {
  const fakeId = "64df00f8d10a5f1e6cab1234"; // valid ObjectId format
  const res = await request(app).get(`/product/${fakeId}`);
  expect(res.statusCode).toBe(404);
});
