const api = require('discord.js');

/**
 * The Utils class contains handy utilities
 */
class Utils {

	/**
	 * Instantiates a new utility class
	 * @param {Client} client The memecord client to bind to
	 */
	constructor(client) {
		this.client = client;
	}

	/**
	 * Filters out any mentions and replaces them with their respective names
	 * @param {string} messageContent The message content to escape
	 * @returns {string} The escaped string
	 *
	 * @example
	 * <Client>.utils.filterMentions('hey <@254696880120791040>'); // 'hey @matmen'
	 */
	filterMentions(messageContent = '') {

		return messageContent.replace(/<@&(\d+)>|<@!(\d+)>|<@(\d+)>|<#(\d+)>/g, (match, RID, NID, UID, CID) => {
			if(UID && this.bot.users.has(UID)) return `@${this.bot.users.get(UID).username}`;
			if(CID && this.bot.channels.has(CID)) return `#${this.bot.channels.get(CID).name}`;

			if(RID || NID) {
				for(const server of this.bot.guilds.values()) {
					if(RID && server.roles.has(RID)) return `@${server.roles.get(RID).name}`;
					if(NID && server.members.has(NID)) return `@${server.members.get(NID).displayName}`;
				}
			}

			if(CID) return '#deleted-channel';
			if(RID) return '@deleted-role';
			return '@invalid-user';
		});

	}

	/**
	 * Splits a string of arguments
	 * @param {string} argumentString The string to split
	 * @returns {Array<string>} The split arguments
	 *
	 * @example
	 * <Client>.utils.splitArguments('i really "hope this" works'); // ['i', 'really', 'hope this', 'works']
	 */
	splitArguments(argumentString = '') {
		const splitArguments = argumentString.replace(/^ | $/g, '').split('');

		const args = [];
		let inMultiwordArg = false;
		let currentArg = '';

		for(const char of splitArguments) {

			if(char === '"') {
				inMultiwordArg = !inMultiwordArg;
			} else if(char === ' ' && !inMultiwordArg && currentArg) {
				args.push(currentArg);
				currentArg = '';
			} else if(char !== ' ' || inMultiwordArg) currentArg += char;

		}

		args.push(currentArg);

		return args;
	}

	/**
	 * Parses an array of arguments
	 * @private
	 * @param {Array<string>} givenArgs The split arguments
	 * @param {Array<Argument>} commandArgs The arguments that the givenArgs should map to
	 * @returns {external:Collection<string, *>} The mapped arguments, or an error object
	 */
	mapArguments(givenArgs, commandArgs) {

		let argumentIndex = 0;
		const args = new api.Collection();

		for(const argument of commandArgs) {

			if(argument.infinte && argumentIndex < commandArgs.length - 1) throw new Error('Infinite arguments must be the last argument');
			if(argument.optional && commandArgs.slice(argumentIndex + 1).filter(arg => !arg.optional).length) throw new Error('Optional Arguments must be at the end');

			if(argument.infinite) {
				const value = argument.parse(givenArgs.slice(argumentIndex).join(' '));

				if(!value && !argument.optional) return {
					success: false,
					error: `Argument "${argument.label}" is missing`
				};

				if(value) args.set(argument.key, value);

				break;
			}

			if(!argument.optional && !givenArgs[argumentIndex]) return {
				success: false,
				error: `Argument "${argument.label}" is missing`
			};

			if((givenArgs[argumentIndex] || !argument.optional) && !argument.validate(givenArgs[argumentIndex], this.client)) return {
				success: false,
				error: `Argument "${argument.label}" must be a valid ${argument.type}`
			};

			if(givenArgs[argumentIndex]) args.set(argument.key, argument.parse(givenArgs[argumentIndex], this.client));

			argumentIndex++;

		}

		return {
			success: true,
			args: args
		};

	}

	/**
	 * Checks wether a user is a bot owner
	 * @param {string} userID The user ID to check
	 * @returns {boolean} Wether the user is a bot owner
	 *
	 * @example
	 * <Client>.utils.isOwner('254696880120791040'); // true
	 */
	isOwner(userID) {
		return this.client.ownerIDs.has(userID);
	}

}

module.exports = Utils;
