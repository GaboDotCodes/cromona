const Short = require('../../mongodb/schemas/Short');

const shortUrl = async (longUrl) => {
  const shortedUrl = await Short.findOneAndUpdate({ longUrl }, { longUrl }, { upsert: true, setDefaultsOnInsert: true, new: true });
  return shortedUrl;
};

module.exports = shortUrl;