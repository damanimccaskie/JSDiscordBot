module.exports = {
    name: "help",
    description: "help command",
    execute(channel) {
        const main = require("../helperFunctions.js"); 
        const fs = require('fs');
        const version = "2019-12-29 21:50"

        function displayHelp() {
            //load command list from file (Command List) and display them
            fs.readFile('Command List', 'utf-8', (err, data) => {
                if (err) {
                    console.log(err);
                    main.post(channel, "Version: "+version); 
                    return;
                }
                main.post(channel, "Version: "+version);
                main.post(channel, data.replace(/!/g, ""));
            });
        }
        displayHelp();
    } 
}
