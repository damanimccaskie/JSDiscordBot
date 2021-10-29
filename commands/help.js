module.exports = {
	name: "help",
	description: "help command",
	execute(channel) {
		const main = require("../helperFunctions.js");
		// const fs = require('fs');
		const version = "2021-10-29 12:35"

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
				description: 'Page 1 of Commands for @SRBot',
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
						name: '!life',
						value: 'Choose your life path',
						inline: true,
					},
					{
						name: '!fact',
						value: 'Facts',
						inline: true,
					},
					{
						name: '!suicide',
						value: 'Suicide Hotline',
						inline: true,
					},
					{
						name: '!hello',
						value: 'Says Hello',
						inline: true,
					},
					{
						name: '!drive',
						value: 'SR Drive Link',
						inline: true,
					},
					{
						name: '!time',
						value: 'Wink Wink',
						inline: true,
					},
					{
						name: '!ping',
						value: 'replies pong',
						inline: true,
					},
					{
						name: '!prize',
						value: 'Special Prize',
						inline: true,
					},
					{
						name: '!help',
						value: 'List of Commands',
						inline: true,
					},
					{
						name: '!clear [arg]',
						value: 'Will clear a specified number of messages',
						inline: true,
					},
					{
						name: '!image',
						value: 'Random image generator',
						inline: true,
					},
					{
						name: '!meme',
						value: 'Random meme generator',
						inline: true,
					},
					{
						name: '!lenny',
						value: 'lenny face ( ͡° ͜ʖ ͡°)',
						inline: true,
					},
					{
						name: '!fortune',
						value: 'Your fortune',
						inline: true,
					},
					{
						name: '!flipcoin',
						value: 'Heads or tails',
						inline: true,
					},
					{
						name: '!fliptext',
						value: 'Reverse and flip text',
						inline: true,
					},
					{
						name: '!zalgo',
						value: 'Zalgo text',
						inline: true,
					},
					{
						name: '!slap',
						value: 'Slap a user in the channel',
						inline: true,
					},
					{
						name: '!calc',
						value: 'Calculate an expression',
						inline: true,
					},
					{
						name: '!space',
						value: 'Spaced out text',
						inline: true,
					},
					{
						name: '!sigh',
						value: 'Sighs',
						inline: true,
					},
					{
						name: '!bin',
						value: 'Decimal to Binary',
						inline: true,
					},
					{
						name: '!oct',
						value: 'Decimal to Octal',
						inline: true,
					},
					{
						name: '!hex',
						value: 'Decimal to hexadecimal',
						inline: true,
					},
					{
						name: '!help2',
						value: 'Show Page 2 of Commands..',
						inline: true,
					},

				],
				timestamp: new Date(),
				footer: {
					text: 'SRBot',
					icon_url: 'https://i.postimg.cc/xjzCkSHz/SR2pat.jpg',
				},
			};

			main.post(channel, "Version: "+version);
			main.post(channel, { embed: exampleEmbed });

		}
		displayHelp();
	}
}
