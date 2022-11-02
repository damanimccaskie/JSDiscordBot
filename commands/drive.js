module.exports = {
    name: "drive",
    description: "drive command",
    execute({channel}) {
        const main = require("../helperFunctions.js")
        main.post({ channel, msg: "Link: https://drive.google.com/drive/folders/12f2grZf1lycx9Iz-dKbFtFbMLgsJHlUy" });
    } 
}