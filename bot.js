const fs = require('fs')
var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
const main = require("./helperFunctions.js")

let servers = {};

const ytdl = require("ytdl-core");
const signal = '!';

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
let bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

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
	logger.info(bot.username + ' - (' + bot.id + ')');
	//console.log(message);
});

bot.on('message', function (user, user_id, channelID, realMsg, message) {
    // Our bot needs to know if it will execute a command
	// It will listen for messages that will start with signal const (`!`)
	if (message.d.author.username === "SR Bot") return; //ignore messages from self
    if (realMsg.substring(0, signal.length) === signal) {
		//convert text to lowercase, to make command case insensitive
        var args = realMsg.substring(signal.length).toLowerCase().split(" ");
		var cmd = args[0];
		
		//i always optimizing :)
		if (bot.commands.has(cmd)) //if command exist in loaded commands, execute from list
			bot.commands.get(cmd).execute(bot, channelID, args);
		else { //special case
			found = false;
			/*music = ["play", "pause", "skip", "stop"]; 
			for (i = 0; i < music.length; i++)
				if (cmd === music[i]) {
					found = true;
					bot.commands.get("music").execute(bot, channelID, message, cmd, args, user);
				}
			*/
			if (!found)
				main.sendMsg(bot, channelID, "Not sure I understand what it is you want...");
		}
     }
});