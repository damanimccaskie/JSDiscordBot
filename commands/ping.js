module.exports = {
    name: "ping",
    description: "ping command",
    execute({ channel, bot }) {
        const main = require("../helperFunctions.js")
        main.post({ channel, msg: "Pong nigga! " + Math.floor(Math.round(bot.ws.ping)) + "ms" });
    }
}