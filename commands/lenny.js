module.exports = {
    name: "lenny",
    description: "lenny command",
    
    execute(channel) {
        const main = require("../helperFunctions.js");
        main.post(channel, "( ͡° ͜ʖ ͡°)");
    }
}
