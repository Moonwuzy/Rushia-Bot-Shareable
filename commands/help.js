const Discord = require('discord.js');
module.exports.run = async (bot, message, args) => {
    let helpArray = message.content.split(" ");
    let helpArgs = helpArray.slice(1);

    if(!helpArgs[0]) {
        var embed = new Discord.MessageEmbed()
            .setAuthor("All Rushia Commands", bot.user.displayAvatarURL())
            .setTitle("Rushia Help")
            .setDescription('To get more info on a command, use `r!help [command]`')
            .addFields({ name: '🦋Bot', value: '`help` `vote` `invite`', inline: false})
            .addFields({ name: '🛠Moderation', value: '`slowmode` `purge`', inline: false})
            .addFields({ name: '🔧Tools', value: '`poll` `avatar` `translate`', inline: false})
            .addFields({ name: '🍙Fun', value: '`holomeme` `hello` `say`', inline: false})
            .setColor('#d6d6ff')
            .setFooter("Invite Rushia to your own server by typing r!invite", bot.user.displayAvatarURL());
            
        message.channel.send(embed);
    }

    if(helpArgs[0]) {
        let command = helpArgs[0];

        if(bot.commands.has(command)) {
            
            command = bot.commands.get(command);
            let usage = command.config.usage
            let aliases = command.config.aliases
            let category = command.config.category

            var embed = new Discord.MessageEmbed()
            .setTitle(`**r!${command.config.name}**`)
            .setAuthor("Rushia | More Help", bot.user.displayAvatarURL())
            .setDescription(`${command.config.description || "There is no Description for this command."}`)
            .addFields({ name: 'Usages', value: (usage), inline: true})
            .addFields({ name: 'Aliases', value: (aliases), inline: true})
            .addFields({ name: 'Category', value: (category), inline: true})
            .setColor('#d6d6ff')

        message.channel.send(embed);

        }}
}

module.exports.config = {
    name: 'help',
    aliases: ["h"],
    category: "`Bot`",
    description: "```List all the commands for Rushia.```",
    usage: "`r!h` `r!help`",
}
