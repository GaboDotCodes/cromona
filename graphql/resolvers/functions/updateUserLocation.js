const User = require('../../../mongodb/schemas/User');

const updateUserLocation = async (userId, newLocation) => {
  const { lon, lat } = newLocation;
  const userReturn = await User.findByIdAndUpdate(userId, {
    'lastLocation.coordinates': [lon, lat],
    'lastLocation.lastUpdate': Date.now(),
  });
  return userReturn;
};

module.exports = updateUserLocation;
