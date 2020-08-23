module.exports.run = async (bot, message, args) => {
    message.delete({ timeout: 100 });
    let sentence = message.content.split(" ")
    sentence.shift();
    sentence = sentence.join(" ")
    message.channel.send(sentence);
}
module.exports.config = {
    name: 'say',
    aliases: ["repeat"],
    description: "```Have Rushia repeat what you say.```",
    category: "`Fun`",
    usage: "`r!say [sentence]`",
}