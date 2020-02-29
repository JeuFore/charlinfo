const UploadingData = require('../../assets/bdd/uploadingData.json');
const user = require('../user/lib');
const fs = require('fs');

async function getClass(req, res) {
    const { semester, class_e } = req.params;
    if (user.connected(req, res))
        if (!UploadingData[semester][class_e])
            return res.status(404).send("Class not found");
    return res.status(200).send(UploadingData[semester][class_e] || []);
}

async function addClass(req, res) {
    if (user.connected(req, res))
        try {
            const { title, type, description } = req.query;
            const { semester, class_e } = req.params;
            let dataClass = UploadingData[semester];
            if (!title || !type || !description || !req.files)
                return res.status(400).send("Requête invalide");
            if (!dataClass[class_e]) {
                dataClass[class_e] = [{}];
                fs.writeFileSync('assets/bdd/uploadingData.json', JSON.stringify(UploadingData));
                fs.mkdirSync(`assets/uploadingFile/${semester}/${class_e}`);
            }

            dataClass = UploadingData[semester][class_e]

            let nb_class = dataClass.length - 1;
            const date = new Date().toISOString();
            let path = `assets/uploadingFile/${semester}/${class_e}/${req.session.user}_${date}.${(req.files.content.name).split(".")[((req.files.content.name).split(".")).length - 1]}`;

            dataClass[nb_class].title = title;
            dataClass[nb_class].type = type;
            dataClass[nb_class].description = description;
            dataClass[nb_class].creator = req.session.user;
            dataClass[nb_class].release_date = date;
            dataClass[nb_class].file = path;
            dataClass[nb_class + 1] = {};

            fs.writeFileSync('assets/bdd/uploadingData.json', JSON.stringify(UploadingData));
            fs.writeFileSync(path, req.files.content.data);

            return res.status(200).send("Successful upload");
        } catch {
            return res.status(500).send("Server Error");
        }
}

async function deleteClass(req, res) {
    if (user.connected(req, res))
        try {
            const { path } = req.body;
            if (!path.includes(req.session.user) && !user.permissions(req.session.user, 4))
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
            fs.unlinkSync(path);
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