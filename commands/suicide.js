module.exports = {
    name: "suicide",
    description: "suicide command",
    execute(channel) {
        const main = require("../helperFunctions.js")
        const { Attachment } = require("discord.js");
        main.post(channel, new Attachment("../DiscordBot/images/sui.jpg"))
        main.post(channel, "Life is worth living! Please contact: 1-800-273-8255 or visit https://suicidepreventionlifeline.org/ for help now!");
    }
}