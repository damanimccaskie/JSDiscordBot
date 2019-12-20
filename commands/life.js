module.exports = {
    name: "life",
    description: "life command",
    execute(bot, channelId) {
        main = require("../helperFunctions.js")
        main.sendMsg(bot, channelId, "Life Sucks And Then You Die!");
    } 
}