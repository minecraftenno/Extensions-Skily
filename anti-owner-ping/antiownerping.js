// A ne surtout pas toucher
const Discord = require("discord.js");

// Paramètres
const client = new Discord.Client({ ws: { properties: { $browser: "Discord iOS" }} }); // Enlever tout la ligne apres "Discord.Client" si vous ne voulez pas que votre bot s'affiche en mode mobile
const token = "Token de votre bot";
const ownerId = "ID de la personne a ne pas ping"

client.on("ready", () => {
    console.log("L'extension à bien été mise au bot " + client.user.username + " !\n");
    console.log(`ID du bot : ${client.user.id}`)
});

client.on("message", async message => {
    if (message.author.bot) return false;

    if(!message.member.hasPermission('MANAGE_CHANNELS')) {
        if (message.mentions.has(ownerId)) {
            await message.delete();
              return message.channel
              .send(`${message.author.username}, vous ne pouvez pas mentionner cette personne.`)
               .then((sent) => {
                 setTimeout(() => {
                   sent.delete();
                 }, 15000);
               });
        };
    }
});

client.login(token)
