const fs = require('fs')
const { Client, Intents } = require('discord.js');
var logger = require('winston');
const main = require("./helperFunctions.js")

const signal = '!';

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
	colorize: true
});
logger.level = 'debug';

//environment variables configuration
const dotenv = require("dotenv");
dotenv.config();

global.rss_server = process.env.RSS_SERVER;

const intentConsts = [
	Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
	Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_PRESENCES,
	Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_TYPING,
	Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.MESSAGE_CONTENT, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
	Intents.FLAGS.DIRECT_MESSAGE_TYPING, Intents.FLAGS.GUILD_SCHEDULED_EVENTS
];

// Initialize Discord Bot
let bot = new Client({ intents: intentConsts });
bot.login(process.env.TOKEN);

//dynamically load commands (js command files)
bot.commands = new Map();
const cmdFiles = fs.readdirSync('./commands').filter(file => file.endsWith(".js"));
for (i = 0; i < cmdFiles.length; i++) {
	let cmd = require(`./commands/${cmdFiles[i]}`);
	bot.commands.set(cmd.name, cmd);
}

const TRACK_FILE = __dirname + "/data/track.json";
const CHECKED_FILE = __dirname + "/data/checked.json";

bot.on('ready', function (message, evt) {
	logger.info('Connected');
	logger.info('Logged in as: ');
	logger.info(bot.user.username + ' - (' + bot.user.id + ')');

	global.TRACK_FILE = TRACK_FILE;
	global.CHECKED_FILE = CHECKED_FILE;

	// if not exist, create the data dir
	if (!fs.existsSync("data")) {
		fs.mkdirSync("data");
		logger.info("Initialized the data directory");
	}

	const interval = 10 * 60 * 1000; // 10 mins
	setInterval(() => bot.commands.get("track").getUpdates(bot.channels), interval);
});

bot.on('message', function (message) {
	// Our bot needs to know if it will execute a command
	// It will listen for messages that will start with signal const (`!`)
	if (message.author.username === "SR Bot") return; //ignore messages from self
	let realMsg = message.content;
	let channel = message.channel;
	if (realMsg.substring(0, signal.length) === signal) {
		//convert text to lowercase, to make command case insensitive
		var args = main.cleanArgs(realMsg.substring(signal.length).split(" "));
		var cmd = args[0].toLowerCase();

		if (bot.commands.has(cmd)) //if command exist in loaded commands, execute from list
			bot.commands.get(cmd).execute({ channel, args, message, bot });
		else { //special case
			found = false;
			music = ["play", "skip", "stop", "next", "queue", "back", "details", "pause", "resume"];
			for (i = 0; i < music.length; i++)
				if (cmd === music[i]) {
					found = true;
					bot.commands.get("music").execute({ channel, args, message });
				}
			if (!found)
				main.post({ channel, msg: "Not sure I understand what it is you want..." });
		}
	}
});