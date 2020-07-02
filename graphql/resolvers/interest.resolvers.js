const { error } = console;
const addInterest = require('./functions/addInterest');

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
};
