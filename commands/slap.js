module.exports = {
    name: "slap",
    description: "slap command",
    execute: async(channel, args, all) => {
        const main = require("../helperFunctions.js");
        let member = all.mentions.members.first();

        if (!member) {
            const Discord = require('discord.js');
            let embed = new Discord.RichEmbed();
            embed.setTitle("Mention a valid member of this server!");
            embed.setColor(3447003);
            main.post(channel, embed);
        } else {
            let slapee = member.displayName;

            main.post(channel, {embed: {
                color: 3447003,
                title: all.author.username + " slapped :raised_back_of_hand: " + slapee + ", " + slapee + " is now in the hospital! :hospital:"
            }});
        }
    }
}