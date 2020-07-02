const Collection = require('../../../mongodb/schemas/Collection');

const getUsersByAlbumId = async (album) => {
  const collectionsObj = await Collection.find({ album }).populate('user');
  const usersReturn = collectionsObj.map((collection) => collection.user);
  return usersReturn;
};

module.exports = getUsersByAlbumId;
