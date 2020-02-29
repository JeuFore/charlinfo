const dataSemester = require('../../assets/bdd/dataSemester')

async function getSemester(req, res){
    let semester = dataSemester[req.params.semester];
    if (semester)
        return res.status(200).send(semester);
    return res.status(200).send("Aucun cours, exercices, corrigés, aides n'est répertorié");
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