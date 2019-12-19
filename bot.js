const fs = require('fs')
var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

let servers = {};

const ytdl = require("ytdl-core");
const signal = '!';
const version = "2019-12-19 2:26"
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

bot.on('ready', function (message, evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
	logger.info(bot.username + ' - (' + bot.id + ')');
	//console.log(message);
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
		sendMsg(cId, "Version: "+version);
		sendMsg(cId, data.replace(/!/g, ""));
	});
}

bot.on('message', function (user, user_id, channelID, realMsg, message) {
    // Our bot needs to know if it will execute a command
	// It will listen for messages that will start with signal const (`!`)
	if (message.d.author.username === "SR Bot") return; //ignore messages from self
    if (realMsg.substring(0, signal.length) === signal) {
		//convert text to lowercase, to make command case insensitive
        var args = realMsg.substring(signal.length).toLowerCase().split(" ");
		var cmd = args[0];

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
			case "clear": //this command may need the bot to be an admin
				console.log(bot.channels[channelID]);
				//bot.messageDeleteBulk(!args[1] ? 100 : args[1] > 100 || args < 2 ? 2 : args[1]); //complex :)
				break;

			//separate music functions from other commands
			case "play":
			case "pause":
			case "skip":
			case "stop":
				//music(channelID, message, cmd, args, user);
				break;
			default:
				sendMsg(channelID, "Not sure I understand what it is you want...");
		}
     }
});

function play(connection, server) {
	server.dispatcher = connection.playStream(ytdl(server.queue[0], { filter: (format) => format.container === 'm4a' }));
	server.queue.shift();

	server.dispatcher.on("end", function() {
		if (server.queue[0])
			play(connection, server.queue[0], server);
		//else disconnect i guess
	})
}

function music(c_id, msg, action, args, user) {
	if (!args[1])
		sendMsg(c_id, "Kinda need a lil more info than that...");
	else if (args.length > 2) {
		//check for if person trying to search for a song
	} else {
		if (!servers[msg.d.guild_id]) servers[msg.d.guild_id] = {
			queue: []
		}; //create a queue for this server if it does not exist*/

		//console.log(msg);
		//console.log(bot.users);

		/*if (!user.voiceChannel)
			sendMsg(c_id, "You need to be in the voice channel to have me play music");
		else {*/
			let server = servers[0];

			//Get bot to join voice channel
			console.log(msg.member);
			bot.channels['654695814228082718'].join().then(function(connection) {
				if (action === "play") {
					server.queue.push(args[1]); //add link to queue
					play(connection, server);
				} else if (action === "stop")
					sendMsg(c_id, "Programmers in get to this part yet srry...");//stop();
				else if (action == "pause")
					sendMsg(c_id, "Programmers in get to this part yet srry...");//pause();
				else
					sendMsg(c_id, "Programmers in get to this part yet srry...");//skip();
			})
		//}
	}
}
