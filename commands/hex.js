module.exports = {
    name: "hex",
    description: "convert number to hexadecimal",
    execute({channel, args}) {
        const main = require("../helperFunctions.js");
        if (!args[1]) {
            main.post({ channel, msg: "You need to enter a number to convert to hex" });
            return;
        }
        let result = parseFloat(args[1]).toString(16);
        let print = result == "NaN" ? ("Couldnt convert " + args[1]) : (args[1] + " --> " + result);
        main.post({ channel, msg: print });
    }
}