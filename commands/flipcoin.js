module.exports = {
    name: "flipcoin",
    description: "flipcoin command",
    execute({channel}) {
        const main = require("../helperFunctions.js")
        const output = ["HEADS", "TAILS"];

        main.post({ channel, msg: output[Math.floor(Math.random() * output.length)] });
    }
}