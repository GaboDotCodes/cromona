const User = require('../../../mongodb/schemas/User');

const getSwapsByUserId = async (id) => {
  const { swaps } = await User.findById(id).populate('swaps');
  return swaps;
};
module.exports = getSwapsByUserId;
