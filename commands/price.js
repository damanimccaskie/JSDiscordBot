module.exports = {
    name: "price",
    description: "command the price of a given cryptocurrency",
    async execute({channel, args}) {
        const main = require("../helperFunctions.js");

        //if user passed args to search, join them together for the url
        search = "";
        for (i = 1; i < args.length; i++)
            search += args[i] + " ";
        search = search.trim().substring(0, search.length - 1);

        const CoinGecko = require('coingecko-api');
        const CoinGeckoClient = new CoinGecko();

        let data = await CoinGeckoClient.simple.price({
            ids: [search],
            vs_currencies: ['usd'],
            include_24hr_vol: true,
            include_24hr_change: true
        });

        // post result to chat
        try {
            if (Object.entries(data.data).length != 0) {
                let response = "Coin: " + search;
                response += "\nPrice (usd): $" + data.data[search].usd;
                if (data.data[search].usd_24h_vol) 
                    response += "\n24hr Volume (usd): " + data.data[search].usd_24h_vol;
                if (data.data[search].usd_24h_change) 
                    response += "\n24hr Change (%): " + data.data[search].usd_24h_change;
                main.post(channel, response)
            } else main.post(channel, "Couldnt find coin: "+search);
        } finally {
            return data;
        }
    }
}
