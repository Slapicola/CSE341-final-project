const dotenv = require('dotenv');
dotenv.config();

const { MongoClient } = require('mongodb');

let database;

// Allow tests to inject their own DB
const setDatabase = (dbClient) => {
  database = dbClient;
};

// Support using Jest MongoDB URI when running tests
const getMongoUri = () => {
  if (process.env.JEST_WORKER_ID !== undefined) {
    return global.__MONGO_URI__;
  }
  return process.env.MONGODB_URI;
};

const initDb = async (callback) => {
  try {
    if (database) {
      console.log("Db is already initialized!");
      return callback(null, database);
    }

    const uri = getMongoUri();
    if (!uri) throw new Error("MongoDB URI not found");

    const client = await MongoClient.connect(uri);
    database = client;

    console.log("Database initialized successfully");
    callback(null, database);

  } catch (err) {
    console.error("Failed to initialize database", err);
    callback(err);
  }
};

const getDatabase = () => {
  if (!database) {
    throw Error("Database not initialized");
  }
  return database;
};

module.exports = {
  initDb,
  getDatabase,
  setDatabase
};
