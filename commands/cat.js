var Discord = require('discord.js');
const request = require('request');
module.exports = {
    name: "cat",
    description: "cat command",
    execute: async ({channel}) => {
        const main = require("../helperFunctions.js");
        request('http://edgecats.net/random', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let emb = new Discord.RichEmbed()
                    .setImage(body)
                    .setColor("#00ff00")
                    .setTitle("Here is your random cat")

                main.post(channel, emb)
            }
        });
    }
}