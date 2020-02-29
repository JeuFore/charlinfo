const uploadingData = require('../../assets/bdd/uploadingData.json');
const user = require('../user/lib');
const fs = require('fs');

async function getClass(req, res) {
    if (!req.session.user)
        return res.status(401).send("Vous n'êtes pas authentifier");
    const { semester, class_e } = req.params;
    let dataSemester = uploadingData[semester][class_e];
    if (!dataSemester)
        return res.status(400).send("Aucun cours, exercices, corrigés, aides n'est répertoriés");
    return res.status(200).send(dataSemester);
}

async function addClass(req, res) {
    if (!req.session.user)
        return res.status(401).send("Vous n'êtes pas authentifier");
    if (!user.permissions(req.session.user, 4))
        return res.status(401).send("Vous n'avez pas les autorisations nécessaires");
    const { title, type, description } = req.query;
    const { semester, class_e } = req.params;
    let dataSemester = uploadingData[semester];
    if (!title || !type || !description || !req.files)
        return res.status(400).send("Requête invalide");
    if (!dataSemester[class_e]) {
        dataSemester[class_e] = [{}];
        fs.writeFileSync('assets/bdd/uploadingData.json', JSON.stringify(uploadingData));
        fs.mkdirSync(`assets/uploadingFile/${semester}/${class_e}`);
    }

    dataSemester = uploadingData[semester][class_e]

    let nb_class = dataSemester.length - 1;
    const date = new Date().toISOString();
    let path = `assets/uploadingFile/${semester}/${class_e}/${req.session.user}_${date}.${(req.files.content.name).split(".")[((req.files.content.name).split(".")).length - 1]}`;

    dataSemester[nb_class].title = title;
    dataSemester[nb_class].type = type;
    dataSemester[nb_class].description = description;
    dataSemester[nb_class].creator = req.session.user;
    dataSemester[nb_class].release_date = date;
    dataSemester[nb_class].file = path;
    dataSemester[nb_class + 1] = {};

    fs.writeFileSync('assets/bdd/uploadingData.json', JSON.stringify(uploadingData));
    fs.writeFileSync(path, req.files.content.data);

    return res.status(200).send("Uploading réussit");
}

async function deleteClass(req, res) {
    if (!req.session.user)
        return res.status(401).send("Vous n'êtes pas authentifier");
    if (!user.permissions(req.session.user, 4))
        return res.status(401).send("Vous n'avez pas les autorisations nécessaires");
    const { path } = req.body;
    const { semester, class_e } = req.params;
    let dataSemester = uploadingData[semester][class_e];
    if (!dataSemester)
        return res.status(400).send("Requête invalide");
    let i = 0;
    let stop = false;
    while (i in dataSemester && stop !== true) {
        if (dataSemester[i].file === path)
            stop = true;
        i++;
    }
    if (stop !== true)
        return res.status(400).send("Cours inexistant");
    dataSemester.splice(i - 1, 1);
    fs.writeFileSync('assets/bdd/uploadingData.json', JSON.stringify(uploadingData));
    fs.unlinkSync(path);
    return res.status(200).send("Suppression réussite");
}

async function downloadClass(req, res) {
    const { path } = req.query;
    return res.download(path);
}

exports.getClass = getClass;
exports.addClass = addClass;
exports.deleteClass = deleteClass;
exports.downloadClass = downloadClass;