const DataSemester = require('../../assets/bdd/dataSemester')
const user = require('../user/lib');
const fs = require('fs');

async function getSemester(req, res) {
    const { semester } = req.params;
    if (user.connected(req, res))
        return res.status(200).send(DataSemester[semester] || []);
}

async function addSemester(req, res) {
    if (user.connected(req, res))
        try {
            if (!user.permissions(req.session.user, 4))
                return res.status(403).send("You don't have permissions");
            const { title, description, professor, type, link } = req.body;
            const { semester } = req.params;
            if (!title || !description || !professor || !type || !link)
                return res.status(400).send("Requête invalide");
            if (searchExistSemester(DataSemester[semester], link).stop)
                return res.status(409).send("Lien du cours déjà existant");

            let value = {};

            value.title = title;
            value.type = type;
            value.description = description;
            value.professor = professor;
            value.link = link;

            DataSemester[semester].push(value);

            fs.writeFileSync('assets/bdd/dataSemester.json', JSON.stringify(DataSemester));

            return res.status(200).send("Successful upload");

        } catch {
            return res.status(500).send("Server Error");
        }
}

async function deleteSemester(req, res) {
    if (user.connected(req, res))
        try {
            if (!user.permissions(req.session.user, 4))
                return res.status(403).send("You don't have permissions");
            const { link } = req.body;
            const { semester } = req.params;
            let dataSemester = DataSemester[semester];
            if (!dataSemester)
                return res.status(400).send("Requête invalide");
            const search = searchExistSemester(dataSemester, link);
            if (!search.stop)
                return res.status(400).send("Cours inexistant");
            dataSemester.splice(search.i - 1, 1);
            fs.writeFileSync('assets/bdd/dataSemester.json', JSON.stringify(DataSemester));
            return res.status(200).send("Successful deletion");
        } catch {
            return res.status(500).send("Server Error");
        }
}

function searchExistSemester(dataSemester, link) {
    let i = 0;
    let stop = false;
    while (i in dataSemester && stop !== true) {
        if (dataSemester[i].link === link)
            stop = true;
        i++;
    }
    return { stop, i };
}

exports.getSemester = getSemester;
exports.addSemester = addSemester;
exports.deleteSemester = deleteSemester;