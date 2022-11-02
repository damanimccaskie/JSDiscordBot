const fs = require('fs');

module.exports = {
    name: "untrack",
    description: "remove channel from the tracked list",
    execute({channel, args}) {
        const main = require("../helperFunctions.js");
        args.shift();

        let search = args
                        .reduce((prevValue, curValue) => prevValue + curValue + " ", "")
                        .trim();
        if (search.length > 0) {
            let channels = loadTrack();
            let originalCount = channels.length;
            channels = channels.filter(item => item["Name"].toLowerCase() !== search.toLowerCase());
            if (originalCount > channels.length) {
                storeTrack(channels);
                main.post({ channel, msg: "Removed " + search });
            } else main.post({ channel, msg: "Could not find: " + search });
        } else main.post({ channel, msg: "You need to pass a channel name to remove" });
    }
}

const storeTrack = (trackArr) => {
    fs.writeFileSync(global.TRACK_FILE , JSON.stringify(trackArr));
}

const loadTrack = () => {
    try {
        let data = fs.readFileSync(global.TRACK_FILE );
        return JSON.parse(data);
    } catch (e) {
        console.log("Failed to load checked, may be first time running");
        return [];
    }
}