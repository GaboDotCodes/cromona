const path = require('path');
const fs = require('fs');
const { loadFilesSync, mergeTypeDefs } = require('graphql-tools');
const { print } = require('graphql');

const typesArray = loadFilesSync(path.join(__dirname, './types/'));
const typeDefs = mergeTypeDefs(typesArray, { all: true });
const printedTypeDefs = print(typeDefs);
fs.writeFileSync('joined.graphql', printedTypeDefs);
module.exports = typeDefs;
