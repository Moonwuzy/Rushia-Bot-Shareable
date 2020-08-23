module.exports.run = async (bot, message, args) => {
    let replies = ["nanodesu", "Rushia boing boing, not pettan. RIGHT?", "Kon-peko.... Ugh I mean Kon-rushi! ", "Hi there little fandead-san!"]; 
    let random = replies[Math.floor(Math.random() * replies.length)];

    message.reply(random);
}

module.exports.config = {
    name: 'hello',
    aliases: ["hi", "Hi", "Rushia", "Hi Rushia", "nanodesu", "Nanodesu"],
    description: "```Rushia says hello!```",
    category: "`Fun`",
    usage: "`r!hello`",
}