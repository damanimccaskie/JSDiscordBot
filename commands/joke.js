const Discord = require("discord.js");
let giveMeAJoke = require('give-me-a-joke');;

module.exports = {
    name: "cnjoke",
    description: "Chuck Norris joke command",
    execute: async (channel, args) => {
    const main = require("../helperFunctions.js");

    giveMeAJoke.getRandomCNJoke(function(joke){
        main.post(channel, joke)
    })
}
}