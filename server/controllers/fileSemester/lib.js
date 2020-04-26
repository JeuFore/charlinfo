const user = require('../user/lib');
const { request } = require('../requestController');

async function getSemester(req, res) {
    const { semester } = req.params;
    if (user.connected(req, res))
        return res.status(200).send(await request("select cours.id, cours.nom as title, cours.description, professor,  color, link, type, count(fichier.id) as number from cours LEFT OUTER JOIN fichier on cours.id = fichier.idcours where idsemestre = $1 group by cours.id, cours.nom, cours.description, professor,  color, link, type", [semester.replace("S", "")]));
}

async function addSemester(req, res) {
    if (user.connected(req, res))
        try {
            if (!await user.permissions(req, undefined, 4))
                return res.status(403).send("You don't have permissions");
            const { title, description, professor, type, link, color } = req.body;
            const { semester } = req.params;
            if (!title || !description || !professor || !type || !link || !color)
                return res.status(400).send("Requête invalide");
            if ((await request("select id from cours where link like $1 and idsemestre = $2", [link, semester.replace("S", "")]))[0])
                return res.status(409).send("Lien du cours déjà existant");
            let number = (await request("select id from cours order by id desc limit 1"))[0].id;
            number++;
            await request("insert into cours values($1, $2, 1, $3, $4, $5, $6, $7, $8)", [number, title, semester.replace("S", ""), description, color, link, type, professor]);
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
            const { link } = req.body;
            const { semester } = req.params;
            const dataSemester = (await request("select id from cours where link LIKE $1 AND idsemestre = $2", [link, semester.replace("S", "")]))[0];
            if (!link || !semester)
                return res.status(400).send("Requête invalide");
            if (!dataSemester)
                return res.status(400).send("Cours inexistant");
            await request("delete from cours where id = $1", [dataSemester.id])
            return res.status(200).send("Successful deletion");
        } catch (e) {
            console.log(e);
            return res.status(500).send("Server Error");
        }
}

exports.getSemester = getSemester;
exports.addSemester = addSemester;
exports.deleteSemester = deleteSemester;