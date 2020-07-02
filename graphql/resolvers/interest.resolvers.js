const { error } = console;
const addInterest = require('./functions/addInterest');
const getUserById = require('./functions/getUserById');

module.exports = {
  Mutation: {
    addInterest: async (_, { interest }) => {
      try {
        const interestReturn = await addInterest(interest);
        return interestReturn;
      } catch (e) {
        error(e);
        return e;
      }
    },
  },
  Interest: {
    async by({ by }) {
      try {
        const userReturn = await getUserById(by);
        return userReturn;
      } catch (e) {
        error(e);
        return e;
      }
    },
    async to({ to }) {
      try {
        const userReturn = await getUserById(to);
        return userReturn;
      } catch (e) {
        error(e);
        return e;
      }
    },
  },
};
