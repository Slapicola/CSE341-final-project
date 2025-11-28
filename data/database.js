const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let database;

const initDb = (callback) => {
    if (database) {
        console.log('Db is already initialized!');
        return callback(null, database);
    }
    MongoClient.connect(process.env.MONGODB_URI)
        .then((client) => {
            database = client;
            console.log('Database initialized successfully');
            callback(null, database);
        })
        .catch((err) => {
            console.error('Failed to initialize database', err);
            callback(err);
        });
};

const getDatabase = () => {
    if (!database) {
        throw Error('Database not initialized')
    }
    return database;
};

module.exports = {
    initDb,
    getDatabase
};