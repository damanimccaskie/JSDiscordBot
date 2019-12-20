module.exports = {
    name: "fact",
    description: "fact command",
    execute(bot, channelId) {
        main = require("../helperFunctions.js")
        main.sendMsg(bot, channelId, "Did You Know? Vitamin C is the ONLY Water-Soluble Vitamin!");
    } 
}