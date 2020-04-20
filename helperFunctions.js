module.exports.post = function sendMsg(channel, msg) {
	channel.send(msg);
}

module.exports.removeFirstArg = function removeFirstArg(arr) {
	pure = [];
	for(i = 1; i < arr.length; i++)
		pure.push(arr[i]);
	return pure;
}

module.exports.cleanArgs = function clean(arr) {
	pure = [];
	arr.forEach(a => {
		if (a.length > 0 && a !== ' ')
			pure.push(a);
	});
	return pure;
}