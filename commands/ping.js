var Discord = require('discord.js');
module.exports = {
    name: "ping",
    description: "ping command",
    execute(channel) {
        const main = require("../helperFunctions.js")
        main.post(channel, "Pong nigga!")
    }
}
//`" + Math.floor(Math.round(bot.ping)) + "`ms"
//msg.delete();