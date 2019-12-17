const trueStrings = ['y', 'yes', 'true', '1'];
const falseStrings = ['n', 'no', 'false', '0'];

/**
 * Validates the argument
 * @param {*} value The value to validate
 * @returns {boolean} Wether the value is of the correct type
 */
const validate = (value) => {

	return trueStrings.includes(value.toLowerCase()) || falseStrings.includes(value.toLowerCase());

};

/**
 * Parses the argument
 * @param {*} value The value to parse
 * @returns {boolean} The parsed value
 */
const parse = (value) => {

	return trueStrings.includes(value.toLowerCase());

};

module.exports = {
	validate: validate,
	parse: parse
};
