const streams = [
    {
        name: "Tropical House",
        url: "https://live.radiospinner.com/tropical-house-64"
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
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const main = require("../helperFunctions.js");

var servers = [];

module.exports = {
    name: "lofi",
    description: "lofi command to play lofi in the voice channel",
    execute: async ({channel, args, message}) => {
        args = main.removeFirstArg(args);

        if (args.length < 1) {
            let instructionsEmbed = new Discord.MessageEmbed()
                .setColor("00cdff")
                .setTitle("Lofi")
                .setDescription("Choose a lofi station to listen to")
                .addField("Example:", "!lofi play 1 || !lofi play Tropical House", true);

                for (let j = 0; j < streams.length; j++)
                    instructionsEmbed.addField("Station " + (j + 1).toString(), streams[j].name);
            main.post({ channel, embeds: [instructionsEmbed] });
            return;
        }

        const action = args.shift();
        if (action.toLowerCase() === "play") {
            if (args.length < 1)
                main.post({ channel, msg: "You need to choose a station to play" });
            else play(args.join(" "), message, channel);
        } else if (action.toLowerCase() === "stop") 
            stop(message, channel);
        else if (action.toLowerCase() === "pause")
            pause(message, channel);
        else if (action.toLowerCase() === "resume")
            resume(message, channel);
        else main.post({ channel, msg: "you must indicate an action for lofi" });
    }
}

const play = (search, message, channel) => {
    let choice = null;
    try {
        if (search.length > 1) // assume you are picking by name
            choice = streams.filter(stream => stream.name.toLowerCase() === search.toLowerCase())[0];
        else choice = streams[parseInt(search, 10) - 1];
    } catch (e) {
        main.post({ channel, msg: "You passed an invalid option to choose a stream" });
        return;
    }

    if (!choice) {
        main.post({ channel, msg: "Could not find the stream you are asking for" });
        return;
    }

    if (!message.member.voice.channel) {
        main.post({ channel, msg: "You need to be in the voice channel to have me play music" });
        return;
    }
    
    if (!servers[message.guild.id]) servers[message.guild.id] = {
        active: false,
        audioPlayer: null
    };

    if (servers[message.guild.id].active) {
        main.post({ channel, msg: "I am already playing music in this channel" });
        return;
    }

    let server = servers[message.guild.id];
    if (!server.active) {
        const connection = joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.member.voice.channel.guild.id,
            adapterCreator: message.member.voice.channel.guild.voiceAdapterCreator,
        });

        server.audioPlayer = createAudioPlayer();
        server.audioPlayer.play(createAudioResource(choice.url))
        const subscription = connection.subscribe(server.audioPlayer);

        if (!subscription) {
            main.post({ channel, msg: "An error occurred while playing: " + error });
            cleanUp(server);
            return;
        }

        server.audioPlayer.on("error", error => {
            main.post({ channel, msg: "An error occurred while playing: " + error });
            server.active = false;
            server.audioPlayer = null;
        });

        server.audioPlayer.on(AudioPlayerStatus.Idle, () => {
            connection.destroy();
            server.active = false;
            server.audioPlayer = null;
        });

        server.active = true;
        main.post({ channel, msg: "Playing " + choice.name });
    } 
}

const cleanUp = (server) => {
    server.audioPlayer.stop();
    server.audioPlayer = null; // garbage collect
    server.active = false;
}

const stop = (message, channel) => {
    if (!activeCheck(message, channel)) return;

    let server = servers[message.guild.id];
    cleanUp(server);
    main.post({ channel, msg: "Stopping playback" });
}

const pause = (message, channel) => {
    if (!activeCheck(message, channel)) return;

    let server = servers[message.guild.id];
    if (server.audioPlayer.state.status === AudioPlayerStatus.Playing) {
        server.audioPlayer.pause();
        main.post({ channel, msg: "Pausing music" });
    } else if (server.audioPlayer.state.status === AudioPlayerStatus.Paused) {
        main.post({ channel, msg: "The track is already paused" });
    } else main.post({ channel, msg: "I am not currently playing" });
}

const resume = (message, channel) => {
    if (!activeCheck(message, channel)) return;

    let server = servers[message.guild.id];
    if (server.audioPlayer.state.status === AudioPlayerStatus.Paused) {
        server.audioPlayer.unpause();
        main.post({ channel, msg: "Resuming" });
    } else if (server.audioPlayer.state.status === AudioPlayerStatus.Playing) {
        main.post({ channel, msg: "The track is already playing" });
    } else main.post({ channel, msg: "The track is not paused" });
}

const activeCheck = (message, channel) => {
    if (!servers[message.guild.id]) {
        main.post({ channel, msg: "I am not playing in this channel" });
        return false;
    }

    if (!servers[message.guild.id].active) {
        main.post({ channel, msg: "It doesnt seem like I am playing in this channel" });
        return false;
    }

    return true;
};