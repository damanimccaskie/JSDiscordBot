module.exports = {
    name: "help2",
    description: "help command",
    execute(channel) {
        const main = require("../helperFunctions.js"); 
        const fs = require('fs');
        const version = "2020-04-20 11:15"

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
	title: 'SRBot Commands',
	url: 'https://github.com/TheNotoriousMac/DiscordBot',
	author: {
		name: 'Suicide Race',
		icon_url: 'https://i.postimg.cc/xjzCkSHz/SR2pat.jpg',
		url: 'https://github.com/TheNotoriousMac/DiscordBot',
	},
	description: 'Page 2 of Commands for @SRBot',
	thumbnail: {
		url: 'https://i.postimg.cc/52FFbF3Z/SR1.jpg',
	},
	fields: [
		{
			name: '!cat',
			value: 'Random cat picture',
			inline: true,
		},
		{
			name: '!cow',
			value: 'Random cow picture',
			inline: true,
		},
		{
			name: '!dog',
			value: 'Random dog picture',
			inline: true,
		},
		{
			name: '!joke',
			value: 'Random joke generator',
			inline: true,
		},
		{
			name: '!pepe',
			value: 'Random pepe generator',
			inline: true,
		},
		{
			name: '!urban',
			value: 'Search urban dictionary',
			inline: true,
		},
		{
			name: '!weather',
			value: 'Get weather conditions of a specified location',
			inline: true,
		},
		{
			name: '!audio',
			value: 'Show all music commands!',
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
