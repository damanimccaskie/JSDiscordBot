module.exports = {
    name: "life",
    description: "life command",
    execute(channel) {
        main = require("../helperFunctions.js")
        main.post(channel, "Life Sucks And Then You Die!");
    } 
}