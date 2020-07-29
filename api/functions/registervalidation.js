const Validation = require('../../mongodb/schemas/Validation');

const registervalidation = async (route) => {
  const validationToSave = new Validation({ route });
  const validationSaved = await validationToSave.save();
  return validationSaved;
};

module.exports = registervalidation;
