const config = require('../config/config');
const MongoClient = require('mongodb').MongoClient;
const mongoCfg = config.mongo;
async function connectDB () {
  return MongoClient.connect(mongoCfg.url, { useUnifiedTopology: true});
};
module.exports = {
  connectDB: async function () {
    return MongoClient.connect(mongoCfg.url, { useUnifiedTopology: true});
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
    await collection.insertOne(user);
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
  },
  updateUser: async function(user) {
    const Mongo = await connectDB();
    const session = Mongo.db('session');
    const collection = session.collection('users');
    await collection.findOneAndReplace({"_id": user._id}, user);
  },
  deleteUser: async function(user) {
    const Mongo = await connectDB();
    const session = Mongo.db('session');
    const collection = session.collection('users');
    return collection.findOneAndDelete({"_id": user._id});
  },


  pushToken: async function (token) {
    const Mongo = await connectDB();
    const session = Mongo.db('session');
    const collection = session.collection('token');
    await collection.insertOne(token);
  },
  getToken: async function (userId) {
    const Mongo = await connectDB();
    const session = Mongo.db('session');
    const collection = session.collection('token');
    const projection = {
      "title": 1,
      "quantity": 1,
    }
    return collection.findOne({"userId": `${userId}`}, projection);
  },

  deleteToken: async function(userId) {
    const Mongo = await connectDB();
    const session = Mongo.db('session');
    const collection = session.collection('token');
    return collection.findOneAndDelete({"userId": userId});
  }
};

