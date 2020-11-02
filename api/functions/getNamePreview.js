const Preview = require('../../mongodb/schemas/Preview');

const getNamePreview = async (uid) => {
    const obj = await Preview.findOne({ uid });
    if (!obj) throw 'Host no found'
    const { name } = obj;
    const nameCap = name.split(" ")[0].charAt(0).toUpperCase() + name.split(" ")[0].slice(1)
    return nameCap;
};

module.exports = getNamePreview;
