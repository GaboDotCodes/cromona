const Short = require('../../mongodb/schemas/Short');

const findShortAndClick = async (shortUrl) => {
  const shortedUrl = await Short.findOneAndUpdate({ shortUrl }, { $push: { clicks: Date.now() } });
  return shortedUrl;
};

module.exports = findShortAndClick;