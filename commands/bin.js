module.exports = {
    name: "bin",
    description: "convert number to binary",
    execute (channel, args) {
        const main = require("../helperFunctions.js");
        let result = parseFloat(args[1]).toString(2);
        let print = result == "NaN" ? "Couldnt convert "+args[1] : args[1] + " --> " + result;
        main.post(channel, print);
    }
}