const streams = [
    {
        name: "Tropical House",
        url: "https://live.radiospinner.com/tropical-house-64"
    }, {
        name: "Hip Hop Lofi",
        url: "https://live.radiospinner.com/lofi-hiphop-64"
    }, {
        name: "Deep House",
        url: "https://live.radiospinner.com/deep-house-64"
    }, {
        name: "Chill EDM",
        url: "https://live.radiospinner.com/chill-edm-64"
    }, {
        name: "Lounge",
        url: "https://live.radiospinner.com/lounge-64"
    }, {
        name: "Cost Demar",
        url: "https://live.radiospinner.com/costdemar-64"
    }, {
        name: "Nature",
        url: "https://live.radiospinner.com/nature-64"
    }, {
        name: "Rain Calm",
        url: "https://live.radiospinner.com/rain-and-calm-64"
    }
];

const Discord = require("discord.js");
const main = require("../helperFunctions.js");

var servers = [];

module.exports = {
    name: "lofi",
    description: "lofi command to play lofi in the voice channel",
    execute: async ({channel, args, message}) => {
        args = main.removeFirstArg(args);

        if (args.length < 1) {
            let instructionsEmbed = new Discord.RichEmbed()
                .setColor("00cdff")
                .setTitle("Lofi")
                .setDescription("Choose a lofi station to listen to")
                .addField("Example:", "!lofi play 1 || !lofi play Tropical House", true);

                for (let j = 0; j < streams.length; j++)
                    instructionsEmbed.addField("Station " + (j + 1).toString(), streams[j].name);
            main.post(channel, instructionsEmbed);
            return;
        }

        const action = args.shift();
        if (action.toLowerCase() === "play") {
            if (args.length < 1)
                main.post(channel, "You need to choose a station to play");
            else play(args.join(" "), message, channel);
        } else if (action.toLowerCase() === "stop") 
            stop(message, channel);
        else if (action.toLowerCase() === "pause")
            pause(message, channel);
        else if (action.toLowerCase() === "resume")
            resume(message, channel);
        else main.post(channel, "you must indicate an action for lofi");
    }
}

const play = (search, message, channel) => {
    let choice = null;
    try {
        if (search.length > 1) // assume you are picking by name
            choice = streams.filter(stream => stream.name.toLowerCase() === search.toLowerCase())[0];
        else choice = streams[parseInt(search, 10) - 1];
    } catch (e) {
        main.post(channel, "You passed an invalid option to choose a stream");
        return;
    }

    if (!choice) {
        main.post(channel, "Could not find the stream you are asking for");
        return;
    }

    if (!message.member.voiceChannel) {
        main.post(channel, "You need to be in the voice channel to have me play music");
        return;
    }
    
    if (!servers[message.guild.id]) servers[message.guild.id] = {
        active: false
    };

    if (servers[message.guild.id].active) {
        main.post(channel, "I am already playing music in this channel");
        return;
    }

    let server = servers[message.guild.id];
    if (!server.active) message.member.voiceChannel.join().then((connection) => {
        server.dispatcher = connection.playStream(choice.url, { seek: 0, volume: 1 });
        server.active = true;
        main.post(channel, "Playing " + choice.name);
        
        server.dispatcher.on("end", () => {
            server.active = false;
            connection.disconnect();
        })
    });
}

const stop = (message, channel) => {
    if (!activeCheck(message, channel)) return;

    let server = servers[message.guild.id];
    server.dispatcher.end();
    server.active = false;
}

const pause = (message, channel) => {
    if (!activeCheck(message, channel)) return;

    let server = servers[message.guild.id];
    if (server.dispatcher.paused)
        main.post(channel, "The track is already paused");
    else {
        server.dispatcher.pause();
        main.post(channel, "Pausing music");
    }
}

const resume = (message, channel) => {
    if (!activeCheck(message, channel)) return;

    let server = servers[message.guild.id];
    if (!server.dispatcher.paused)
        main.post(channel, "The track is not paused");
    else {
        server.dispatcher.resume();
        main.post(channel, "Resuming music");
    }
}

const activeCheck = (message, channel) => {
    if (!servers[message.guild.id]) {
        main.post(channel, "I am not playing in this channel");
        return false;
    }

    if (!servers[message.guild.id].active) {
        main.post(channel, "It doesnt seem like I playing in this channel");
        return false;
    }

    return true;
};