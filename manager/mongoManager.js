const config = require('../config/config');
const MongoClient = require('mongodb').MongoClient;
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
    const session = Mongo.db('session');
    const collection = session.collection('users');
    await collection.insert(user);
  },
};

