
const flip = require("flip-text");

module.exports = {
  name: "fliptext",
  description: "fliptext command",
  execute: ({channel, args}) => {
    const main = require("../helperFunctions.js")
    args = main.removeFirstArg(args).reverse();
    let flipped = [];

    for (let i = 0; i < args.length; i++)
      flipped.push(flip(args[i]));
    main.post(channel, flipped.join(" "));
  }
}