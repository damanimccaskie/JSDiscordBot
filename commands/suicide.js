module.exports = {
    name: "suicide",
    description: "suicide command",
    execute(channel) {
        main = require("../helperFunctions.js")
        main.post(channel, "Life is worth living! Please contact: 1-800-273-8255 or visit https://suicidepreventionlifeline.org/ for help now!");
    } 
}