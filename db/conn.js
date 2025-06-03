const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);
let db;

async function connectToServer(callback) {
  try {
    await client.connect();
    db = client.db();
    console.log('Connected to MongoDB');
    callback();
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}

function getDb() {
  return db;
}

module.exports = { connectToServer, getDb };
