const snekfetch = require('snekfetch');
const Discord = require("discord.js");

module.exports = {
    name: "dog",
    description: "dog command",
    execute: async ({channel}) => {
        const main = require("../helperFunctions.js");

        const { body } = await snekfetch.get('https://random.dog/woof.json');
        const embed = new Discord.MessageEmbed()
            .setColor("#00ff00")
            .setImage(body.url);

        main.post(channel, embed);
    }
}