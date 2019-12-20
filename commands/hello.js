module.exports = {
    name: "hello",
    description: "hello command",
    execute(bot, channelId) {
        main = require("../helperFunctions.js")
        main.sendMsg(bot, channelId, "Hello! :)");
    } 
}