const { error } = console;
const verifyIdToken = require('./functions/verifyIdToken');
const verifyMatchUserIdAndToken = require('./functions/verifyMatchUserIdAndToken');
const addUser = require('./functions/addUser');
const getUserById = require('./functions/getUserById');
const getCollectionsByUserId = require('./functions/getCollectionsByUserId');
const getRatingsByUserId = require('./functions/getRatingsByUserId');
const getSwapsByUserId = require('./functions/getSwapsByUserId');
const getDisplayName = require('./functions/getDisplayName');
const getProfilePicture = require('./functions/getProfilePicture');
const updateUserLocation = require('./functions/updateUserLocation');
const getPeoplePossibleSwaps = require('./functions/getPeoplePossibleSwaps');

module.exports = {
  Mutation: {
    addUser: async (_, { user }, context) => {
      try {
        const { authorization } = context.headers;
        const { uid } = await verifyIdToken(authorization);
        if (uid !== user.uid) {
          throw new Error(`userId and token's uid don't match`);
        }
        const userSaved = await addUser(user);
        return userSaved;
      } catch (e) {
        error(e);
        return e;
      }
    },
    updateUserLocation: async (_, { newLocation, userId }, context) => {
      try {
        const { authorization } = context.headers;
        await verifyMatchUserIdAndToken(userId, authorization);
        const userReturn = await updateUserLocation(userId, newLocation);
        return userReturn;
      } catch (e) {
        error(e);
        return e;
      }
    },
  },
  Query: {
    getUserById: async (_, { user }, context) => {
      try {
        const { authorization } = context.headers;
        await verifyIdToken(authorization);
        const userReturn = await getUserById(user);
        return userReturn;
      } catch (e) {
        error(e);
        return e;
      }
    },
    getPeoplePossibleSwaps: async (_, { location, ratio, unit, userId }, context) => {
      try {
        const { authorization } = context.headers;
        await verifyMatchUserIdAndToken(userId, authorization);
        await updateUserLocation(userId, location);
        const peopleReturn = await getPeoplePossibleSwaps(location, ratio, unit, userId);
        return peopleReturn;
      } catch (e) {
        error(e);
        return e;
      }
    },
  },
  User: {
    async collections({ id }, _, context) {
      try {
        const { authorization } = context.headers;
        await verifyMatchUserIdAndToken(id, authorization);
        const collectionsReturn = await getCollectionsByUserId(id);
        return collectionsReturn;
      } catch (e) {
        error(e);
        return e;
      }
    },
    async ratings({ id }) {
      try {
        const RatingsReturn = await getRatingsByUserId(id);
        return RatingsReturn;
      } catch (e) {
        error(e);
        return e;
      }
    },
    async swaps({ id }, _, context) {
      try {
        const { authorization } = context.headers;
        await verifyMatchUserIdAndToken(id, authorization);
        const SwapsReturn = await getSwapsByUserId(id);
        return SwapsReturn;
      } catch (e) {
        error(e);
        return e;
      }
    },
    async displayName({ uid }) {
      try {
        const displayName = await getDisplayName(uid);
        return displayName;
      } catch (e) {
        error(e);
        return e;
      }
    },
    async profilePicture({ uid }) {
      try {
        const profilePicture = await getProfilePicture(uid);
        return profilePicture;
      } catch (e) {
        error(e);
        return e;
      }
    },
  },
};
