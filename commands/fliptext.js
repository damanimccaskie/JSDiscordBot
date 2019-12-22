
const flip = require("flip-text");

module.exports = {
    name: "fliptext",
    description: "fliptext command",
    execute:(bot, channelID, args) => {
      main = require("../helperFunctions.js")  
      args.reverse();
      var flipped = [];
  
      for(i = 0; i < args.length - 1; i++) //ignore cmd
        flipped.push(flip(args[i]));
      main.sendMsg(bot,channelID,flipped.join(" "));
 }
}