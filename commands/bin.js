module.exports = {
    name: "bin",
    description: "convert number to binary",
    execute({channel, args}) {
        const main = require("../helperFunctions.js");
        
        if (!args) {
            console.log("command bin: Missing args");
            return false;
        }

        if (args.length < 2) {
            main.post({ channel, msg: "You need to enter a number to convert to binary" });
            return false;
        }

        let result = parseFloat(args[1]).toString(2);
        let print = result == "NaN" ? ("Couldnt convert " + args[1]) : (args[1] + " --> " + result);
        main.post({ channel, msg: print });

        return true;
    }
}