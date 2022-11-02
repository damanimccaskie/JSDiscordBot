module.exports.post = function sendMsg({ channel, msg, embeds, files }) {
	if (!msg && !embeds && !files) {
		console.log("Must provide either a message, embed or a file to post to the channel");
		return false;
	}
	
	let sendObject = {};

	if (msg)
		sendObject.content = msg;

	if (embeds)
		sendObject.embeds = embeds;

	if (files)
		sendObject.files = files;
	
	channel.send(sendObject);
}

module.exports.removeFirstArg = function removeFirstArg(arr) {
	pure = [];
	for (let i = 1; i < arr.length; i++)
		pure.push(arr[i]);
	return pure;
}

module.exports.cleanArgs = function clean(arr) {
	return arr.filter(a => a.length > 0 && a !== ' ');
}