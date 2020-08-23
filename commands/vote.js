module.exports.run = async (bot, message, args) => {
        
        message.channel.send("**Thank you for voting for me!** https://top.gg/bot/721984364958711830/vote");

}
module.exports.config = {
    name: 'vote',
    aliases: ["voting","v"],
    description: "```Vote for the Rushia bot.```",
    category: "`Bot`",
    usage: "`r!vote`",
}