const UploadingData = require('../../assets/bdd/uploadingData.json');
const User = require('../user/lib');
const fs = require('fs');

const LIMITE_UPLOAD_FILE_SIZE = 5.0;

async function getClass(req, res) {
    if (User.connected(req, res))
        try {
            const { semester, class_e } = req.params;
            if (User.connected(req, res))
                return res.status(200).send(UploadingData[semester][class_e] || []);
        } catch{

        }
}

async function addClass(req, res) {
    if (User.connected(req, res))
        try {
            if (req.files.content.size > LIMITE_UPLOAD_FILE_SIZE * 1000000)
                return res.status(406).send("Fichier trop grand");
            const { title, type, description } = req.query;
            const { semester, class_e } = req.params;
            let dataClass = UploadingData[semester];
            if (!title || !type || !description || !req.files)
                return res.status(400).send("Requête invalide");
            if (!fs.existsSync(`assets/uploadingFile/${semester}/${class_e}`)) {
                dataClass[class_e] = [];
                fs.mkdirSync(`assets/uploadingFile/${semester}/${class_e}`);
            }

            dataClass = UploadingData[semester][class_e]

            const date = new Date().toISOString();
            let path = `assets/uploadingFile/${semester}/${class_e}/${req.session.user}_${date}.${(req.files.content.name).split(".")[((req.files.content.name).split(".")).length - 1]}`;

            let value = {};

            value.title = title;
            value.type = type;
            value.description = description;
            value.creator = req.session.user;
            value.release_date = date;
            value.file = path;

            dataClass.push(value);

            fs.writeFileSync('assets/bdd/uploadingData.json', JSON.stringify(UploadingData));
            fs.writeFileSync(path, req.files.content.data);

            return res.status(200).send("Successful upload");
        } catch {
            return res.status(500).send("Server Error");
        }
}

async function deleteClass(req, res) {
    if (User.connected(req, res))
        try {
            const { path } = req.body;
            if (!path.includes(req.session.user) && !User.permissions(req, undefined, 4))
                return res.status(403).send("You don't have permissions");

            const { semester, class_e } = req.params;
            let dataClass = UploadingData[semester][class_e];
            if (!dataClass)
                return res.status(400).send("Requête invalide");
            let i = 0;
            let stop = false;
            while (i in dataClass && stop !== true) {
                if (dataClass[i].file === path)
                    stop = true;
                i++;
            }
            if (stop !== true)
                return res.status(400).send("Cours inexistant");
            dataClass.splice(i - 1, 1);
            fs.writeFileSync('assets/bdd/uploadingData.json', JSON.stringify(UploadingData));
            //fs.unlinkSync(path);
            return res.status(200).send("Successful deletion");
        } catch {
            return res.status(500).send("Server Error");
        }
}

async function downloadClass(req, res) {
    const { path } = req.query;
    return res.download(path);
}

exports.getClass = getClass;
exports.addClass = addClass;
exports.deleteClass = deleteClass;
exports.downloadClass = downloadClass;