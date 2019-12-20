module.exports.sendMsg = function sendMsg(bot, cId, msg) {
	bot.sendMessage({
		to: cId, //channel id
		message: msg
    });
}