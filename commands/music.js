var servers = {};
var active = false;
var stream;

module.exports = {
    name: "music",
    description: "music command",
    execute(channel, args, all) {
        let main = require("../helperFunctions.js")

        if (args.length < 1){
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
                    (async function() {
                        if (ytdl.validateURL(args[0])) //if first arg is a link assume all other are links
                            for(let i = 0; i < args.length; i++)
                                if (ytdl.validateURL(args[i])) //still validate tho
                                    addToQueue(await createRecord(args[i]), server);
                        else await search(args.join("+"), server, all); //assume a search query
                        
                        if (server.queue.length > 0) {
                            //Get bot to join voice channel
                            if (!active) all.member.voiceChannel.join().then(function(connection) {
                                active = true;
                                play(connection, server);    
                            });
                        }
                    }());
                }
            } else if (action === "stop")
                stop(server);
            else if (action == "pause")
                main.post(channel, "Programmers in get to this part yet srry...");// not sure we will either
            else if (action === "skip" || action === "next")
                skip(server);
            else if (action === "queue")
                viewQueue(server);
            else if (action === "back")
                back(server);
            else;
        }

        function play(connection, server) {
            let item = server.queue[server.cur];
            //link.split("?")[1].substring(2) //if ya choose to pass as simply an id
            stream = ytdl(item.id, {filter: "audioonly"});
            server.dispatcher = connection.playStream(stream, { seek: 0, volume: 1 });
            main.post(channel, "Playing "+item.title);

            server.dispatcher.on("end", function() {
                if (server.queue[server.cur+1]) { //if items left in queue
                    server.cur++; //increment to point to next item
                    play(connection, server);
                } else {
                    active = false;
                    connection.disconnect(); //if none just leave voice channel
                }
            })
        }

        function stop(server) {
            if(server.dispatcher) {
                resetQueue(server);
                //if i end the currently playing song and the queue empty...
                server.dispatcher.end(); 
                main.post(channel, "Stopping all songs");
            }
        }

        function skip(server) {
            //ending currently playing song will effectively skip to next (if there is a next)
            if(server.dispatcher) {
                server.dispatcher.end();
                main.post(channel, "Skipping song");
            }
        }

        function back(server) {
            if (server.dispatcher) {
                //need to do this twice to achieve back motion
                server.cur -= 2;
                server.dispatcher.end();
                main.post(channel, "Going to previous song");
            }
        }

        function viewQueue(server) {
            l = "";
            if (!server.queue || server.queue.length < 1)
                main.post(channel, "Queue is empty");
            else {
                for(let j = 0; j < server.queue.length; j++)
                    if (j == server.cur)
                        l += "+ "+ server.queue[j].title + " +\n";
                    else l += server.queue[j].title + "\n";
                main.post(channel, l);
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
                vids.push(await createRecord(id, server));
                if (vids.length >= 5)
                    break;
            }
            
            const { RichEmbed } = require("discord.js");
            const embed = new RichEmbed().setColor("#e9f931")
            .setTitle("Choose a song by entering a number");

            
            for (let j = 0; j < vids.length; j++)
                embed.addField("Song "+(j+1).toString(), vids[j].title);
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
                addToQueue(vids[choose-1], server);
        }

        function addToQueue(vid, server) {
            main.post(channel, "Adding "+vid.title+" to queue");
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
                server.filled = 0;
            }
        }

        async function createRecord(link) {
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
        }
        
    } 
}