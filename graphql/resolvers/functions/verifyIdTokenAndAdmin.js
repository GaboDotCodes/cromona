const firebaseAdmin = require('firebase-admin');

const { ADMINS_EMAILS } = process.env;

const { emails } = JSON.parse(ADMINS_EMAILS);

const verifyIdTokenAndAdmin = async (authorization) => {
  const decodedIdToken = await firebaseAdmin.auth().verifyIdToken(authorization, true);
  const admin = emails.includes(decodedIdToken.email);
  if (!admin) {
    throw new Error(`You don't have enough permissions`);
  }
  return decodedIdToken;
};
module.exports = verifyIdTokenAndAdmin;
