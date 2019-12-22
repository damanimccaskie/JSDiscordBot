module.exports = {
    name: "lenny",
    description: "lenny command",
    
    execute(channel) {
        main = require("../helperFunctions.js");
        main.post(channel, "( ͡° ͜ʖ ͡°)");
    }
}
