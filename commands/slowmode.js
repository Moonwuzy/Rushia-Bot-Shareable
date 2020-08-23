module.exports.run = async (bot, message, args) => {
        if (message.member.hasPermission('MANAGE_CHANNELS') || message.member.hasPermission('ADMINISTRATOR')){
            var time = message.content.split(' ').slice(1).join(' ')
            if(!time) return message.reply(`Please enter a time in seconds.`)
            message.channel.setRateLimitPerUser(time)
            message.channel.send(`The slowmode is set to ${time} seconds.`)
            } else {
                return message.channel.send('**You do not have the required permissions dummy!**');
            }
        }
module.exports.config = {
    name: 'slowmode',
    aliases: ["slow"],
    description: "```Sets a channel's slowmode in intervals of seconds.```",
    category: "`Moderation`",
    usage: "`r!slowmode [number]`",
}

