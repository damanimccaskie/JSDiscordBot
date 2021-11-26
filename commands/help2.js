module.exports = {
	name: "help2",
	description: "help command",
	execute({channel}) {
		const main = require("../helperFunctions.js");
		const version = "2021-11-26 01:31"

		function displayHelp() {
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
					}, {
                        name: "!price [arg]",
                        value: "Get the price of a specific cryptocurrency",
                        inline: true,
                    }, {
                        name: "!track [arg]",
                        value: "Setup a listener for new videos from specified youtuber",
                        inline: true,
                    }, {
                        name: "!untrack [arg]",
                        value: "Remove listener for new videos from specified youtuber",
                        inline: true,
                    }, {
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

			main.post(channel, "Version: " + version);
			main.post(channel, { embed: exampleEmbed });

		}
		displayHelp();
	}
}
