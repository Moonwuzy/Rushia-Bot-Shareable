const Discord = require('discord.js');
const api = require("imageapi.js")
module.exports.run = async (bot, message, args) => {
        let subreddits = [
            "Hololive",
            "VirtualYoutubers",
            "Nijisanji"
        ]
        let subreddit = subreddits[Math.floor(Math.random() * (subreddits.length))]
        let img = await api(subreddit)
        const HoloEmbed = new Discord.MessageEmbed()
        .setTitle(`${subreddit}`)
        .setColor("#d5ffd1")
        .setImage(img)
        .setFooter("Holomemes!");

        message.channel.send(HoloEmbed)
}

module.exports.config = {
    name: 'holomeme',
    aliases: ["hm"],
    description: "```Sends you a Vtuber meme or photo.```",
    category: "`Fun`",
    usage: "`r!holomeme`",
}
