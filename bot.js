require("dotenv").config();
const Discord = require('discord.js');
const Sequelize = require('sequelize');
const bot = new Discord.Client({disableEveryone: true});

//Configs
const DBLtoken = process.env.DBL_TOKEN
const ServerLogs = process.env.SERVERLOGS
const PREFIX = process.env.PREFIX1
const prefix = process.env.PREFIX2
console.log(`
- Public prefix: ${prefix}
- Admin prefix: ${PREFIX}
`)

//Quick Storing
const fs = require("fs");


//Database
const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const Tags = sequelize.define('tags', {
	name: {
		type: Sequelize.STRING,
		unique: true,
	},
	description: Sequelize.TEXT,
	username: Sequelize.STRING,
	usage_count: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false,
	},
});

//Ready
bot.once('ready', () => {
	
	//Sync Tags
	Tags.sync();

	//Ready Log
	console.log(`${bot.user.tag} has started up, nanodesu!
	`);

	 //Activity
	 const status = [`nanodesu | in ${bot.guilds.cache.size} servers | r!help`, `not pettan | in ${bot.guilds.cache.size} servers | r!help`, `boing boing | in ${bot.guilds.cache.size} servers | r!help`, `konrushi | in ${bot.guilds.cache.size} servers | r!help`]
	 setInterval(() => {
		let activities = status[Math.floor(Math.random() * status.length)];
		bot.user.setActivity((activities), {type: "PLAYING"}).catch(console.error)
	 }, 900000);

	 //Command Handler
	 const { Collection } = require("discord.js");
	 bot.commands = new Collection();
	 bot.aliases = new Collection();
	 
	 fs.readdir("./commands/", (err, files) => {
 
		 if(err) console.log(err);
	 
		 let jsfile = files.filter(f => f.split(".").pop() === "js");
		 if (jsfile.length <= 0) {
			 console.log(`- Couldn't find commands!
			 `);
			 return;
		 }
		 jsfile.forEach((f, i) => {
			 let pull = require(`./commands/${f}`);
			 console.log(`Loaded: ${f}`);
			 bot.commands.set(pull.config.name, pull);
			 pull.config.aliases.forEach(alias => {
			 bot.aliases.set(alias, pull.config.name)
			 
	   })

	})

	//dbl stats
	const superagent = require('superagent')

		superagent.post(`https://discordbots.org/api/bots/stats`)
	 .set('Authorization', `${DBLtoken}`)
	 .send({ server_count: bot.guilds && bot.guilds.cache.size ? bot.guilds.cache.size : (bot.Guilds ? bot.Guilds.cache.size : Object.keys(bot.Servers).length) })
	 .then(() => console.warn(`
	 Updated dbl server stats!`))
	 .catch(err => console.error(`Error updating dbl server stats: ${err.body || err}`));

	})

	 //Logs
	 console.warn(`Server information:
	 `)
	 bot.guilds.cache.forEach((guild) =>
	 console.log(`- Name: ${guild.name} | Members: ${guild.memberCount} | Region: ${guild.region} | Joined: ${guild.joinedAt} | ID: ${guild.id} | Owner: ${guild.ownerID}
	 `));
	 console.log(`Activity: ${status}`);
	 console.log(`Server count: ${bot.guilds.cache.size}`);
	 console.log(`User count: ${bot.users.cache.size}
	 `);
});
//Guild Create
bot.on('guildCreate', async (guild) => {

	let serverlogs = bot.channels.cache.get(`${ServerLogs}`)
	let Guildembed = new Discord.MessageEmbed()
	
	Guildembed.setAuthor("Guild Joined!", bot.user.displayAvatarURL())
	Guildembed.setDescription(`**${guild.name}**, has invited **Rushia** to their server!`)
	Guildembed.setColor('#adff2f')
	Guildembed.addFields({ name: 'Server Members:', value: `\`\`\`${guild.memberCount}\`\`\``, inline: false})
    Guildembed.addFields({ name: 'Region:', value: `\`\`\`${guild.region}\`\`\``, inline: false})
    Guildembed.addFields({ name: 'Guild ID:', value: `\`\`\`${guild.id}\`\`\``, inline: false})
	Guildembed.addFields({ name: 'Owner ID:', value: `\`\`\`${guild.ownerID}\`\`\``, inline: false})
	Guildembed.setFooter("Guild joined at", guild.iconURL())
	Guildembed.setTimestamp();

	serverlogs.send(Guildembed);
})
//Guild Delete
bot.on('guildDelete', async (guild) => {
	
	let serverlogs = bot.channels.cache.get(`${ServerLogs}`)
	let Guildembed = new Discord.MessageEmbed()

	Guildembed.setAuthor("Guild Left!", bot.user.displayAvatarURL())
	Guildembed.setDescription(`**${guild.name}**, has kicked **Rushia** from their server!`)
	Guildembed.setColor('#fd0e35')
	Guildembed.addFields({ name: 'Server Members:', value: `\`\`\`${guild.memberCount}\`\`\``, inline: false})
    Guildembed.addFields({ name: 'Region:', value: `\`\`\`${guild.region}\`\`\``, inline: false})
    Guildembed.addFields({ name: 'Guild ID:', value: `\`\`\`${guild.id}\`\`\``, inline: false})
	Guildembed.addFields({ name: 'Owner ID:', value: `\`\`\`${guild.ownerID}\`\`\``, inline: false})
	Guildembed.setFooter("Guild left at", guild.iconURL())
	Guildembed.setTimestamp();
	
	serverlogs.send(Guildembed);
})

bot.on('message', async message => {

	//Data Commands
	if (message.content.startsWith(PREFIX)) {
		const input = message.content.slice(PREFIX.length).trim().split(' ');
		const command = input.shift();
		const commandArgs = input.join(' ');

		if (command === 'addtag') {
			const splitArgs = commandArgs.split(' ');
			const tagName = splitArgs.shift();
			const tagDescription = splitArgs.join(' ');

			try {
				// equivalent to: INSERT INTO tags (name, descrption, username) values (?, ?, ?);
				const tag = await Tags.create({
					name: tagName,
					description: tagDescription,
					username: message.author.username,
				});
				return message.reply(`Tag ${tag.name} added.`);
			} catch (e) {
				if (e.name === 'SequelizeUniqueConstraintError') {
					return message.reply('That tag already exists.');
				}
				return message.reply('Something went wrong with adding a tag.');
			}
		} else if (command === 'tag') {
			const tagName = commandArgs;

			// equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
			const tag = await Tags.findOne({ where: { name: tagName } });
			if (tag) {
				// equivalent to: UPDATE tags SET usage_count = usage_count + 1 WHERE name = 'tagName';
				tag.increment('usage_count');
				return message.channel.send(tag.get('description'));
			}
			return message.reply(`Could not find tag: ${tagName}`);
		} else if (command === 'edittag') {
			const splitArgs = commandArgs.split(' ');
			const tagName = splitArgs.shift();
			const tagDescription = splitArgs.join(' ');

			// equivalent to: UPDATE tags (descrption) values (?) WHERE name = ?;
			const affectedRows = await Tags.update({ description: tagDescription }, { where: { name: tagName } });
			if (affectedRows > 0) {
				return message.reply(`Tag ${tagName} was edited.`);
			}
			return message.reply(`Could not find a tag with name ${tagName}.`);
		} else if (command === 'taginfo') {
			const tagName = commandArgs;

			// equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
			const tag = await Tags.findOne({ where: { name: tagName } });
			if (tag) {
				return message.channel.send(`${tagName} was created by ${tag.username} at ${tag.createdAt} and has been used ${tag.usage_count} times.`);
			}
			return message.reply(`Could not find tag: ${tagName}`);
		} else if (command === 'showtags') {
			// equivalent to: SELECT name FROM tags;
			const tagList = await Tags.findAll({ attributes: ['name'] });
			const tagString = tagList.map(t => t.name).join(', ') || 'No tags set.';
			return message.channel.send(`List of tags: ${tagString}`);
		} else if (command === 'removetag') {
			// equivalent to: DELETE from tags WHERE name = ?;
			const tagName = commandArgs;
			const rowCount = await Tags.destroy({ where: { name: tagName } });
			if (!rowCount) return message.reply('That tag did not exist.');
			return message.reply('Tag deleted.');
		}
	}

	//Public Commands
	if(message.author.bot) return undefined;
    let messageArray = message.content.split(" ")
    let cmd = messageArray[0];
    let args = messageArray.slice(1)

    //Commands
    if(!message.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))
	if(commandfile) commandfile.run(bot, message, args)
})

//Login
bot.login(process.env.BOT_TOKEN);