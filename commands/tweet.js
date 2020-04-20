const Jimp = require("jimp");
const fs = require("fs");
//const Moment = require("moment-timezone");

module.exports = {
    name: "tweet",
    description: "tweet command",
    execute (channel, args) {
        const main = require("../helperFunctions.js")
        args = main.removeFirstArg(args);
        if (args.length >= 1) {
            Jimp.read({url: "https://cdn.glitch.com/8e40fcc8-31eb-4977-8cfa-52bd05aa65ef%2Ftrump.png?1532351177092"}).then(image => {
              Jimp.loadFont(Jimp.FONT_SANS_32_BLACK).then(function (font) { // load font from .fnt file
                image.quality(84)                 // set JPEG quality
                image.print(font, 43, 107, args.join(" "), 601);        // print a message on an image
          
                let outputfile = "./output/" + Math.random().toString(36).substr(2, 5) + "tweet." + image.getExtension(); // create a random name for the output file
                image.write(outputfile);
                const {Attachment} = require("discord.js");
                // upload file 
                main.post(channel, new Attachment(outputfile));
                
                setTimeout(function () {
                  fs.unlink(outputfile, function(err) { //delete file
                    if (err) throw err;
                    // if no error, file has been deleted successfully
                    console.log('File deleted!'); 
                  })}, 3000); //need to delay deleting file to give time for upload (js async bad)

              });         
            }).catch(function (err) {
                // handle an exception
                console.error("Error: " + err);
            });    
          } else {
            //msg.delete();
            main.post(channel, "Enter a message!");
          }
        }
}