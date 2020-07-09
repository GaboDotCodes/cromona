const firebaseAdmin = require('firebase-admin');

const { ADMINS_EMAILS } = process.env;

const { emails } = JSON.parse(ADMINS_EMAILS);

const verifyIdToken = async (authorization) => {
  const { email, uid } = await firebaseAdmin.auth().verifyIdToken(authorization, true);
  const admin = emails.includes(email);
  return { uid, admin };
};
module.exports = verifyIdToken;
