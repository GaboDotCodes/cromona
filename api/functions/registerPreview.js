const Preview = require('../../mongodb/schemas/Preview');

const registerPreview = async (name, contact, referedBy) => {
    if (referedBy) {
        const registeredPreview = await Preview.findOne({ uid: referedBy });
        if (!registeredPreview) throw 'No hay nadie registrado con esa referencia'
        if ( registeredPreview.contact === contact ) throw 'No te puedes referir a ti mismo'
    }

    const registered = await Preview.findOne({ contact } )
    if (registered) return registered;

    const registeredPreview = await Preview.create({ name, contact , referedBy });
    return registeredPreview;
};

module.exports = registerPreview;
