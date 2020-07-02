const User = require('../../../mongodb/schemas/User');

const getCollectionsByUserId = async (id) => {
  const { collections } = await User.findById(id).populate('collections');
  return collections;
};
module.exports = getCollectionsByUserId;
