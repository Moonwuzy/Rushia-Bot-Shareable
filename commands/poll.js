const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
        message.delete({ timeout: 5000 });
        if (message.member.hasPermission('MANAGE_CHANNELS')){
        const messageArray = message.content.split(' ');
        const args = messageArray.slice(1);
        let pollChannel = message.mentions.channels.first();
        let pollDescription = args.slice(1).join(' ');

        let embedPoll = new Discord.MessageEmbed()
        .setTitle(pollDescription)
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter(message.author.username, message.author.displayAvatarURL())
        let msgEmbed = await pollChannel.send(embedPoll);
        await msgEmbed.react('✅')
        await msgEmbed.react('❌')
        await msgEmbed.react('❔')
        } else {
            return message.channel.send('**You do not have the required permissions to create a poll!**');

        }
    }
module.exports.config = {
    name: 'poll',
    aliases: ["poll"],
    description: "```Setup a poll where people react with  yes, no, or maybe.```",
    category: "`Tools`",
    usage: "`r!poll [#channel you want the poll in] (Write poll question here)`",
}
