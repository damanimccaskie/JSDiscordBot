module.exports = {
    name: "prize",
    description: "prize command",
    execute(channel) {
        main = require("../helperFunctions.js")
        main.post(channel, "https://shorturl.at/wyzGH");
    } 
}

