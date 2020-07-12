const firebaseAdmin = require('firebase-admin');

const getDisplayName = async (uid) => {
  const { displayName } = await firebaseAdmin.auth().getUser(uid);
  return displayName;
};

module.exports = getDisplayName;
