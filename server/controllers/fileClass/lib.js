const user = require('../user/lib');
const fs = require('fs');
const { request } = require('../requestController');

const LIMITE_UPLOAD_FILE_SIZE = 500.0;

async function getClass(req, res) {
    if (user.connected(req, res))
        try {
            const { semester, idclass } = req.params;
            let value = {};
            value = (await request("select nom as title from COURS where id like $1 and idsemestre = $2 and idformation = $3", [idclass, semester, req.session.idformation]))[0]
            value.data = await request("select id, idauteur as creator, description, datefich as release_date, nom as title, typecours as type, path from fichier where idcours = $1 and idsemestre = $2 and idformation = $3", [idclass, semester, req.session.idformation]);
            return res.status(200).send(value);
        } catch (e) {
            console.log(e);
            return res.status(500).send("Server Error");
        }
}

async function addClass(req, res) {
    if (user.connected(req, res))
        try {
            if (req.files.content.size > LIMITE_UPLOAD_FILE_SIZE * 1000000)
                return res.status(406).send("Fichier trop grand");
            const { title, type, description } = req.query;
            const { semester, idclass } = req.params;
            if (!title || !type || !description || !req.files)
                return res.status(400).send("Requête invalide");
            let number = (await request("select id from fichier order by id desc limit 1"))[0];
            if (number)
                number = number.id + 1;
            else
                number = 1;

            const date = new Date().toISOString();
            let path = `assets/uploadingFile/${number}.${(req.files.content.name).split(".")[((req.files.content.name).split(".")).length - 1]}`;
            fs.writeFileSync(path, req.files.content.data);

            await request("insert into fichier values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)", [number, idclass, semester, req.session.idformation, title, date, req.session.user, path, type, description]);
            req.files = undefined;
            return res.status(200).send("Successful upload");
        } catch (e) {
            console.log(e);
            return res.status(500).send("Server Error");
        }
}

async function deleteClass(req, res) {
    if (user.connected(req, res))
        try {
            const { id } = req.body;
            if (!id)
                return res.status(400).send("Requête invalide");
            const fichier = (await request("select idauteur, path from fichier where id = $1", [id]))[0]
            if ((fichier.idauteur !== req.session.user) && !await user.permissions(req, undefined, 4))
                return res.status(403).send("You don't have permissions");
            await request("delete from fichier where id = $1", [id]);
            fs.unlinkSync(fichier.path);
            return res.status(200).send("Successful deletion");
        } catch (e) {
            console.log(e);
            return res.status(500).send("Server Error");
        }
}

async function getClassTitle(req, res){
    if (user.connected(req, res))
        try {
            const { semester, idclass } = req.params;
            return res.status(200).send((await request("select nom as title from COURS where id like $1 and idsemestre = $2 and idformation = $3", [idclass, semester, req.session.idformation]))[0]);
        } catch (e) {
            console.log(e);
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
exports.getClassTitle = getClassTitle;