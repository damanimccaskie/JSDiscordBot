module.exports = {
    name: "als",
    description: "als command",
    execute({ channel }) {
        const main = require("../helperFunctions.js")
        const { MessageAttachment } = require("discord.js");
        // upload file
        main.post(channel, new MessageAttachment(__dirname + "/../images/als.png"));
    }
}