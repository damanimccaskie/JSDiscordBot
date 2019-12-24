module.exports = {
    name: "ping",
    description: "ping command",
    execute(channel) {
        const main = require("../helperFunctions.js")
        main.post(channel, "Pong nigga!")
    } 
}