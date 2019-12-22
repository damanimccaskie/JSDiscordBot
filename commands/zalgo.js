const Zalgo = require ("to-zalgo");
module.exports = {
    name: "zalgo",
    description: "zalgo command",
    execute: async (channel, args) => {
        main = require("../helperFunctions.js")
        args = main.removeFirstArg(args);
        await main.post(channel, Zalgo(args.join(" ")));
    }
}