/*module.exports = {
    name: "slap",
    description: "slap command",
    execute: async(bot, msg, channelId, args) => {
        let member = await msg.mentions.members.first();

        if (!memeber){
            return main.sendMsg({embed: {
                color: 3447003,
                title: "Mention a valid member of this server!"

            }}).then (msg => msg.delete(2132));

        await main.sendMsg({embed: {
            color: 3447003,
            title: msg.author.username + " slapped : raised_back_of_hand: " + member.displayName + ", " + member.displayName + " is now in the hospital! :hosptial:"
        }});

}
    }
}*/