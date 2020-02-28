const dataClass = require('../../assets/bdd/dataClass')

async function getSemester(req, res){
    let semester = dataClass[req.params.semester];
    if (semester)
        return res.status(200).send(semester);
    return res.status(200).send({
        request: null,
        text: "Aucun cours, exercices, corrigés, aides n'est répertoriés"
    });
}

async function addSemester(req, res){
    return null
}

async function deleteSemester(req, res){
    return null
}

exports.getSemester = getSemester;
exports.addSemester = addSemester;
exports.deleteSemester = deleteSemester;