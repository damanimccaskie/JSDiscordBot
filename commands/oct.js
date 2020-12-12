module.exports = {
    name: "oct",
    description: "convert number to octal",
    execute(channel, args) {
        const main = require("../helperFunctions.js");
        let result = parseFloat(args[1]).toString(8);
        let print = result == "NaN" ? "Couldnt convert " + args[1] : args[1] + " --> " + result;
        main.post(channel, print);
    }
}