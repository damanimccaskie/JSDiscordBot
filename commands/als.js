module.exports = {
    name: "als",
    description: "als command",
    execute (channel) {
        const main = require("../helperFunctions.js")
        const {Attachment} = require("discord.js");
        // upload file 
        main.post(channel, new Attachment("../DiscordBot/images/als.png"));
    }
}