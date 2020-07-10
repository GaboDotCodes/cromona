const firebaseAdmin = require('firebase-admin');
const User = require('../../../mongodb/schemas/User');

const verifyIdTokenAndAdmin = async (userId, authorization) => {
  const decodedIdToken = await firebaseAdmin.auth().verifyIdToken(authorization, true);
  const { uid } = decodedIdToken;
  const userObj = await User.findById(userId);
  const match = uid === userObj.uid;
  if (!match) {
    throw new Error(`User Id and Token's user don't match`);
  }
  return decodedIdToken;
};

module.exports = verifyIdTokenAndAdmin;
