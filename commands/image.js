module.exports = {
    name: "image",
    description: "image command",
    execute(channel, args) {
        const main = require("../helperFunctions.js");
        const cheerio = require("cheerio");
        const request = require("request");

        const set = ["random", "meme", "suicide"];

        //if user passed args to search, join them together for the url
        search = "";
        for (i = 1; i < args.length; i++)
            search += args[i] + "+";
        search = search.trim().substring(0, search.length - 1);

        //https://www.google.com/search?tbm=isch&q=
        //http://results.dogpile.com/serp?qc=images&q=
        //https://yandex.com/images/search?&text= //captcha protected
        //https://searx.me/?categories=images&language=en-US&q=
        //https://www.qwant.com/?t=images&q=
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
                main.post(channel, "Couldn't find any images that match that description... srry");
                console.log("No results");
                return;
            }

            //post image to chat
            const { RichEmbed } = require("discord.js");
            const embed = new RichEmbed().setColor("#33ffff").setImage(urls[Math.floor(Math.random() * urls.length)]);
            main.post(channel, embed);
        });
    } 
}
