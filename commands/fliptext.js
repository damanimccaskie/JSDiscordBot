
const flip = require("flip-text");

module.exports = {
    name: "fliptext",
    description: "fliptext command",
    execute: async (bot, channelID, msg, args) => {
    main = require("../helperFunctions.js")  
    args.reverse();
      var flipped = [];
  
      args.forEach((arg) => {
         flipped.push(flip(arg));
      });
  
  await main.sendMsg(bot,channelID,flipped.join(" "));
 }
}