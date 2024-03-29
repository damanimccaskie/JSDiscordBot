module.exports = {
	name: "help",
	description: "help command",
	execute({channel}) {
		const main = require("../helperFunctions.js");
		const version = "2022-11-01 08:45"

		function displayHelp() {
			const exampleEmbed = {
				color: 0x0099ff,
				title: 'SRBot Commands - ' + version,
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
						name: '!ping',
						value: 'replies pong',
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
						name: '!lofi',
						value: 'Interact with lofi section of the bot\nIncludes play, pause, resume and stop functions',
						inline: true,
					},
					{
						name: '!help2',
						value: 'Show Page 2 of Commands..',
						inline: true,
					}
				],
				timestamp: new Date(),
				footer: {
					text: 'SRBot',
					icon_url: 'https://i.postimg.cc/xjzCkSHz/SR2pat.jpg',
				},
			};

			main.post({ channel, embeds: [exampleEmbed] });

		}
		displayHelp();
	}
}
