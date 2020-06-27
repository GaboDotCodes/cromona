const { Schema, model } = require('mongoose');
const { isURL } = require('validator');

const { ObjectId } = Schema.Types;

const editionSchema = new Schema({
  album: {
    title: String,
    albumId: {
      type: ObjectId,
      ref: 'Album',
    },
  },
  tittle: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    validate: isURL,
  },
  editorial: {
    editorialName: {
      type: String,
    },
    editorialLogo: {
      type: String,
      validate: isURL,
    },
    editorialId: {
      type: ObjectId,
      ref: 'Editorial',
    },
  },
  launchedAt: {
    type: Date,
  },
  amountStickers: {
    type: Number,
    required: true,
  },
  amountPages: {
    type: Number,
  },
  groups: [
    new Schema({
      groupTitle: {
        type: String,
      },
      subgroups: [ObjectId],
      stickers: [
        {
          type: ObjectId,
          ref: 'Sticker',
        },
      ],
    }),
  ],
  pages: [
    {
      pageNumber: {
        type: Number,
      },
      stickers: [
        {
          type: ObjectId,
          ref: 'Sticker',
        },
      ],
    },
  ],
  compositions: [
    {
      image: {
        type: String,
        validate: isURL,
      },
      stickers: [
        {
          type: ObjectId,
          ref: 'Sticker',
        },
      ],
    },
  ],
  stickers: [
    {
      type: ObjectId,
      ref: 'Sticker',
    },
  ],
});

module.exports = model('Edition', editionSchema);
