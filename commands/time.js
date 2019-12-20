module.exports = {
    name: "time",
    description: "time command",
    execute(bot, channelId) {
        main = require("../helperFunctions.js")
        main.sendMsg(bot, channelId, "Time To Die Motherfucker!");
    } 
}