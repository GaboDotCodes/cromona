const { error } = console;
const addUser = require('./functions/addUser');

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
};
