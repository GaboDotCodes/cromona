const User = require('../../../mongodb/schemas/User');

const addUser = async (user) => {
  const userToSave = new User(user);
  const userSaved = await userToSave.save();
  return userSaved;
};

module.exports = addUser;
