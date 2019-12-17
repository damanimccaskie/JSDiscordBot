var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split('Welcome To The Server My Niggah!');
        var cmd = args[0];

        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong nigga!'
                });
            break;
            // Just add any case commands if you want to..
            // !time
            case 'time':
                bot.sendMessage({
                    to: channelID,
                    message: 'Time To Die Motherfucker!'
                });
            break;
            //!suicide
            case 'suicide':
                bot.sendMessage({
					to: channelID,
					message: 'Life is worth living! Please contact: 1-800-273-8255 or visit https://suicidepreventionlifeline.org/ for help now!'
			    });
            break;
            //!drive
			case 'drive':
			    bot.sendMessage({
					to: channelID,
					message: 'Link: https://drive.google.com/drive/folders/12f2grZf1lycx9Iz-dKbFtFbMLgsJHlUy'
				});
            break;
            //!hello
			case 'hello':
			    bot.sendMessage({
					to: channelID,
					message: 'Hello! :)'
				});
            break;
            //!life
            case 'life':
			    bot.sendMessage({
					to: channelID,
					message: 'Life Sucks And Then You Die!'
				});
            break;
            case 'fact':
			    bot.sendMessage({
					to: channelID,
					message: 'Did You Know? Vitamin C is the ONLY Water-Soluble Vitamin!'
				});
            break;
            
         }
     }
});

