const translate = require('@vitalets/google-translate-api');
const Discord = require(`discord.js`);
module.exports.run = async (bot, message) => {

    let args = message.content.split(/[ ]+/);
    let lang = args[1];
    let suffix = args.slice(2).join(' ');
    let embed = new Discord.MessageEmbed()

    //No Text
    if (!suffix) {
        message.react('❌')
        message.delete({ timeout: 5000 });
        embed.setColor("#dc143c")
        embed.setDescription(`:warning: **${message.author.username}**, You didn't type the translate command correctly!\n\n**Usage:**\n\`\`\`r!translate [language] [text]\`\`\``)
                
        message.channel.send(embed).then(message => {
            message.delete({ timeout: 10000 }); })
    }
    //Tranlation
    if (!lang) return;
    translate(suffix, {to: lang}).then(res => {
        message.react('🦋');

        embed.setColor("#6afb92")
        embed.setAuthor(`Language detected: "${lang}"`)
        embed.setDescription(`\n\n**Original**: \`\`\`${suffix}\`\`\`\n**Translation**: \`\`\`${res.text}\`\`\``)
        embed.setTimestamp()
        embed.setFooter(`${message.author.username}`, message.author.displayAvatarURL());
    
        message.channel.send(embed);

    }).catch(error => {
        message.react('❔')
        message.delete({ timeout: 5000 });
        })

}
module.exports.config = {
    name: "translate",
    aliases: ["translate", "tr"],
    description: "```Translate text into any language you want.```",
    category: "`Tools`",
    usage: "`r!translate [language] [text]`",
}