const Discord = require("discord.js");

module.exports = {
    name: "pepe",
    description: "pepe command",
    execute(channel) {
        const main = require("../helperFunctions.js");

        let links = ["https://cdn.discordapp.com/emojis/428556352915505165.png?v=1", "https://cdn.discordapp.com/emojis/428556326482739230.png?v=1",
            "https://cdn.discordapp.com/emojis/428556486235389973.png?v=1", "https://cdn.discordapp.com/emojis/428556308929576960.png?v=1",
            "https://cdn.discordapp.com/emojis/428556295218659329.png?v=", "https://cdn.discordapp.com/emojis/428556467021545473.png?v=1",
            "https://cdn.discordapp.com/emojis/428556448507625474.png?v=1", "https://cdn.discordapp.com/emojis/428556377754042378.png?v=1",
            "https://cdn.discordapp.com/emojis/428556281767526405.png?v=1", "https://cdn.discordapp.com/emojis/428556266366042112.png?v=1"];

        let link = links[Math.floor((Math.random() * links.length))];

        let pepe = new Discord.RichEmbed()
            .setColor("#00ff00")
            .setImage(link);

        main.post(channel, pepe);
    }
}