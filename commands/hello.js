module.exports = {
    name: "hello",
    description: "hello command",
    execute(channel) {
        main = require("../helperFunctions.js")
        main.post(channel, "Hello! :)");
    } 
}