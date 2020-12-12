const { Command } = require('discord.js-commando');
const snekfetch = require('snekfetch');
const Discord = require("discord.js");

module.exports = {
    name: "dog",
    description: "dog command",
    execute: async (channel, args) => {
        const main = require("../helperFunctions.js");

        const { body } = await snekfetch.get('https://random.dog/woof.json');
        const embed = new Discord.RichEmbed()
            .setColor("#00ff00")
            .setImage(body.url);

        main.post(channel, embed);
    }
}