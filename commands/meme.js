const { RichEmbed } = require("discord.js");
const randomPuppy = require("random-puppy");
module.exports = {
    name: "meme",
    description: "meme command",
    execute(channel) {
        const subReddits = ["dankmeme", "meme", "me_irl"];
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];
        const main = require("../helperFunctions.js");
        randomPuppy(random).then(img => {
            const embed = new RichEmbed()
                .setColor("RANDOM")
                .setImage(img)
                .setTitle(`From /r/${random}`)
                .setURL(`https://reddit.com/r/${random}`);
            main.post(channel, embed);
        });
    }

}
