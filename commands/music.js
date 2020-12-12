var servers = {};
var active = false;
var stream;

module.exports = {
    name: "music",
    description: "music command",
    execute(channel, args, all) {
        let main = require("../helperFunctions.js")

        if (args.length < 1) {
            //main.post(channel, "Error?");
            return;
        }

        action = args.shift().toLowerCase();

        if (!action) {
            //main.post(channel, "Error?");
            return;
        }

        if (action === "music") {
            main.post(channel, "Slightly confused");
            return;
        }
        const ytdl = require("ytdl-core");

        if (!servers[all.guild.id]) servers[all.guild.id] = {
            queue: [],
            cur: 0,
        }; //create a queue for this server if it does not exist*/

        if (!all.member.voiceChannel)
            main.post(channel, "You need to be in the voice channel to have me play music");
        else {
            let server = servers[all.guild.id];

            /* TODO: add command to view queue (preferably with song name and other details)
            */
            if (action == 'play') {
                if (!args[0])
                    main.post(channel, "Kinda need a lil more info than that...");
                else {
                    (async function () {
                        const ytpl = require('ytpl');
                        if (ytpl.validateURL(args[0])) { //check if playlist
                            let playlist = await ytpl(args[0], { limit: 10 });
                            playlist.items.forEach(i => addToQueue(makeRecord(i), server));
                            all.delete();
                        } else if (ytdl.validateURL(args[0])) { //if first arg is a link assume all other are links
                            for (let i = 0; i < args.length; i++)
                                if (ytdl.validateURL(args[i])) //still validate tho
                                    addToQueue(await createRecord(args[i]), server);
                            all.delete();
                        } else await search(args.join("+"), server, all); //assume a search query

                        if (server.queue.length > 0) {
                            //Get bot to join voice channel
                            if (!active) all.member.voiceChannel.join().then(function (connection) {
                                active = true;
                                play(connection, server);
                            });
                        }
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
            //link.split("?")[1].substring(2) //if ya choose to pass as simply an id
            stream = ytdl(item.id, { filter: "audioonly" });
            server.dispatcher = connection.playStream(stream, { seek: 0, volume: 1 });
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
                for (let j = 0; j < server.queue.length; j++)
                    if (j == server.cur)
                        main.post(channel, "+ " + server.queue[j].title + " +");
                    else main.post(channel, server.queue[j].title);
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
                if (rec == null)
                    continue;
                vids.push(rec);
                if (vids.length >= 5)
                    break;
            }

            const { RichEmbed } = require("discord.js");
            const embed = new RichEmbed().setColor("#e9f931")
                .setTitle("Choose a song by entering a number");


            for (let j = 0; j < vids.length; j++)
                embed.addField("Song " + (j + 1).toString(), vids[j].title);
            embed.addField("Exit", "exit");

            let choose;
            main.post(channel, embed);

            try {
                let response = await msg.channel.awaitMessages(
                    m => (m.content > 0 && m.content < vids.length) || m.content === 'exit',
                    {
                        max: 1,
                        maxProcessed: 1,
                        time: 30000, //wait 30 secs
                        errors: ["time"]
                    }
                );
                choose = parseInt(response.first().content);
            } catch (e) {
                console.log(e);
            }

            if (choose > 0 && choose < vids.length + 1)
                addToQueue(vids[choose - 1], server);
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
            main.post(channel, "Adding " + vid.title + " to queue");
            server.queue.push(vid);
        }

        async function getSearchResults(query) {
            const cheerio = require("cheerio");
            const phantom = require('phantom');

            const instance = await phantom.create();
            const page = await instance.createPage()

            await page.open("https://www.youtube.com/results?search_query=" + query);
            const content = await page.property('content');

            //parse page
            dom = cheerio.load(content);

            let regex = RegExp("/watch[?]v=.+");
            let links = dom("a.yt-uix-tile-link.yt-ui-ellipsis.yt-ui-ellipsis-2.yt-uix-sessionlink.spf-link"); //parse out results
            let urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href")).filter(link => regex.test(link) && !link.includes("list"));

            await instance.exit();
            return urls;
        }

        function resetQueue(server) {
            if (server) {
                server.queue = [];
                server.cur = 0;
            }
        }

        function makeRecord(item) {
            return {
                "thumbnail": item.thumbnail,
                "id": item.id,
                "url": item.url_simple,
                "length": item.duration,
                "title": item.title
            };
        }

        async function createRecord(link) {
            try {
                //create struct to contain link, and vid info
                info = await ytdl.getInfo(link);
                vid = {
                    "thumbnail": info.player_response.videoDetails.thumbnail,
                    "id": info.video_id,
                    "url": info.video_url,
                    "length": info.length_seconds,
                    "title": info.title
                };
                return vid;
            } catch (err) {
                console.log("Couldnt get vid info");
                return null;
            }
        }

    }
}