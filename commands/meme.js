const { RichEmbed } = require("discord.js");
const randomPuppy = require("random-puppy");
module.exports = {
    name: "meme",
    description: "meme command",
    execute: async (bot, channelID, msg, args) => {
        const subReddits = ["dankmeme", "meme", "me_irl"];
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];
        const main = require("../helperFunctions.js");
        await randomPuppy(random).then(img => {
            const embed = new RichEmbed()
            .setColor("RANDOM")
            .setImage(img)
            .setTitle(`From /r/${random}`)
            .setURL(`https://reddit.com/r/${random}`);
            main.sendMsg(bot, channelID, img);
        });
    }
        
}
