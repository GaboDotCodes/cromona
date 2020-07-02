const Interest = require('../../../mongodb/schemas/Interest');

const addInterest = async (interest) => {
  const interestToSave = new Interest(interest);
  const interestSaved = await interestToSave.save();
  return interestSaved;
};

module.exports = addInterest;
