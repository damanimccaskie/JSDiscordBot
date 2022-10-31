const Discord = require("discord.js");
const weather = require("weather-js")
module.exports = {
    name: "weather",
    description: "weather command",
    execute({channel, args}) {
        const main = require("../helperFunctions.js")
        args = main.removeFirstArg(args);
        if (args.length < 1) {
            main.post(channel, "Please enter a location");
            return;
        }

        weather.find({ search: args.join(" "), degreeType: "C" }, function (err, result) {
            if (err) {
                main.post(channel, err);
                return;
            }

            //If the place entered is invalid
            if (result.length === 0) {
                main.post(channel, "**please enter a valid location**")
                return;
            }

            //Variables
            var current = result[0].current //Variable for the current part of the JSON Output
            var location = result[0].location //This is a variable for the location part of the JSON Output

            //Sends weather log in embed
            let embed = new Discord.MessageEmbed()
                .setDescription(`**${current.skytext}**`) //How the sky looks like
                .setAuthor(`Weather for ${current.observationpoint}`) //Shows the current location of the weater
                .setThumbnail(current.imageUrl) //Sets thumbnail of the embed
                .setColor(0x00AE86) //Sets the color of the embed
                .addField("Timezone", `UTC${location.timezone}`, true) //Shows the timezone
                .addField("Degree Type", location.degreetype, true) //Shows the degrees in Celcius
                .addField("Temperature", `${current.temperature}`, true)
                .addField("Feels like", `${current.feelslike} Degrees`, true)
                .addField("Winds", current.winddisplay, true)
                .addField("Humidity", ` ${current.humidity}%`, true)
                .addField("Day", `${current.day}`, true)
                .addField("Date", `${current.date}`, true)

            //Display when it's called
            main.post(channel, embed)

        });
    }
}