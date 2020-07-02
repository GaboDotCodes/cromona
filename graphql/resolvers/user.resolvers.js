const { error } = console;
const addUser = require('./functions/addUser');
const getUserById = require('./functions/getUserById');
const getCollectionsByUserId = require('./functions/getCollectionsByUserId');
const getRatingsByUserId = require('./functions/getRatingsByUserId');
const getSwapsByUserId = require('./functions/getSwapsByUserId');

module.exports = {
  Mutation: {
    addUser: async (_, { user }) => {
      try {
        const userSaved = await addUser(user);
        return userSaved;
      } catch (e) {
        error(e);
        return e;
      }
    },
  },
  Query: {
    getUserById: async (_, { user }) => {
      try {
        const userReturn = await getUserById(user);
        return userReturn;
      } catch (e) {
        error(e);
        return e;
      }
    },
  },
  User: {
    async collections({ id }) {
      try {
        const collectionsReturn = await getCollectionsByUserId(id);
        return collectionsReturn;
      } catch (e) {
        error(e);
        return e;
      }
    },
    async ratings({ id }) {
      try {
        const RatingsReturn = await getRatingsByUserId(id);
        return RatingsReturn;
      } catch (e) {
        error(e);
        return e;
      }
    },
    async swaps({ id }) {
      try {
        const SwapsReturn = await getSwapsByUserId(id);
        return SwapsReturn;
      } catch (e) {
        error(e);
        return e;
      }
    },
  },
};
