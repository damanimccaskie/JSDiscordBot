module.exports = {
    name: "ping",
    description: "ping command",
    execute(bot, channelId) {
        main = require("../helperFunctions.js")
        main.sendMsg(bot, channelId, "Pong nigga!");
    } 
}