/**
 * Validates the argument
 * @param {*} value The value to validate
 * @returns {boolean} Wether the value is of the correct type
 */
const validate = (value) => {

	return typeof value === 'string';

};

/**
 * Parses the argument
 * @param {*} value The value to parse
 * @returns {string} The parsed value
 */
const parse = (value) => {

	return value.toString();

};

module.exports = {
	validate: validate,
	parse: parse
};
