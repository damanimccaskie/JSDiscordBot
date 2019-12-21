module.exports = {
    name: "flipcoin",
    description: "flipcoin command",
    execute: async (bot, channelID) => {
        main = require("../helperFunctions.js")
        let output = ["HEADS", "TAILS"];

        await main.sendMsg(bot, channelID,output[Math.floor(Math.random()*output.length)] );
    }
}