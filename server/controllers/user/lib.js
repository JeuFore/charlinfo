const Users = require('../../assets/bdd/user');
const UploadingData = require('../../assets/bdd/uploadingData.json');

async function getUser(req, res) {
    if (connected(req, res))
        try {
            const { user } = req.params;
            const findEnterUser = Users[user];
            if (req.session.user !== user && !permissions(req, undefined, 4))
                return res.status(403).send("You don't have permissions");
            return res.status(200).send(findEnterUser.information);
        }
        catch {
            return res.status(404).send("User not found");
        }
}

async function banUser(req, res) {
    return null
}

async function unbanUser(req, res) {
    return null
}

function permissions(req, res, grade) {
    if (connected(req, res))
        try {
            if (!res)
                return Users[req.session.user].information.grade >= grade;
            return res.status(200).send(Users[req.session.user].information.grade >= req.body.grade);
        }
        catch {
            return res.status(404).send("User not found");
        }
}

async function disconnect(req, res) {
    req.session.user = undefined;
    return res.status(200).send("Success disconnect");
}

function connected(req, res) {
    if (!req.session.user)
        res.status(401).send("Not connected");
    return (req.session.user !== undefined);
}

async function upload(req, res) {
    const { user } = req.params;
    //if (connected(req, res))

    let first_tab = Object.keys(UploadingData);
    let secondtab = [];

    let test;

    const result = first_tab.map((key) => {
        secondtab = Object.keys(UploadingData[key]);
        secondtab.map((key2) => {
            test = UploadingData[key][key2]
            if (test !== undefined) {
                if (test.filter(data => data.creator === "jeufore") !== undefined)
                    testbis += test.filter(data => data.creator === "jeufore");
            }
        })
    })
    return res.status(200).send(result)
}

exports.getUser = getUser;
exports.banUser = banUser;
exports.unbanUser = unbanUser;
exports.permissions = permissions;
exports.disconnect = disconnect;
exports.connected = connected;
exports.upload = upload;