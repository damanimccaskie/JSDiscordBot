/**
 * Validates the argument
 * @param {*} value The value to validate
 * @returns {boolean} Wether the value is of the correct type
 */
const validate = (value) => {

	return !isNaN(value);

};

/**
 * Parses the argument
 * @param {*} value The value to parse
 * @returns {number} The parsed value
 */
const parse = (value) => {

	return parseFloat(value);

};

module.exports = {
	validate: validate,
	parse: parse
};
