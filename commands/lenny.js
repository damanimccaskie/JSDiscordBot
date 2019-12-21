module.exports = {
    name: "lenny",
    description: "lenny command",
    
    execute(bot, channelId) {
        main = require("../helperFunctions.js");
        main.sendMsg(bot, channelId, "( ͡° ͜ʖ ͡°)");
    }
}
