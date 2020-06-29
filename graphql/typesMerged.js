const path = require('path');
const { loadFilesSync, mergeTypeDefs } = require('graphql-tools');

const typesArray = loadFilesSync(path.join(__dirname, './types/'));
module.exports = mergeTypeDefs(typesArray, { all: true });
