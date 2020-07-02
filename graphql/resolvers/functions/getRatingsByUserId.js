const User = require('../../../mongodb/schemas/User');

const getRatingsByUserId = async (id) => {
  const { ratings } = await User.findById(id).populate('ratings');
  return ratings;
};
module.exports = getRatingsByUserId;
