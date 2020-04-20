module.exports = {
    name: "audio",
    description: "Music Commands List",
    execute(channel) {
        const main = require("../helperFunctions.js"); 
        const fs = require('fs');
        const version = "2020-04-20 11:26"

        function displayHelp() {
            //load command list from file (Command List) and display them
            /*fs.readFile('Command List', 'utf-8', (err, data) => {
                if (err) {
                    console.log(err);
                    main.post(channel, "Version: "+version); 
                    return;
                }
                main.post(channel, "Version: "+version);
                main.post(channel, data.replace(/!/g, ""));
            });*/


          const exampleEmbed = {
	color: 0x0099ff,
	title: 'SRBot Music Commands',
	url: 'https://github.com/TheNotoriousMac/DiscordBot',
	author: {
		name: 'Suicide Race',
		icon_url: 'https://i.postimg.cc/xjzCkSHz/SR2pat.jpg',
		url: 'https://github.com/TheNotoriousMac/DiscordBot',
	},
	description: 'All music commands for @SRBot',
	thumbnail: {
		url: 'https://i.postimg.cc/52FFbF3Z/SR1.jpg',
	},
	fields: [
		/*{
			name: '\u200b',
			value: '\u200b',
			inline: false,
		},*/
		{
			name: '!play [arg]',
			value: 'arg can be a YT link/id or a query',
			inline: true,
		},
		{
			name: '!stop',
			value: 'stop all music (and clear the queue)',
			inline: true,
		},
		{
			name: '!skip',
			value: 'go to next song in list(if available)',
			inline: true,
		},
		{
			name: '!next',
			value: 'same as !skip',
			inline: true,
		},
		{
			name: '!queue',
			value: 'view items in queue',
			inline: true,
		},
		{
			name: '!back',
			value: 'go to previous song',
			inline: true,
		},
		{
			name: '!details',
			value: 'view details of currently playing song',
			inline: true,
		},
		{
			name: '!pause',
			value: 'pause current song',
			inline: true,
		},
		{
			name: '!resume',
			value: 'resume current song',
			inline: true,
		},
		
	],
	timestamp: new Date(),
	footer: {
		text: 'SRBot',
		icon_url: 'https://i.postimg.cc/xjzCkSHz/SR2pat.jpg',
	},
     };

	   main.post(channel, { embed: exampleEmbed });

        }
        displayHelp();
    } 
}
