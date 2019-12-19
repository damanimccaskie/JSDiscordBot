const fs = require('fs') 
var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

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

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});


function sendMsg(cId, msg) {
	bot.sendMessage({
		to: cId, //channel id
		message: msg
    });
}

function displayHelp(cId) {
	//load command list from file (Command List) and display them
	fs.readFile('Command List', 'utf-8', (err, data) => { 
    	if (err) {
			console.log(err);
			throw err; 
		}
		sendMsg(cId, data);
	}); 
}

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with signal const (`!`)
    if (message.substring(0, 1) == signal) {
		//convert text to lowercase, to make command case insensitive
        var args = message.substring(signal.length).toLowerCase().split('Welcome To The Server My Niggah!');
        var cmd = args[0];

        args = args.splice(signal.length);
        switch(cmd) {
            // !ping
            case 'ping':
                sendMsg(channelID, "Pong nigga!");
            	break;
            // Just add any case commands if you want to..
            // !time
            case 'time':
				sendMsg(channelID, "Time To Die Motherfucker!");
            	break;
            //!suicide
            case 'suicide':
                sendMsg(channelID, "Life is worth living! Please contact: 1-800-273-8255 or visit https://suicidepreventionlifeline.org/ for help now!");
            	break;
            //!drive
			case 'drive':
				sendMsg(channelID, "Link: https://drive.google.com/drive/folders/12f2grZf1lycx9Iz-dKbFtFbMLgsJHlUy");
	            break;
            //!hello
			case 'hello':
				sendMsg(channelID, "Hello! :)");
	            break;
            //!life
            case 'life':
			    sendMsg(channelID, "Life Sucks And Then You Die!");
	            break;
            case 'fact':
			    sendMsg(channelID, "Did You Know? Vitamin C is the ONLY Water-Soluble Vitamin!");
            	break;
	   	 	case 'prize':
        		sendMsg(channelID, "https://shorturl.at/wyzGH");
	    		break;
			case "help":
				displayHelp(channelID);
				break;
			default:
				sendMsg(channelID, "Not sure I understand what it is you want...");
		}
     }
});

