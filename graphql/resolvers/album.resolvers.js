const { error } = console;
const addAlbum = require('./functions/addAlbum');
const getAllAlbums = require('./functions/getAllAlbums');
const getStickersByAlbumId = require('./functions/getStickersByAlbumId');
const searchAlbum = require('./functions/searchAlbum');
const getAlbumById = require('./functions/getAlbumById');

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
    searchAlbum: async (_, { searchTerm }) => {
      try {
        const albumsReturn = await searchAlbum(searchTerm);
        return albumsReturn;
      } catch (e) {
        error(e);
        return e;
      }
    },
    getAlbumById: async (_, { album }) => {
      try {
        const albumReturn = await getAlbumById(album);
        return albumReturn;
      } catch (e) {
        error(e);
        return e;
      }
    },
  },
  Album: {
    async stickers({ id }) {
      try {
        const stickersReturn = await getStickersByAlbumId(id);
        return stickersReturn;
      } catch (e) {
        error(e);
        return e;
      }
    },
  },
};
