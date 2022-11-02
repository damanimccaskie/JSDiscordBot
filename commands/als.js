module.exports = {
    name: "als",
    description: "als command",
    execute({ channel }) {
        const main = require("../helperFunctions.js")

        // upload file
        main.post({ channel, files: [__dirname + "/../images/als.png"] });
    }
}