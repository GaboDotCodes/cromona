const User = require('../../../mongodb/schemas/User');

const addCollectionToUser = async (user, collection) => {
  const userObj = await User.findById(user);
  userObj.collections.push(collection);
  await userObj.save();
  return 'Ok';
};

module.exports = addCollectionToUser;
