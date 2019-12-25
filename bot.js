const fs = require('fs')
var Discord = require('discord.js');
var logger = require('winston');
var auth = require('./auth.json');
const main = require("./helperFunctions.js")

const signal = '!';

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
let bot = new Discord.Client();
bot.login(auth.token);

//dynamically load commands (js command files)
bot.commands = new Map();
const cmdFiles = fs.readdirSync('./commands').filter(file => file.endsWith(".js"));
for (i = 0; i < cmdFiles.length; i++) {
	let cmd = require(`./commands/${cmdFiles[i]}`);
	bot.commands.set(cmd.name, cmd);
} 

bot.on('ready', function (message, evt) {
    logger.info('Connected');
	logger.info('Logged in as: ');
	logger.info(bot.user.username + ' - (' + bot.user.id + ')');
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
			bot.commands.get(cmd).execute(channel, args, message);
		else { //special case
			found = false;
			music = ["play", "skip", "stop", "next", "queue", "back"]; 
			for (i = 0; i < music.length; i++)
				if (cmd === music[i]) {
					found = true;
					bot.commands.get("music").execute(channel, args, message);
				}
			if (!found)
				main.post(channel, "Not sure I understand what it is you want...");
		}
     }
});