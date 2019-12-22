
const flip = require("flip-text");

module.exports = {
    name: "fliptext",
    description: "fliptext command",
    execute:(bot, channelID, args) => {
      main = require("../helperFunctions.js") 
      args = main.removeFirstArg(args).reverse();
      var flipped = [];
  
      for(i = 0; i < args.length; i++)
        flipped.push(flip(args[i]));
      main.sendMsg(bot,channelID,flipped.join(" "));
 }
}