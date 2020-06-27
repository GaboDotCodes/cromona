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
        enum: [
          'created',
          'accepted',
          'rejected',
          'changed',
          'firstChecked',
          'secondChecked',
          'confirmed',
          'openDispute',
          'closedDispute',
          'canceled',
        ],
        require: true,
      },
      newStateBy: {
        type: ObjectId,
        ref: 'User',
      },
      changedAt: {
        type: Date,
        require: true,
      },
      detail: {
        colecctionDB: {
          type: String,
        },
        id: {
          type: ObjectId,
        },
      },
    },
  ],
  senderToReceiver: [
    {
      type: ObjectId,
      require: true,
    },
  ],
  receiverToSender: [
    {
      type: ObjectId,
      require: true,
    },
  ],
});

module.exports = model('Swap', swapSchema);
