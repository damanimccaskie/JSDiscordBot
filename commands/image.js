module.exports = {
    name: "image",
    description: "image command",
    execute(bot, channelId, args) {
        const main = require("../helperFunctions.js");
        const cheerio = require("cheerio");
        const request = require("request");

        const set = ["random", "meme", "suicide"];

        //if user passed args to search, join them together for the url
        search = "";
        for (i = 0; i < args.length; i++)
            search += args[i] + " ";
        search.trim();

        //if user didnt pass args randomly choose from set
        let options = {
            url: "http://results.dogpile.com/serp?qc=images&q=" + (!search ? set[Math.floor(Math.random() * set.length)] : search),
            method: "GET",
            headers: {
                "Accept": "text/html",
                "User-Agent": "Mozilla/5.0 (X11; Linux i586; rv:31.0) Gecko/20100101 Firefox/71.0"
            } 
        };

        request(options, function(error, response, body) {
            if (error) {
                console.log(error);
                return;
            }

            //parse page
            page = cheerio.load(body);

            let links = page(".image a.link"); //parse out img
            let urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));

            if (urls.length < 1) {
                main.sendMsg(bot, channelId, "Couldn't find any images that match that description... srry");
                console.log("No results");
                return;
            }

            //post image to chat
            main.sendMsg(bot, channelId, urls[Math.floor(Math.random() * urls.length)]);
        });
    } 
}