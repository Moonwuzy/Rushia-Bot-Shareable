module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        return message.reply("You do not have the `MANAGE_MESSAGES` permissions to perform the purge command!")
        .then(msg => {
        msg.delete({ timeout: 5000 });
    })
        
    }

    if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
        return message.reply("That's not a number!")
        .then(msg => {
        msg.delete({ timeout: 5000 });
    })

    }

    let deleteAmount;
    if (parseInt(args[0]) > 100) {
        deleteAmount = 100;
    } else {
        deleteAmount = parseInt(args[0]);
    }

    message.channel.bulkDelete(deleteAmount, true)
    .catch(err => message.channel.send(`You did not input the command correctly, ${err}`));
    message.channel.send(`Purged **${deleteAmount}** messages, nanodesu!`)
    .then(msg => {
    msg.delete({ timeout: 5000 });
})

}
module.exports.config = {
    name: 'purge',
    aliases: ["clear","pr"],
    description: "```Delete a certain amount of messages in a channel.```",
    category: "`Moderation`",
    usage: "`r!purge [# of msgs you want to purge]`",
}