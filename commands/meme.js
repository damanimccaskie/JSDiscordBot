const { RichEmbed } = require("discord.js");
const randomPuppy = require("random-puppy");
module.exports = {
    name: "meme",
    description: "meme command",
    execute: async (bot, channelID, msg, args) => {
        const subReddits = ["dankmeme", "meme", "me_irl"];
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];
        const main = require("../helperFunctions.js");
        const img = await randomPuppy(random);
        const embed = new RichEmbed()
          .setColor("RANDOM")
          .setImage(img)
          .setTitle(`From /r/${random}`)
          .setURL(`https://reddit.com/r/${random}`);

      main.sendMsg(bot, channelID, embed);
    }
        
}
