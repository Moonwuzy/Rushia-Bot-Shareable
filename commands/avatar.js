const Discord = require('discord.js');
module.exports.run = async (bot, message, args) => {
    let pfp = new Discord.MessageEmbed();
    let user = message.mentions.users.first()
        if(message.content = !user) {
        pfp.setColor('RANDOM')
        pfp.setAuthor(`Rushia | ${message.author.username}'s Avatar`, bot.user.displayAvatarURL())
        pfp.setImage(message.author.displayAvatarURL({size: 256, dynamic: true}))
        pfp.setFooter(`${message.author.username}`, message.author.displayAvatarURL())
        pfp.setTimestamp();
        message.channel.send(pfp);
    } else {
        pfp.setColor('RANDOM')
        pfp.setAuthor(`Rushia | ${user.username}'s Avatar`, bot.user.displayAvatarURL())
        pfp.setImage(user.displayAvatarURL({size: 256, dynamic: true}))
        pfp.setFooter(`${message.author.username}`, message.author.displayAvatarURL())
        pfp.setTimestamp();
        message.channel.send(pfp);

    }
    
}
module.exports.config = {
name: 'avatar',
aliases: ["pfp"],
description: "```Show your or someone else's avatar.```",
category: "`Tools`",
usage: "`r!avatar` `r!pfp`",
}