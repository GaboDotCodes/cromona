const { error } = console;
const addAlbum = require('./functions/addAlbum');

module.exports = {
  Mutation: {
    addAlbum: async (_, { album }) => {
      try {
        const albumReturn = await addAlbum(album);
        return albumReturn;
      } catch (e) {
        error(e);
        return e;
      }
    },
  },
};
