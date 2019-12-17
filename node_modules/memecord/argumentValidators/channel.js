/**
 * Validates the argument
 * @param {*} value The value to validate
 * @param {Client} client The client to use for validating that the user exists
 * @returns {boolean} Wether the value is of the correct type
 */
const validate = (value, client) => {

	const validSyntax = !!value.match(/^(<#)?\d+(>)?$/);
	const userID = value.replace(/^<#|>$/g, '');
	const botHasChannel = client.bot.channels.has(userID);

	return validSyntax && botHasChannel;

};

/**
 * Parses the argument
 * @param {*} value The value to parse
 * @param {Client} client The client to use for parsing the user
 * @returns {external:Channel} The parsed value
 */
const parse = (value, client) => {

	const channelID = value.replace(/^<#|>$/g, '');

	return client.bot.users.get(channelID);

};

module.exports = {
	validate: validate,
	parse: parse
};
