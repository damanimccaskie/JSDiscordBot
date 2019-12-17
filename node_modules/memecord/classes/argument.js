const validators = {
	boolean: require('../argumentValidators/boolean.js'),
	channel: require('../argumentValidators/channel.js'),
	number: require('../argumentValidators/number.js'),
	role: require('../argumentValidators/role.js'),
	string: require('../argumentValidators/string.js'),
	user: require('../argumentValidators/user.js')
};

/**
 * The Argument class allows you to create command arguments
 *
 * @example
 * const memeNameArgument = new memecord.Argument({
 *   type: 'string',
 *   key: 'memeName',
 *   label: 'Name',
 *   infinite: true
 * });
 */
class Argument {

	/**
	 * Creates a new argument
	 * @param {object} options The argument options
	 * @param {string} options.type The argument type
	 * @param {string} options.key The key for the argument. This is the name you access the argument with in your command function
	 * @param {string} options.label The argument label, used in the help command
	 * @param {boolean} [options.optional=false] Wether the argument is optional
	 * @param {boolean} [options.infinite=false] Wether the argument is infinite
	 */
	constructor({
		type,
		key,
		label,
		optional = false,
		infinite = false
	} = {}) {
		if(typeof type !== 'string') throw new TypeError(`Argument types must be passed as a string, not ${typeof type}`);
		if(typeof key !== 'string') throw new TypeError(`Argument keys must be passed as a string, not ${typeof type}`);
		if(typeof label !== 'string') throw new TypeError(`Argument labels must be passed as a string, not ${typeof type}`);
		if(typeof optional !== 'boolean') throw new TypeError(`Argument option "optional" must be passed as a boolean, not ${typeof optional}`);
		if(typeof infinite !== 'boolean') throw new TypeError(`Argument option "infinite" must be passed as a boolean, not ${typeof infinite}`);

		if(!validators[type]) throw new TypeError(`Argument type ${type} doesn't exist`);

		this.type = type;
		this.key = key;
		this.label = label;
		this.optional = optional;
		this.infinite = infinite;
	}

	/**
	 * Validates if the value is of the correct type
	 * @private
	 * @param {*} value The value to validate
	 * @param {Client} client The client to use (for discord type parsing)
	 * @returns {boolean} Wether the value is of the correct type
	 */
	validate(value, client) {
		return validators[this.type].validate(value, client);
	}

	/**
	 * Parses the value to the argument type
	 * @private
	 * @param {*} value The value to parse
	 * @param {Client} client The client to use (for discord type parsing)
	 * @returns {*} The parsed value
	 */
	parse(value, client) {
		return validators[this.type].parse(value, client);
	}

}

module.exports = Argument;
