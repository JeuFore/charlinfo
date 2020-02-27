const dataClass = require('../../assets/bdd/uploadingData.json')

async function getClass(req, res) {
    let Class = dataClass[req.params.class];
    if (Class)
        return res.status(200).json(Class);
    return res.status(200).json({
        request: null,
        text: "Aucun cours, exercices, corrigés, aides n'est répertoriés"
    });
}

async function addClass(req, res) {
    return null
}

async function deleteClass(req, res) {
    return null
}

exports.getClass = getClass;
exports.addClass = addClass;
exports.deleteClass = deleteClass