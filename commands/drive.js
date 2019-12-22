module.exports = {
    name: "drive",
    description: "drive command",
    execute(channel) {
        main = require("../helperFunctions.js")
        main.post(channel, "Link: https://drive.google.com/drive/folders/12f2grZf1lycx9Iz-dKbFtFbMLgsJHlUy");
    } 
}