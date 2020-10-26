const Preview = require('../../mongodb/schemas/Preview');

const getNamePreview = async (uid) => {
    const { name } = await Preview.findOne({ uid });
    const nameCap = name.split(" ")[0].charAt(0).toUpperCase() + name.split(" ")[0].slice(1)
    return nameCap;
};

module.exports = getNamePreview;
