/*const Jimp = require("jimp");
const fs = require("fs");
const Moment = require("moment-timezone");

module.exports = {
    name: "tweet",
    description: "tweet command",
    execute: async (bot, channelID, msg, args) => {
        main = require("../helperFunctions.js")
        if (args.length >= 1) {
            Jimp.read("https://cdn.glitch.com/8e40fcc8-31eb-4977-8cfa-52bd05aa65ef%2Ftrump.png?1532351177092").then(function (image) {
              Jimp.loadFont(Jimp.FONT_SANS_32_BLACK).then(function (font) { // load font from .fnt file
                  image.quality(84)                 // set JPEG quality
                  image.print(font, 43, 107, args.join(" "), 601);        // print a message on an image
        
                  let outputfile = "./output/" + Math.random().toString(36).substr(2, 5) + "tweet." + image.getExtension(); // create a random name for the output file
                  image.write(outputfile, function () {
                    // upload file
                    main.sendMsg(bot, channelID, {file: outputfile}).then(function () {
                      // delete file
                      fs.unlink(outputfile);
                      console.log(`SUCCESS: ${msg.author.username}, Message: ${args}, Created At: ${Moment(Date.now()).tz('Europe/London').format('l, LT')}`);
                    });
                  });        
              });         
            }).catch(function (err) {
                // handle an exception
                console.error("Error: " + err);
            });    
          } else {
            msg.delete();
            await main.sendMsg(bot, channelID,"Enter a message!").then(msg => msg.delete(2300));
          }
        }
}*/