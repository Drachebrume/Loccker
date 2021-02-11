const config = require('../config/config');
const MongoClient = require('mongodb').MongoClient;

async function connectDB () {
  return MongoClient.connect(config.url, { useUnifiedTopology: true});
};
module.exports = {
  connectDB: async function () {
    return MongoClient.connect(config.url, { useUnifiedTopology: true});
  },
  getAllDocs: async function (db, collectionName) {
    const collection = db.collection(collectionName);
    return collection.find({}).toArray();
  },
  getAllDatabases: async function (db) {
    return db.command({ listDatabases: 1 });
  },
  pushUser: async function (user) {
    const Mongo = await connectDB();
    const session = Mongo.db('session');
    const collection = session.collection('users');
    await collection.insert(user);
  },
  getUser: async function (mail) {
    const Mongo = await connectDB();
    const session = Mongo.db('session');
    const collection = session.collection('users');
    const projection = {
      "title": 1,
      "quantity": 1,
     }
    return collection.findOne({"_id": `loccker:${mail}`}, projection);
  }
};

