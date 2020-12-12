const Zalgo = require("to-zalgo");
module.exports = {
    name: "zalgo",
    description: "zalgo command",
    execute: (channel, args) => {
        const main = require("../helperFunctions.js")
        args = main.removeFirstArg(args);
        main.post(channel, Zalgo(args.join(" ")));
    }
}