var servers = {};
var active = false;
const MAX_SONGS = 5

module.exports = {
    name: "music",
    description: "music command",
    execute({channel, args, message}) {
        let main = require("../helperFunctions.js")

        return main.post(channel, "This command is deprecated");

        if (args.length < 1) {
            // i dont think execution would ever reach here
            main.post(channel, "Error?");
            return;
        }

        action = args.shift().toLowerCase();

        if (!action) {
            // same here
            main.post(channel, "Error?");
            return;
        }

        if (action === "music") {
            main.post(channel, "Music itself is not a command");
            return;
        }
        if (!servers[message.guild.id]) servers[message.guild.id] = {
            queue: [],
            cur: 0,
        }; //create a queue for this server if it does not exist*/

        if (!message.member.voiceChannel)
            main.post(channel, "You need to be in the voice channel to have me play music");
        else {
            let server = servers[message.guild.id];

            /* TODO: add command to view queue (preferably with song name and other details) */
            if (action == 'play') {
                if (!args[0])
                    main.post(channel, "Kinda need a lil more info than that...");
                else {
                    (async function () {
                        const ytpl = require('ytpl');
                        if (ytpl.validateID(args[0])) { //check if playlist
                            let playlist = await ytpl(args[0]);
                            message.delete();
                            if (playlist) {
                                main.post(channel, "Getting playlist items...")
                                for(let i = 0; i < playlist.items.length; i++)
                                    addToQueue(await createRecord(playlist.items[i].url), server);
                            }
                            else main.post(channel, "Unable to get playlist items...")
                        } else if (ytdl.validateURL(args[0])) { //if first arg is a link assume all other are links
                            for (let i = 0; i < args.length; i++)
                                if (ytdl.validateURL(args[i])) //still validate tho
                                    addToQueue(await createRecord(args[i]), server);
                            message.delete();
                        } else await search(args.join("+"), server, message); //assume a search query

                        if (server.queue.length > 0)
                            //Get bot to join voice channel
                            joinAndPlay(server);
                    }());
                }
            } else if (action === "stop")
                stop(server);
            else if (action === "skip" || action === "next")
                skip(server);
            else if (action === "queue")
                viewQueue(server);
            else if (action === "back")
                back(server);
            else if (action === "details")
                viewDetails(server);
            else if (action == "pause")
                pause(server);
            else if (action == "resume")
                resume(server);
            else;
        }

        function joinAndPlay(server) {
            if (!active) message.member.voiceChannel.join().then(function (connection) {
                active = true;
                play(connection, server);
            });
        }

        function pause(server) {
            if (server.dispatcher.paused)
                main.post(channel, "The track is already paused");
            else {
                server.dispatcher.pause();
                main.post(channel, "Pausing " + server.queue[server.cur].title);
            }
        }

        function resume(server) {
            if (!server.dispatcher.paused)
                main.post(channel, "The track is not paused");
            else {
                server.dispatcher.resume();
                main.post(channel, "Resuming " + server.queue[server.cur].title);
            }
        }

        function play(connection, server) {
            let item = server.queue[server.cur];
            server.dispatcher = connection.playStream(item.url, { seek: 0, volume: 1 });
            main.post(channel, "Playing " + item.title);

            server.dispatcher.on("end", function () {
                if (server.queue[server.cur + 1]) { //if items left in queue
                    server.cur++; //increment to point to next item
                    play(connection, server);
                } else {
                    active = false;
                    resetQueue(server); //make sure on next launch queue is empty and u start from the added song
                    connection.disconnect(); //if none just leave voice channel
                }
            })
        }

        function stop(server) {
            if (server.dispatcher) {
                resetQueue(server);
                //if i end the currently playing song and the queue empty...
                main.post(channel, "Stopping all songs");
                server.dispatcher.end();
            }
        }

        function skip(server) {
            //ending currently playing song will effectively skip to next (if there is a next)
            if (server.dispatcher) {
                main.post(channel, "Skipping song");
                server.dispatcher.end();
            }
        }

        function back(server) {
            if (server.dispatcher) {
                //need to do this twice to achieve back motion
                server.cur -= 2;
                main.post(channel, "Going to previous song");
                server.dispatcher.end();
            }
        }

        function viewQueue(server) {
            if (!server.queue || server.queue.length < 1)
                main.post(channel, "Queue is empty");
            else {
                let buffer = "";
                for (let j = 0; j < server.queue.length; j++) {
                    buffer += (j == server.cur ? "+ " + server.queue[j].title + " +" : channel, server.queue[j].title) + "\n";
                    if (buffer.length >= 1500) {
                        main.post(channel, buffer);
                        buffer = ""
                    }
                }
                if (buffer.length > 0)
                    main.post(channel, buffer);
            }
        }

        async function search(query, server, msg) {
            main.post(channel, "Searching");

            let urls = await getSearchResults(query);

            if (urls.length < 1) {
                main.post(channel, "Didn't find any results from that search sorry");
                console.log("No results");
                return;
            }

            let vids = [];
            for (let j = 0; j < urls.length; j++) {
                let id = urls[j].split("=")[1];
                if (!ytdl.validateID(id))
                    continue;
                let rec = await createRecord(id, server);
                if (!rec)
                    continue;
                vids.push(rec);
                if (vids.length >= MAX_SONGS)
                    break;
            }

            const { RichEmbed } = require("discord.js");
            const embed = new RichEmbed().setColor("#e9f931")
                .setTitle("Choose a song by entering a number");


            for (let j = 0; j < vids.length; j++)
                embed.addField("Song " + (j + 1).toString(), vids[j].title);
            embed.addField("Exit", "exit");

            main.post(channel, embed);

            msg.channel.awaitMessages(m => (m.content > 0 && m.content < vids.length) || m.content === 'exit', {
                max: 2,
                time: 45000,
                errors: ['time'] 
            }).then(collected => {
                let choose = parseInt(collected.first().content);
                if (choose > 0 && choose < vids.length + 1)
                    addToQueue(vids[choose - 1], server);
                joinAndPlay(server);
            }).catch(collected => msg.channel.send('Guess you changed your mind'));
        }

        function viewDetails(server) {
            if (server && server.queue && server.queue[server.cur]) {
                let item = server.queue[server.cur];
                const { RichEmbed } = require("discord.js");
                const embed = new RichEmbed().setColor("#e9f931")

                embed.setThumbnail(item.thumbnail.thumbnails[0].url).setTitle(item.title).setDescription(convertTime(item.length));
                main.post(channel, embed);
            } else main.post(channel, "I dont think there is a song playing currently");
        }

        function convertTime(s) {
            days = hrs = mins = secs = 0;
            for (let i = 0; i < s; i++) {
                secs++;
                if (secs > 59) {
                    secs = 0;
                    mins++;
                    if (mins > 59) {
                        mins = 0;
                        hrs++;
                        if (hrs > 23) {
                            hrs = 0;
                            days++;
                        }
                    }
                }
            }
            if (days === 0) {
                if (hrs === 0) {
                    if (mins === 0) {
                        return secs + " second" + secs === 1 ? "" : "s";
                    } else return mins + " minute" + (mins === 1 ? "" : "s") + " and " + secs + " second" + (secs === 1 ? "" : "s");
                } else return hrs + " hour" + (hrs === 1 ? " " : "s ") + mins + " minute" + (mins === 1 ? " " : "s") + " and " + secs + " second" + (secs === 1 ? "" : "s");
            } else return days + " day" + (days === 1 ? " " : "s ") + hrs + " hour" + (hrs === 1 ? " " : "s ") + mins + " minute" + (mins === 1 ? "" : "s") + " and " + secs + " second"(secs === 1 ? "" : "s");
        }

        function addToQueue(vid, server) {
            if (vid) {
                main.post(channel, "Adding " + vid.title + " to queue");
                server.queue.push(vid);
            } else console.log("Vid data struct was null");
        }

        async function getSearchResults(query) {
            const ytsr = require('ytsr');
        
            const searchResults = (await ytsr(query)).items;
            let regex = RegExp("/watch[?]v=.+");
            let urls = Array.from(searchResults.map(v => v.url));
            urls = urls.filter(v => regex.test(v) && !v.includes("list"));
            return urls;
        }

        function resetQueue(server) {
            if (server) {
                server.queue = [];
                server.cur = 0;
            }
        }

        async function createRecord(link) {
            try {
                // create struct to contain link, and vid info
                const youtubedl = require('youtube-dl')
                let vid = null;
                youtubedl.getInfo(link, [], (err, info) => {
                    if (err) throw err;

                    vid_url = null;
                    for(let i = 0; i < info.formats.length; i++)
                        if (info.formats[i].format_id == "140") {
                            vid_url = info.formats[i].url;
                            break;
                        }

                    if (!vid_url)
                        vid = "format not avaliable";
                    else vid = {
                        "thumbnail": info.thumbnails[0].url,
                        "id": info.id,
                        "url": vid_url,
                        "length": info._duration_raw,
                        "title": info.title
                    };
                });
                while(!vid)
                    await new Promise(r => setTimeout(r, 250))
                if (typeof(vid) === 'string')
                    return null;
                else return vid;
            } catch (err) {
                console.log("Couldnt get vid info");
                console.log(err)
                return null;
            }
        }

    }
}