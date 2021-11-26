const cows = require('cows');
const rn = require('random-number');

module.exports = {
    name: "cow",
    description: "cow command",
    execute: async ({channel}) => {
        const main = require("../helperFunctions.js");

        const options = {
            min: 0,
            max: cows().length - 1,
            integer: true
        };
        const random = rn(options);
        main.post(channel, cows()[random], { code: '' });
    }
}