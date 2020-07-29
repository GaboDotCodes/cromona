const Validation = require('../../mongodb/schemas/Validation');

const registervalidation = async (route, utmCampaign) => {
  const validationToSave = new Validation({ route, utmCampaign });
  const validationSaved = await validationToSave.save();
  return validationSaved;
};

module.exports = registervalidation;
