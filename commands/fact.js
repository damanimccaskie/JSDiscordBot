module.exports = {
    name: "fact",
    description: "fact command",
    execute(channel) {
        main = require("../helperFunctions.js")
        main.post(channel, "Did You Know? Vitamin C is the ONLY Water-Soluble Vitamin!");
    } 
}