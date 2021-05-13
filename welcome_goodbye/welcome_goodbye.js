// A ne surtout pas toucher
const Discord = require("discord.js");

// Paramètres
const client = new Discord.Client({ ws: { properties: { $browser: "Discord iOS" }} }); // Enlever tout la ligne apres "Discord.Client" si vous ne voulez pas que votre bot s'affiche en mode mobile
const prefix = "Prefix du bot";
const token = "Token du bot";
const welcomeChannel = "L'id du salon de bienvenue"
const goodbyeChannel = "L'id du salon de aurevoir"

// Envoie un message dès que le bot est bien allumé
client.on("ready", () => {
    console.log("L'extension à bien été mise au bot " + client.user.username + " !");
});

client.on('guildMemberAdd', member => {
    member.guild.channels.cache.get(welcomeChannel).send(`${member} a rejoint le serveur. Nous sommes désormais ${member.guild.memberCount} ! 🎉`);
  })

client.on('guildMemberRemove', member => {
    member.guild.channels.cache.get(goodbyeChannel).send(`${member} a quitté le serveur 😢, nous sommes désormais ${member.guild.memberCount} ! 😔`)
})

client.on("message", message => {
    if(message.content.startsWith(`${prefix}viewconfig`)) {
        const viewconfig = new Discord.MessageEmbed()
            .setColor("#404040")
            .setTitle("Voici la config choisie :")
            .setDescription(`Salon de bienvenue : <#${welcomeChannel}>\nSalon pour les aurevoirs : <#${goodbyeChannel}>`)
            .setTimestamp()
            .setFooter(client.user.username+" Bot Modération fun etc !")
        if (message.member.hasPermission('MANAGE_MESSAGES')) {
            message.channel.send(viewconfig)
            }else{
                message.channel.send("Vous n'avez pas la permission de faire cela.")
            }
            
    }
});

client.login(token)
