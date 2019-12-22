module.exports = {
    name: "flipcoin",
    description: "flipcoin command",
    execute: async (channel) => {
        main = require("../helperFunctions.js")
        let output = ["HEADS", "TAILS"];

        await main.post(channel, output[Math.floor(Math.random()*output.length)] );
    }
}