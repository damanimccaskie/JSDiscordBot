module.exports = {
    name: "fortune",
    description: "fortune command",
    execute: (channel, args) => {
        const main = require("../helperFunctions.js")
        args = main.removeFirstArg(args)
        if (args.length == 0) {
            main.post(channel, "Finding out a fortune for nothing, great.")
            return;
        }

        var fortunes = [
            "Yes.",
            "It is certain.",
            "It is decidedly so.",
            "Without a doubt.",
            "Yes definelty.",
            "You may rely on it.",
            "As I see it, yes.",
            "Most likely.",
            "Outlook good.",
            "Signs point to yes.",
            "Reply hazy, try again.",
            "Ask again later.",
            "Better not tell you now...",
            "Cannot predict now.",
            "Concentrate and ask again.",
            "Don't count on it.",
            "My reply is no.",
            "My sources say no.",
            "Outlook not so good...",
            "Very doubtful.",
        ];

        main.post(channel, fortunes[Math.floor(Math.random() * fortunes.length)]);
    }
}    