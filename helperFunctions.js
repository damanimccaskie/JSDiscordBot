module.exports.post = function sendMsg(channel, msg) {
	channel.send(msg);
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