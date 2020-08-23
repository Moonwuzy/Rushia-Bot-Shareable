const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
    const inviteEmbed = new Discord.MessageEmbed()
        .setColor('#d6d6ff')
        .setTitle("Invite Rushia!")
        .setAuthor("Rushia Invite Menu", bot.user.displayAvatarURL())
        .setThumbnail('https://cdn.discordapp.com/attachments/724387760395255848/724949403265400882/Uruha.Rushia.full.2985749.jpg')
        .setDescription(`
        🦋Do you want Rushia in your server? **Click this link!** https://bit.ly/3dsda2o

        ❔Remember to join the **Rushia Support Server** if you need any help! https://discord.gg/4XaaEqX
         `)


        message.channel.send(inviteEmbed);
    }
    module.exports.config = {
        name: 'invite',
        aliases: ["i"],
        description: "```Invite Rushia to your server!```",
        category: "`Bot`",
        usage: "`r!invite` `r!i`",
    }