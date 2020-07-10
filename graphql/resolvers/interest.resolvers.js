const { error } = console;
const verifyMatchUserIdAndToken = require('./functions/verifyMatchUserIdAndToken');
const addInterest = require('./functions/addInterest');
const getUserById = require('./functions/getUserById');

module.exports = {
  Mutation: {
    addInterest: async (_, { interest }, context) => {
      try {
        const { authorization } = context.headers;
        await verifyMatchUserIdAndToken(interest.by, authorization);
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
