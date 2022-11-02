module.exports = {
    name: "geh",
    description: "geh command",
    execute({channel}) {
        const main = require("../helperFunctions.js")

        // upload file
        main.post({ channel, files: [__dirname + "/../images/geh.gif"] });
    }
}