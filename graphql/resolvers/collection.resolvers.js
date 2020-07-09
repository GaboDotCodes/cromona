const { error } = console;
const verifyMatchUserIdAndToken = require('./functions/verifyMatchUserIdAndToken');
const addCollection = require('./functions/addCollection');
const addCollectionToUser = require('./functions/addCollectionToUser');
const getAlbumById = require('./functions/getAlbumById');
const getCollectionWithStickers = require('./functions/getCollectionWithStickers');
const addStickerToCollection = require('./functions/addStickerToCollection');

module.exports = {
  Mutation: {
    addCollection: async (_, { collection }, context) => {
      try {
        const { authorization } = context.headers;
        await verifyMatchUserIdAndToken(collection.user, authorization);
        const collectionReturn = await addCollection(collection);
        await addCollectionToUser(collectionReturn.user, collectionReturn.id);
        return collectionReturn;
      } catch (e) {
        error(e);
        return e;
      }
    },
    addStickerToCollection: async (_, { operationDetail }, context) => {
      try {
        const { authorization } = context.headers;
        await verifyMatchUserIdAndToken(operationDetail.user, authorization);
        const stickerDetailReturn = await addStickerToCollection(operationDetail);
        return stickerDetailReturn;
      } catch (e) {
        error(e);
        return e;
      }
    },
    removeStickerFromCollection: async (_, { operationDetail }, context) => {
      try {
        const { authorization } = context.headers;
        await verifyMatchUserIdAndToken(operationDetail.user, authorization);
        const stickerDetailReturn = await addStickerToCollection(operationDetail, -1);
        return stickerDetailReturn;
      } catch (e) {
        error(e);
        return e;
      }
    },
  },
  Collection: {
    async album({ album }) {
      try {
        const albumReturn = await getAlbumById(album);
        return albumReturn;
      } catch (e) {
        error(e);
        return e;
      }
    },
    async stickersCollection({ id }) {
      try {
        const stickersCollectionReturn = await getCollectionWithStickers(id);
        return stickersCollectionReturn;
      } catch (e) {
        error(e);
        return e;
      }
    },
  },
};
