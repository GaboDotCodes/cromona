const firebaseAdmin = require('firebase-admin');

const verifyIdToken = async (authorization) => {
  const decodedIdToken = await firebaseAdmin.auth().verifyIdToken(authorization, true);
  return decodedIdToken;
};
module.exports = verifyIdToken;
