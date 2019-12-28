module.exports = {
    name: "tr",
    description: "translate languages",
    execute(channel, args) {
        const main = require("../helperFunctions.js"); 
        const translate = require('google-translate-api');
        const language = require('./langs');

        args.shift(); //drop off tr
        if (args.length < 1) {
            displayUsage();
            return;
        }

        //if language (full name) entered by user exist
        if (language.some(ele => ele.name === args[0])) { 
            let tr_to = language.filter(ele => ele.name === args[0])[0].abrv;
            args.shift(); //drop off lang
            if (args.length < 1) {
                displayUsage();
                return;
            }

            let str = args.join(' ');
            translate(str, {to: tr_to})
                .then(res => main.post(channel, res.text))
                .catch(err => main.post(channel, "Error: "+err));
        }

        // if language (abbrievation) enterend by user exist
        if (language.some(ele => ele.abrv === args[1])) {
            if (args.length < 2) {
                displayUsage();
                return;
            }
            
            let tr_to = language.filter(ele => ele.abrv === args[1])[0].abrv;
            args.shift(); //drop off abbr
            let str = args.join(' ');
            translate(str, {to: tr_to})
                .then(res => main.post(channel, res.text))
                .catch(err => main.post(channel, "Error: "+err));
        }

        function displayUsage() {
            main.post(channel, "!tr language/abbr string");
        }
    } 
}
