module.exports = {
    name: "price",
    description: "command the price of a given cryptocurrency",
    execute(channel, args) {
        const main = require("../helperFunctions.js");
        const request = require("request");

        //if user passed args to search, join them together for the url
        search = "";
        for (i = 1; i < args.length; i++)
            search += args[i] + "+";
        search = search.trim().substring(0, search.length - 1);

        let options = {
            url: "https://coinmarketcap.com/",
            method: "GET",
            headers: {
                "Accept": "text/html",
                "User-Agent": "Mozilla/5.0 (X11; Linux i586; rv:31.0) Gecko/20100101 Firefox/71.0"
            }
        };

        request(options, function (error, response, body) {
            if (error) {
                console.log(error);
                return;
            }

            //parse page
            const DomParser = require('dom-parser');
            let parser = new DomParser();

            let page = parser.parseFromString(body);

            let coin = null;

            Array.from(page.getElementsByTagName("tr")).forEach(tr => {
                let nameCell = tr.childNodes[2].innerHTML;
                let name = parser.parseFromString(nameCell).getElementsByTagName("p")[0];
                if (!name)
                    name  = parser.parseFromString(nameCell).getElementsByTagName("span")[1];
                let price = tr.childNodes[3].textContent;
                let change = tr.childNodes[4].textContent;

                if (name.textContent.toLowerCase() == search.toLowerCase()) {
                    coin = {
                        name: name.textContent,
                        price: price.replace("<!-- -->",""),
                        change: change.replace("<!-- -->","")
                    }
                }
            })

            // post result to chat
            if (coin != null) {
                let response = "Coin: " + coin.name;
                response += "\nPrice: " + coin.price;
                if (coin.change.length > 0)
                    response += "\n24hr Change: " + coin.change;
                main.post(channel, response);
            } else main.post(channel, "Couldnt find coin: "+search);
        });
    }
}
