module.exports = {
    name: "clear",
    description: "clear command",
    execute(channel, args) {
        // const main = require("../helperFunctions.js");
        channel.bulkDelete(!args[1] ? 100 : args[1] > 100 || args < 2 ? 2 : args[1]); //complex :)
    }
}