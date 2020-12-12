module.exports = {
    name: "time",
    description: "time command",
    execute(channel) {
        const main = require("../helperFunctions.js")
        main.post(channel, "Time To Die Motherfucker!");
    }
}