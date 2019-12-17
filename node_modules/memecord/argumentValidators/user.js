/**
 * Validates the argument
 * @param {*} value The value to validate
 * @param {Client} client The client to use for validating that the user exists
 * @returns {boolean} Wether the value is of the correct type
 */
const validate = (value, client) => {

	const validSyntax = !!value.match(/^(<@(!)?)?\d+(>)?$/);
	const userID = value.replace(/^<@(!)?|>$/g, '');
	const botHasUser = client.bot.users.has(userID);

	return validSyntax && botHasUser;

};

/**
 * Parses the argument
 * @param {*} value The value to parse
 * @param {Client} client The client to use for parsing the user
 * @returns {external:User} The parsed value
 */
const parse = (value, client) => {

	const userID = value.replace(/^<@(!)?|>$/g, '');

	return client.bot.users.get(userID);

};

module.exports = {
	validate: validate,
	parse: parse
};
