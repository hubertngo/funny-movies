module.exports = {
  mongod: {
    url: process.env.MONGO_URL,
    name: 'mongod',
    connector: 'mongodb',
    allowExtendedOperators: true,
  },
};
