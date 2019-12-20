module.exports = {
    name: "prize",
    description: "prize command",
    execute(bot, channelId) {
        main = require("../helperFunctions.js")
        main.sendMsg(bot, channelId, "https://shorturl.at/wyzGH");
    } 
}

