// const Discord = require("discord.js");
let giveMeAJoke = require('give-me-a-joke');;

module.exports = {
    name: "joke",
    description: "Chuck Norris joke command",
    execute(channel) {
        const main = require("../helperFunctions.js");

        giveMeAJoke.getRandomCNJoke(function (joke) {
            main.post(channel, joke)
        })
    }
}