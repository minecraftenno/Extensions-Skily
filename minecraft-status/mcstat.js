// Pour utiliser cette extension allez a la racine de votre bot et faites 'npm i minecraft-server-util@^3.4.2'
// Dès que c'est fait revenez sur ce fichier et configurer l'extension 😉
const util = require('minecraft-server-util');
const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "PREFIX DU BOT"
const token = "TOKEN DU BOT"

const SERVER_ADDRESS = 'IP DU SERVEUR';
const SERVER_PORT = PORT DU SERVEUR;
const STATUS_ERROR = 'Il y a eu une erreur.';
const STATUS_ONLINE = 'Le serveur **Minecraft** est **en ligne**  ';
const STATUS_PLAYERS = '**{online}** joueurs !';
const STATUS_EMPTY = '**Personne ne joue.**';
const IP_RESPONSE = 'L\'ip du serveur est `{address}:{port}`'; 

const STATUS_COMMAND = `${prefix}status`;
const IP_COMMAND = `${prefix}ip`;

const cacheTime = 15 * 1000; 
let data, lastUpdated = 0;

client.on('message', message => { 
    if(message.content.trim() == STATUS_COMMAND) {
        statusCommand(message);
    } else if(message.content.trim() == IP_COMMAND) {
        ipCommand(message);
    }
});
client.on("ready", () => {
    console.log("L'extension à bien été mise au bot " + client.user.username + " !");
});

function statusCommand(message) { 
    getStatus().then(data => {
        let status = STATUS_ONLINE;
        status += data.onlinePlayers ? 
            STATUS_PLAYERS.replace('{online}', data.onlinePlayers) : STATUS_EMPTY;
        message.reply(status);
    }).catch(err => {
        console.error(err);
        message.reply(STATUS_ERROR);
    })
}

function getStatus() {
    if (Date.now() < lastUpdated + cacheTime) return Promise.resolve(data);
    return util.status(SERVER_ADDRESS, { port: SERVER_PORT })
        .then(res => {
            data = res;
            lastUpdated = Date.now();
            return data;
        })
}

function ipCommand(message) { 
    const response = IP_RESPONSE
        .replace('{address}', SERVER_ADDRESS).replace('{port}', SERVER_PORT)
    message.reply(response);
}

client.login('token');
