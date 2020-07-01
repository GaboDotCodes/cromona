const { error } = console;
const addCollection = require('./functions/addCollection');
const addCollectionToUser = require('./functions/addCollectionToUser');

module.exports = {
  Mutation: {
    addCollection: async (_, { collection }) => {
      try {
        const collectionReturn = await addCollection(collection);
        await addCollectionToUser(collectionReturn.user, collectionReturn.id);
        return collectionReturn;
      } catch (e) {
        error(e);
        return e;
      }
    },
  },
};
