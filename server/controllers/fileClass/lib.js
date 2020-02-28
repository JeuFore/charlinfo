const uploadingData = require('../../assets/bdd/uploadingData.json')

async function getClass(req, res) {
    const { semester, class_e } = req.params;
    let dataSemester = uploadingData[semester][class_e];
    if (!dataSemester)
        return res.status(200).send("Aucun cours, exercices, corrigés, aides n'est répertoriés")
    return res.status(200).json(dataSemester);
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