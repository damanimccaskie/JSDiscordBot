var Discord = require('discord.js');
const math = require ('mathjs');

module.exports = {
    name: "calc",
    description: "calculator command",
    execute (channel, args){
        main = require("../helperFunctions.js")
        args = main.removeFirstArg(args);
        if(!args[0]) {
            main.post(channel, "Please input a calculation.");
            return;
        }

        let resp;
        try {
            resp = math.evaluate(args.join(" "));
        } catch (e) {
            return main.post(channel, "Sorry, please input a valid calculation.");
        }
        
        const embed = new Discord.RichEmbed()
           .setColor(0xffffff)
           .setTitle("Math Calculation")
           .addField('Input', `\`\`\`js\n${args.join(" ")}\`\`\``)
           .addField('Output', `\`\`\`js\n${resp}\`\`\``)

        main.post(channel, embed);
    }
}