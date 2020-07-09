const admin = require('firebase-admin');

const verifyIdToken = async (authorization) => {
  const info = await admin.auth().verifyIdToken(authorization, true);
  return info;
};
module.exports = verifyIdToken;
