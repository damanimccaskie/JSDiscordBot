/**
 * Validates the argument
 * @param {*} value The value to validate
 * @param {Client} client The client to use for validating that the user exists
 * @returns {boolean} Wether the value is of the correct type
 */
const validate = (value, client) => {

	const validSyntax = !!value.match(/^(<@&)?\d+(>)?$/);
	const roleID = value.replace(/^<@&|>$/g, '');
	const botHasRole = client.bot.guilds.some(guild => guild.roles.has(roleID));

	return validSyntax && botHasRole;

};

/**
 * Parses the argument
 * @param {*} value The value to parse
 * @param {Client} client The client to use for parsing the user
 * @returns {external:Role} The parsed value
 */
const parse = (value, client) => {

	const roleID = value.replace(/^<@&|>$/g, '');

	return client.bot.guilds.filter(guild => guild.roles.has(roleID)).first().roles.get(roleID);

};

module.exports = {
	validate: validate,
	parse: parse
};
