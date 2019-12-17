/*eslint no-console: "off" */
require('colors');

const logLevels = ['NONE', 'ERROR', 'WARNING', 'INFO', 'VERBOSE'];
const logPrefixes = ['', '[ERROR]'.bgRed, '[WARNING]'.yellow, '[INFO]'.cyan, '[VERBOSE]'.green];

/**
 * The logger class allows you to easily create console loggers
 *
 * @example
 * const logger = new memecord.Logger({
 *   logLevel: 'VERBOSE'
 * });
 * logger.log('memes are good', 'INFO');
 */
class Logger {

	/**
	 * Creates a new console logger
	 * @param {object} options The logger options
	 * @param {string} [options.logLevel=INFO] The level to log at
	 * @param {number} [options.shardID=-1] The ID of the shard logging
	 */
	constructor({
		logLevel = 'INFO',
		shardID = -1
	} = {}) {
		if(!logLevels.includes(logLevel)) throw new TypeError(`Log level "${logLevel}" is not supported`);

		this.logLevel = logLevel;
		this.logLevelIndex = logLevels.indexOf(logLevel);
		this.shardID = shardID;
	}

	/**
	 * Logs a message to the console
	 * @param {string} message The message to log
	 * @param {string} [level] The level to log at
	 * @returns {void}
	 */
	log(message = '', level = 'INFO') {
		if(!logLevels.includes(level)) throw new TypeError(`Invalid log level "${level}"`);
		if(logLevels.indexOf(level) > this.logLevelIndex || logLevels.indexOf(level) === 0) return;

		console.log(`${`[Shard ${this.shardID}]`.red} ${logPrefixes[logLevels.indexOf(level)]} ${message}`);
	}

}

module.exports = Logger;
