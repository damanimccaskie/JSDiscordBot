var servers = {};
var active = false;
var stream;

module.exports = {
    name: "music",
    description: "music command",
    execute(channel, args, all) {
        let main = require("../helperFunctions.js")
        action = args[0].toLowerCase();
        if (action === "music") {
            main.post(channel, "Slightly confused"); 
            return;
        }
        const ytdl = require("ytdl-core");

        if (!servers[all.guild.id]) servers[all.guild.id] = {
            queue: []
        }; //create a queue for this server if it does not exist*/
        
        if (!all.member.voiceChannel)
            main.post(channel, "You need to be in the voice channel to have me play music");
        else {
            let server = servers[all.guild.id];
            
            /* TODO: add command to view queue (preferably with song name and other details)
                     add command to search user args if not link .... this if args.length > 2
                     add code to verify valid url / id
                     maybe add command to go back (would have to change how queue works)
            */
            if (action == 'play') {
                if (!args[1])
                    main.post(channel, "Kinda need a lil more info than that...");
                else if (args.length > 2) {
                    //check for if person trying to search for a song
                } else
                    server.queue.push(args[1]); //add link to queue
            } else if (action === "stop")
                stop(server);
            else if (action == "pause")
                main.post(channel, "Programmers in get to this part yet srry...");// not sure we will either
            else
                skip(server); //at this point it could only else be skip || next

            //Get bot to join voice channel
            if (!active) all.member.voiceChannel.join().then(function(connection) {
                active = true;
                if (action === "play")
                    play(connection, server);    
            });
        }

        function play(connection, server) {
            link = server.queue[0];
            //link.split("?")[1].substring(2) //if ya choose to pass as simply an id
            stream = ytdl(link, {filter: "audioonly"});
            server.dispatcher = connection.playStream(stream, { seek: 0, volume: 1 });
        
            server.queue.shift(); //play and drop off queue(^^)

            server.dispatcher.on("end", function() {
                if (server.queue[0]) //if items left in queue
                    play(connection, server);
                else {
                    active = false;
                    connection.disconnect(); //if none just leave voice channel
                }
            })
        }

        function stop(server) {
            if(server.dispatcher) {
                server.queue = [];
                //if i end the currently playing song and the queue empty...
                server.dispatcher.end(); 
            }
        }

        function skip(server) {
            //ending currently playing song will effectively skip to next (if there is a next)
            if(server.dispatcher) 
                server.dispatcher.end(); 
        }
        
    } 
}