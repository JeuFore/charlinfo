const { request } = require('./controllers/requestController');

const WebsocketManager = function WebsocketManager(wss, req) {
    this.wss = wss;
    this.connections = {};
};

/**
 * @description Send a websocket message to the user.
 * @param {Object} event - Event.
 * @example
 * sendMessageUser(event);
 */

async function verificationNotification(userId) {
    const res = await request("select * from notification where iduser like $1 and show = 1", [userId]);
    let message = {};
    res.forEach(element => {
        message.title = element.title;
        message.description = element.description;
        message.date = element.date;
        this.connections[userId].client.send(JSON.stringify({ id: element.type, message }));
    });
    await request("update notification set show = 0 where iduser like $1", [userId]);
}

async function sendMessageUser(userId, data) {
    if (!this.connections[userId]) {
        let number = (await request("select id from notification order by id desc limit 1"))[0];
        if (number) number = number.id + 1;
        else number = 1;
        const date = data.message.date;
        await request("insert into notification values($1, $2, $3, $4, $5, $6, $7)", [number, userId, data.message.title, data.message.description, date, 1, data.type]);
        return 0;
    }
    this.connections[userId].client.send(JSON.stringify(data));
}

/**
 * @description Send a websocket message to all user.
 * @param {Object} event - Event.
 * @example
 * sendMessageAllUsers(event);
 */
async function sendMessageAllUsers(data) {
    if (data.type !== 0) {
        const user = await request("select id from compte");
        let number = (await request("select id from notification order by id desc limit 1"))[0];
        if (number) number = number.id + 1;
        else number = 1;
        const date = data.message.date;

        user.forEach(element => {
            request("insert into notification values($1, $2, $3, $4, $5, $6, $7)", [number, element.id, data.message.title, data.message.description, date, 1, data.type]);
            number++;
        });
    }

    const usersIds = Object.keys(this.connections);

    usersIds.forEach((userId) => {
        this.connections[userId].client.send(JSON.stringify(data));
        request("update notification set show = 0 where iduser like $1", [userId]);
    });
}

/**
 * @description When a user is connected.
 * @param {Object} user - User Object.
 * @param {Object} client - Websocket client.
 * @example
 * userConnected(user, ws);
 */
function userConnected(user, client) {
    if (!this.connections[user]) {
        this.connections[user] = {};
    }
    this.connections[user] = { user, client };

    this.verificationNotification(user);

    return null;
}

/**
 * @description When a user is disconnected.
 * @param {Object} user - User Object.
 * @param {Object} client - Websocket client.
 * @example
 * userDisconnected(user, ws);
 */
function userDisconnected(user) {
    if (!this.connections[user]) {
        this.connections[user] = [];
    }
    delete this.connections[user];
    return null;
}

/**
 * @description Init websocket server.
 * @example
 * init();
 */
function init() {
    this.wss.on('connection', (ws) => {
        ws.on('message', async (id) => {
            try {
                this.userConnected(id, ws);
            } catch (e) {
                console.log(e);
                ws.close(4000);
            }
        });
    });
    return null;
}

WebsocketManager.prototype.init = init;
WebsocketManager.prototype.userConnected = userConnected;
WebsocketManager.prototype.userDisconnected = userDisconnected;
WebsocketManager.prototype.sendMessageUser = sendMessageUser;
WebsocketManager.prototype.sendMessageAllUsers = sendMessageAllUsers;
WebsocketManager.prototype.verificationNotification = verificationNotification;

module.exports = WebsocketManager;