const Discord = require("discord.js");
const request = require("request");

module.exports = {
  name: "urban",
  description: "urban dictionary command",
  execute: async ({channel, args}) => {
    const main = require("../helperFunctions.js")
    args.shift();

    if (args.length < 1) {
      main.post(channel, "Please enter something!");
      return;
    }

    let XD = args.join(" ");

    let options = {
      url: "https://api.urbandictionary.com/v0/define?page=1&term=" + XD,
      method: "GET",
      headers: {
          "Accept": "application/json",
          "User-Agent": "Mozilla/5.0 (X11; Linux i586; rv:31.0) Gecko/20100101 Firefox/71.0"
      }
  };

  request(options, function (error, response, body) {
      if (error) {
          console.log(error);
          main.post(channel, error);
          return;
      }
      
      
      const { list } = JSON.parse(body);
      if (!list) return main.post(channel, "No results found!");
      const { word, definition, thumbs_up, thumbs_down, author, example} = list[0];
      let urbEmbed = new Discord.MessageEmbed()
        .setColor("00ff00")
        .setTitle(word)
        .setDescription(definition)
        .addField("Example:", example, true)
        .addField("Upvotes\n:thumbsup:", thumbs_up, true)
        .addField("Downvotes\n:thumbsdown:", thumbs_down, true)
        .setFooter(`Written by: ${author}`);

      main.post(channel, urbEmbed);

    });
  }
}