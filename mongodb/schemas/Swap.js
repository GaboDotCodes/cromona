const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.Types;

const swapSchema = new Schema({
  sentBy: {
    type: ObjectId,
    ref: 'User',
  },
  receivedBy: {
    type: ObjectId,
    ref: 'User',
  },
  states: [
    {
      state: {
        type: String,
        enum: ['created', 'accepted', 'rejected', 'changed'],
        require: true,
      },
      changedBy: {
        type: ObjectId,
        ref: 'User',
        require: true,
      },
      changedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  album: {
    type: ObjectId,
    ref: 'Album',
  },
  senderToReceiver: [
    {
      type: ObjectId,
      ref: 'Sticker',
      require: true,
    },
  ],
  receiverToSender: [
    {
      type: ObjectId,
      ref: 'Sticker',
      require: true,
    },
  ],
});

module.exports = model('Swap', swapSchema);
