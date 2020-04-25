const { Client } = require('pg');

const client = new Client(require('../assets/.connect.json'));

client.connect();

/**
 * Fonction asynchrone qui retourne une promesse de résolution d'un requête SQL
 * @param {string} requete Requete SQL
 * @param {array} args (optionnel) Arguments de la requête
 * @returns {Promise} Promesse
 */
exports.request = async function (requete, args) {
    if (!args)
        return await (await client.query(requete)).rows
    return await (await client.query(requete, args)).rows;
}