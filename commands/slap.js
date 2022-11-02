module.exports = {
    name: "slap",
    description: "slap command",
    execute({channel, message}) {
        const main = require("../helperFunctions.js");
        let member = message.mentions.members.first();

        const Discord = require('discord.js');
        let embed = new Discord.MessageEmbed();

        if (!member) {
            embed.setTitle("Mention a valid member of this server!");
            embed.setColor(3447003);
            
            main.post({ channel, embeds: [embed] });
        } else {
            let slapee = member.displayName;
            embed.setTitle(message.author.username + " bitch slapped :raised_back_of_hand: " + slapee + ", " + slapee + " is now in the hospital! :hospital:");
            embed.setColor(3447003);

            main.post({ channel, embeds: [ embed ] });
        }
    }
}