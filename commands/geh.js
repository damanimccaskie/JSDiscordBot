module.exports = {
    name: "geh",
    description: "geh command",
    execute (channel){
        main = require("../helperFunctions.js")
        const {Attachment} = require("discord.js");
                // upload file 
                main.post(channel, new Attachment("../DiscordBot/images/geh.gif"));
    }
}