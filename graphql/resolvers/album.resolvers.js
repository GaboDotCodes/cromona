const { error } = console;
const verifyIdTokenAndAdmin = require('./functions/verifyIdTokenAndAdmin');
const verifyMatchUserIdAndToken = require('./functions/verifyMatchUserIdAndToken');
const addAlbum = require('./functions/addAlbum');
const getAllAlbums = require('./functions/getAllAlbums');
const getStickersByAlbumId = require('./functions/getStickersByAlbumId');
const searchAlbum = require('./functions/searchAlbum');
const getAlbumById = require('./functions/getAlbumById');
const countAlbumsStickers = require('./functions/countAlbumsStickers');
const getUsersByAlbumId = require('./functions/getUsersByAlbumId');
const addAlbumToReview = require('./functions/addAlbumToReview');
const addStickersToAlbumToReview = require('./functions/addStickersToAlbumToReview');
const addCollection = require('./functions/addCollection');
const addCollectionToUser = require('./functions/addCollectionToUser');
const getAllAlbumsToReview = require('./functions/getAllAlbumsToReview');

module.exports = {
  Mutation: {
    addAlbum: async (_, { album }, context) => {
      try {
        const { authorization } = context.headers;
        await verifyIdTokenAndAdmin(authorization);
        await verifyMatchUserIdAndToken(album.approvedBy, authorization);
        const albumReturn = await addAlbum(album);
        return albumReturn;
      } catch (e) {
        error(e);
        return e;
      }
    },
    addAlbumToReview: async (_, { album }, context) => {
      try {
        const { authorization } = context.headers;
        await verifyMatchUserIdAndToken(album.reviewRequestedBy, authorization);
        const albumToReviewReturn = await addAlbumToReview(album);
        const { startSticker, finishSticker } = album;
        await addStickersToAlbumToReview(startSticker, finishSticker, albumToReviewReturn.id);
        const collection = {
          user: album.reviewRequestedBy,
          album: albumToReviewReturn.id,
        };
        const collectionSaved = await addCollection(collection);
        await addCollectionToUser(album.reviewRequestedBy, collectionSaved.id);
        return collectionSaved;
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
    getAllAlbumsToReview: async (_, __, context) => {
      try {
        const { authorization } = context.headers;
        await verifyIdTokenAndAdmin(authorization);
        const albumsToReviewReturn = await getAllAlbumsToReview();
        return albumsToReviewReturn;
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
    async amountStickers({ id }) {
      try {
        const stickersCountedReturn = await countAlbumsStickers(id);
        return stickersCountedReturn;
      } catch (e) {
        error(e);
        return e;
      }
    },
    async users({ id }) {
      try {
        const usersByAlbum = await getUsersByAlbumId(id);
        return usersByAlbum;
      } catch (e) {
        error(e);
        return e;
      }
    },
  },
};
