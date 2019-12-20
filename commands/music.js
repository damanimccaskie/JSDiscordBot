module.exports = {
    name: "music",
    description: "music command",
    execute(bot, c_id, msg, action, args, user) {
        main = require("../helperFunctions.js")
        if (!args[1])
            main.sendMsg(bot, c_id, "Kinda need a lil more info than that...");
        else if (args.length > 2) {
           //check for if person trying to search for a song
        } else {
            if (!servers[msg.d.guild_id]) servers[msg.d.guild_id] = {
                queue: []
            }; //create a queue for this server if it does not exist*/
        
            //console.log(msg);
            //console.log(bot.users);
        
            /*if (!user.voiceChannel)
                main.sendMsg(bot, c_id, "You need to be in the voice channel to have me play music");
            else {*/
                let server = servers[0];
        
                //Get bot to join voice channel
                console.log(msg.member);
                bot.channels['654695814228082718'].join().then(function(connection) {
                    if (action === "play") {
                        server.queue.push(args[1]); //add link to queue
                        play(connection, server);
                    } else if (action === "stop")
                        sendMsg(c_id, "Programmers in get to this part yet srry...");//stop();
                    else if (action == "pause")
                        sendMsg(c_id, "Programmers in get to this part yet srry...");//pause();
                    else
                        sendMsg(c_id, "Programmers in get to this part yet srry...");//skip();
                })
            //}
        }

        function play(connection, server) {
            server.dispatcher = connection.playStream(ytdl(server.queue[0], { filter: (format) => format.container === 'm4a' }));
            server.queue.shift();
        
            server.dispatcher.on("end", function() {
                if (server.queue[0])
                    play(connection, server.queue[0], server);
                //else disconnect i guess
            })
        }
        
    } 
}