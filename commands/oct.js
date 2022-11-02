module.exports = {
    name: "oct",
    description: "convert number to octal",
    execute({channel, args}) {
        const main = require("../helperFunctions.js");
        if (!args[1]) {
            main.post({ channel, msg: "You need to enter a number to convert to octal" });
            return;
        }
        let result = parseFloat(args[1]).toString(8);
        let print = result == "NaN" ? ("Couldnt convert " + args[1]) : (args[1] + " --> " + result);
        main.post({ channel, msg: print });
    }
}