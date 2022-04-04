const fs = require('fs');
const request = require("request");
const MAX_CHANNELS = 8;
const TRACK_FILE = "data/track.json";
const CHECKED_FILE = "data/checked.json";

let checked = [];

module.exports = {
    name: "track",
    description: "get latest videos from a youtube channel",
    execute({ channel, args }) {
        const main = require("../helperFunctions.js");

        //if user passed args to search, join them together for the url
        args.shift();
        let search = args
                        .reduce((prevValue, curValue) => prevValue + curValue + " ", "")
                        .trim();
        
        if (search.length < 1) {
            main.post(channel, "Need to provide a search");
            return;
        }

        if (!global.rss_server) {
            main.post(channel, "Dont know the rss server");
            return;
        }

        main.post(channel, "Searching");

        const options = {
            url: global.rss_server + "/api/channels",
            method: "POST",
            headers: {
                "Accept": "application/json; charset=utf-8",
                "User-Agent": "Mozilla/5.0 (X11; Linux i586; rv:31.0) Gecko/20100101 Firefox/71.0"
            },
            body: { search },
            json: true
        };

        request(options, (error, response, body) => {
            if (error) {
                console.log(error);
                return;
            }

            if (response.statusCode != 200) {
                main.post(channel, body);
                return;
            }

            let channels = body;
            if (channels.length < 1) {
                main.post(channel, "Didn't find any results for "+ search + " sorry");
                return;
            }

            const { RichEmbed } = require("discord.js");
            const optionsEmbed = new RichEmbed().setColor("#3158f9")
                .setTitle("Choose a channel by entering a number");

            for (let i = 0; i < channels.length && i < MAX_CHANNELS; i++) {
                optionsEmbed.addField("Channel " + (i + 1).toString(), channels[i].name);
                optionsEmbed.addField("Thumbnail", channels[i].thumbnail);
            }
            optionsEmbed.addField("Exit", "exit");

            main.post(channel, optionsEmbed);

            channel.awaitMessages(m => (m.content > 0 && m.content < channels.length) || m.content === 'exit', {
                max: 2,
                time: 45000,
                errors: ['time'] 
            }).then(collected => {
                let choice = parseInt(collected.first().content) - 1;
                if (choice > -1 && choice < channels.length) {
                    const addEmbed = new RichEmbed().setColor("#f98331");
                    addEmbed
                        .setThumbnail(channels[choice].thumbnail)
                        .setTitle("Adding Channel to db")
                        .setDescription("Adding " + channels[choice].name + " to tracking db")
                        .addField("Channel url", channels[choice].channel)
                        .addField("Feed url", channels[choice].feed);
                    main.post(channel, addEmbed);
    
                    addToDb({
                        Name: channels[choice].name,
                        Thumbnail: channels[choice].thumb,
                        Channel: channels[choice].channel,
                        Feed: channels[choice].feed,
                        DiscordChannel: channel.id // rmr which channel the youtuber was ask to track from
                    });   
                }
            }).catch(collected => main.post(channel, 'Guess you changed your mind'));
        });
    },
    getUpdates: (channels) => {
        const main = require("../helperFunctions.js");

        // if this is the first time reloading the bot,
        // checked to see if there is a file storing the 
        // previously posted videos
        checked = checked.length < 1 ? loadChecked() : checked;

        // read add the channels that have been added for tracking
        // and look for the latest video
        fs.readFile(TRACK_FILE, (err, data) => {
            if(err) {
                console.log(err);
                return;
            }
            let records = JSON.parse(data);
            records.forEach(record => {
                const options = {
                    url: global.rss_server + "/api/videos/" + record.Feed.split("=")[1],
                    method: "GET",
                    headers: {
                        "Accept": "text/html",
                        "User-Agent": "Mozilla/5.0 (X11; Linux i586; rv:31.0) Gecko/20100101 Firefox/71.0"
                    }
                };
                request(options, (error, response, body) => {
                    if (error) {
                        console.log(error);
                        return;
                    }
                    if (response.statusCode !== 200) {
                        main.post(channel, body);
                        return;
                    }

                    let videos = JSON.parse(body);

                    if (videos.length < 1) return; // this usually doesnt happen, but if youtube breaks it will

                    if (!checked.includes(videos[0].id)) {
                        const channel = channels.get(record.DiscordChannel); // get the discord channel to post to
                        main.post(channel, "https://www.youtube.com/watch?v=" + videos[0].id)
                        checked.push(videos[0].id);
                    }
                });
            });
        });

        // save checked videos to persistent storage
        storeChecked();
    }
}

const addToDb = (record) => {
    // write the record to db to keep track of posts

    // loadDB and add record then write back to file
    fs.readFile(TRACK_FILE, (err, data) => {
        if (err) {
            // assume file has not been created yet
            fs.writeFileSync(TRACK_FILE, JSON.stringify([record]));
            console.log("Created the database");
            return;
        }
        let records = JSON.parse(data);
        // if record is not already in the db, add it
        if (records.filter(i => i.Name == record.Name && i.DiscordChannel != record.DiscordChannel).length < 1) {
            records.push(record);
            fs.writeFileSync(TRACK_FILE, JSON.stringify(records));
            console.log("Updated the database");
        }
    })
}

const storeChecked = () => {
    fs.writeFileSync(CHECKED_FILE, JSON.stringify(checked));
}

const loadChecked = () => {
    try {
        let data = fs.readFileSync(CHECKED_FILE);
        return JSON.parse(data);
    } catch (e) {
        console.log("Failed to load checked, may be first time running");
        return [];
    }
}