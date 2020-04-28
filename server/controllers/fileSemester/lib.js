const user = require('../user/lib');
const { request } = require('../requestController');
const fs = require('fs');

async function getSemester(req, res) {
    const { semester } = req.params;
    if (user.connected(req, res))
        try {
            let data = await request("select cours.id, cours.nom as title, cours.description, color, type, count(fichier.id) as number from cours LEFT OUTER JOIN fichier on cours.id = fichier.idcours where cours.idsemestre = $1 and cours.idformation = $2 group by cours.id, cours.nom, cours.description, color, type", [semester.replace("S", ""), req.session.idformation]);
            for (let index = 0; index < data.length; index++) {
                let temp = await request("select nom || ' ' || prenom as label from ASSURER_COURS inner join PROFESSEUR P on ASSURER_COURS.idProf = P.id where idCours like $1", [data[index].id]);
                data[index].professor = temp;
            }
            return res.status(200).send(data);
        } catch (e) {
            console.log(e);
            return res.status(500).send("Server Error");
        }
}

async function addSemester(req, res) {
    if (user.connected(req, res))
        try {
            if (!await user.permissions(req, undefined, 4))
                return res.status(403).send("You don't have permissions");
            const { name, description, professor, type, id, color } = req.body;
            const { semester } = req.params;
            if (!name || !description || !professor || !type || !id || !color)
                return res.status(400).send("Requête invalide");
            if ((await request("select id from cours where id like $1 and idsemestre = $2 and idformation = $3", [id, semester, req.session.idformation]))[0])
                return res.status(409).send("Lien du cours déjà existant");
            await request("insert into cours values($1, $2, $3, $4, $5, $6, $7)", [id, name, req.session.idformation, semester, description, type, color]);
            await professor.forEach(element => {
                request("insert into ASSURER_COURS values($1, $2, $3, $4)", [id, element, req.session.idformation, semester]);
            });
            return res.status(200).send("Successful upload");
        } catch (e) {
            console.log(e);
            return res.status(500).send("Server Error");
        }
}

async function deleteSemester(req, res) {
    if (user.connected(req, res))
        try {
            if (!await user.permissions(req, undefined, 4))
                return res.status(403).send("You don't have permissions");
            const { id } = req.body;
            const { semester } = req.params;
            if (!id || !semester)
                return res.status(400).send("Requête invalide");
            if (!(await request("select id from cours where id like $1 and idsemestre = $2 and idformation = $3", [id, semester, req.session.idformation]))[0])
                return res.status(400).send("Cours inexistant");
            await request("delete from fichier where idcours like $1 and idsemestre = $2 and idformation = $3", [id, semester, req.session.idformation]);
            await request("delete from ASSURER_COURS where idcours like $1 and idsemestre = $2 and idformation = $3", [id, semester, req.session.idformation])
            await request("delete from cours where id like $1 and idsemestre = $2 and idformation = $3", [id, semester, req.session.idformation]);
            return res.status(200).send("Successful deletion");
        } catch (e) {
            console.log(e);
            return res.status(500).send("Server Error");
        }
}

async function getAllProfessor(req, res) {
    if (user.connected(req, res))
        try {
            return res.status(200).send(await request("select id as value, nom || ' ' || prenom as label from PROFESSEUR"));
        } catch (e) {
            console.log(e);
            return res.status(500).send("Server Error");
        }
}

exports.getSemester = getSemester;
exports.addSemester = addSemester;
exports.deleteSemester = deleteSemester;
exports.getAllProfessor = getAllProfessor;