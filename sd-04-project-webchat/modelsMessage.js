const connection = require('./connection');

const createMessage = async (chatMessage, nickname, timestamp) => connection()
  .then((db) => db.collection('messages').insertOne({ chatMessage, nickname, timestamp }))
  .then(({ insertedId }) => ({
    chatMessage,
    nickname,
    timestamp,
    _id: insertedId,
  }));

const getAllMessages = async () => connection()
  .then((db) => db.collection('messages').find({}).toArray());

module.exports = {
  createMessage,
  getAllMessages,
};
