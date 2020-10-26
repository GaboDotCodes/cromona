const { Schema, model } = require('mongoose');
const shortid = require('shortid');
const { isEmail, isMobilePhone } = require('validator');

const validateContact = (detail) => (isEmail(detail) || isMobilePhone(detail, ['es-CO']));

const urlSchema = new Schema({
    uid: {
        type: String,
        default: shortid.generate,
    },
    name: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    contact: {
        type: String,
        validate: validateContact,
    },
    referedBy: {
        type: String,
    }
});

urlSchema.virtual('typeContact').get(() => isEmail(this.contact.detail) ? 'email' : 'telephone')

module.exports = model('Preview', urlSchema);
