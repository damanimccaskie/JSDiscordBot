module.exports = {
    name: "hello",
    description: "hello command",
    execute({channel}) {
        const main = require("../helperFunctions.js")
        main.post({ channel, msg: "Hello! :)" });
    }
}