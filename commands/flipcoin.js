module.exports = {
    name: "flipcoin",
    description: "flipcoin command",
    execute({channel}) {
        const main = require("../helperFunctions.js")
        let output = ["HEADS", "TAILS"];

        main.post(channel, output[Math.floor(Math.random() * output.length)]);
    }
}