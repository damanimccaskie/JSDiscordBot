module.exports = {
    name: "space",
    description: "space command",
    execute({channel, args}) {
        const main = require("../helperFunctions.js");
        args = main.removeFirstArg(args);
        if (args.length < 1) {
            main.post({ channel, msg: 'You must provide text to space out!' });
            return;
        }

        let amount = 2;

        if (!isNaN(args[0])) {
            amount = parseInt(args[0]);
            //cool if statement
            (amount < 1) && (amount = 1);
            (amount > 15) && (amount = 15);
            args = args.slice(1);
        }

        main.post({ channel, msg: args.join(' '.repeat(amount / 2)).split('').join(' '.repeat(amount)) });
    }
}