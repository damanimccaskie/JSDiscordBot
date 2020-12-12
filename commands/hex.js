module.exports = {
    name: "hex",
    description: "convert number to hexadecimal",
    execute(channel, args) {
        const main = require("../helperFunctions.js");
        let result = parseFloat(args[1]).toString(16);
        let print = result == "NaN" ? "Couldnt convert " + args[1] : args[1] + " --> " + result;
        main.post(channel, print);
    }
}