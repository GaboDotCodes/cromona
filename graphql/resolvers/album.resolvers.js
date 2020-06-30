const { error } = console;
const addAlbum = require('./functions/addAlbum');
const getAllAlbums = require('./functions/getAllAlbums');

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
  Query: {
    getAllAlbums: async () => {
      try {
        const albumsReturn = await getAllAlbums();
        return albumsReturn;
      } catch (e) {
        error(e);
        return e;
      }
    },
  },
};
