const _ = require('lodash');
const Sticker = require('../../../mongodb/schemas/Sticker');
const Album = require('../../../mongodb/schemas/Album');

const addStickersToAlbumToReview = async (startSticker, finishSticker, album) => {
  const albumObj = await Album.findById(album);
  const stickersArray = _.range(startSticker, finishSticker + 1);
  const stickersPromises = stickersArray.map((number) => {
    const stickerToSave = new Sticker({
      album,
      number,
      title: `Sticker #${number}`,
    });
    return stickerToSave.save();
  });
  const stickersToAddToAlbum = await Promise.all(stickersPromises);
  const stickersIds = stickersToAddToAlbum.map((sticker) => sticker.id);
  albumObj.stickers.push({ $each: stickersIds });
  await albumObj.save();
  return albumObj;
};
module.exports = addStickersToAlbumToReview;
