const User = require('../../../mongodb/schemas/User');

const getUserById = async (userId) => {
  const userReturn = await User.findById(userId);
  return userReturn;
};

module.exports = getUserById;
