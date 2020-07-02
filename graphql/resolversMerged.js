const path = require('path');
const { mergeResolvers, loadFilesSync } = require('graphql-tools');

const resolversArray = loadFilesSync(path.join(__dirname, './resolvers/*.resolvers.*'), {
  extensions: ['.js'],
});

module.exports = mergeResolvers(resolversArray);
