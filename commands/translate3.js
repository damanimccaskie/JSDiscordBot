const Discord = require("discord.js");
const translate = require('google-translate-api');
module.exports = {
    name: "translate",
    description: "translate 3 command",
    execute: async (channel, msg, args) => {
        const main = require("../helperFunctions.js");
        args = msg.content.split(/[ ]+/);
    let lang = args[1];
    let suffix = args.slice(2).join(' ');
    if (!suffix) main.post(channel,{
        embed: {
            color: 0xff2727,
            description: `:warning: **${msg.author.username}**, You didn't give me anything to translate.\n{m!translate \`language\` \`input\`}`,
            timestamp: new Date(),
            footer: {
                text: 'API Lantancy is ' + `${Date.now() - msg.createdTimestamp}` + ' ms'
            }
        }
    });
    if (!lang) return;
    translate(suffix, {from: 'en', to: lang}).then(res => {
        let embed = new Discord.RichEmbed()
        .setColor(`#4885ed`)
        .setAuthor(`Language detected: "${lang}"`, `http://nyamato.me/i/kbfuj.png`)
        .setDescription(`**Original**: ${suffix}\n**Translation**: ${res.text}`)
        .setTimestamp()
        .setFooter('API Lantancy is ' + `${Date.now() - msg.createdTimestamp}` + ' ms', msg.author.displayAvatarURL);
    return main.post(channel, {
        embed: embed
    });
    }).catch(error => main.post(channel, {
        embed: {
            color: 0xff2727,
            description: `:warning: **${msg.author.username}**, ${error}`,
            timestamp: new Date(),
            footer: {
                text: 'API Lantancy is ' + `${Date.now() - msg.createdTimestamp}` + ' ms'
            }
        }
    })); return main.post(channel,"👌");
 }
}