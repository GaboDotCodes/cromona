const firebaseAdmin = require('firebase-admin');

const getProfilePicture = async (uid) => {
  const { photoURL } = await firebaseAdmin.auth().getUser(uid);
  return photoURL;
};

module.exports = getProfilePicture;
