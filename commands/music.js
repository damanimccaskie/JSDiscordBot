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
                     add command to search user args if not link .... this if args.length > 2
                     add code to verify valid url / id
                     maybe add command to go back (would have to change how queue works)
                     add command to clear queue
            */
            if (action == 'play') {
                if (!args[0])
                    main.post(channel, "Kinda need a lil more info than that...");
                else {
                    if (ytdl.validateURL(args[0]))
                        createRecord(args[0], server); //unfortunately can only parse 1 link at a time (currently)
                    else {
                        //assume a search query
                        main.post(channel, "Sorry cant search at the moment");
                    }
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
                for(i = 0; i < server.queue.length; i++)
                    if (i == server.cur)
                        l += "+ "+ server.queue[i].title + " +\n";
                    else l += server.queue[i].title + "\n";
                main.post(channel, l);
            }
        }

        function resetQueue(server) {
            if (server) {
                server.queue = [];
                server.cur = 0;
                server.filled = 0;
            }
        }

        function createRecord(link, server) {
            //create struct to contain link, and vid info
            ytdl.getInfo(link, (err, info) => {
                vid = {
                    "thumbnail": info.player_response.videoDetails.thumbnail,
                    "id": info.video_id, 
                    "url": info.video_url,
                    "length": info.length_seconds,
                    "title": info.title
                }

                server.queue.push(vid);
                
                //Get bot to join voice channel
                if (!active) all.member.voiceChannel.join().then(function(connection) {
                    active = true;
                    play(connection, server);    
                });
            });
        }
        
    } 
}