/**
 * The command class allows you to create commands, that are automatically triggered when they are used
 *
 * @example
 * const memes = ['me too thanks', 'no u', 'is this thing on'];
 * const memeNumber = new memecord.Argument({
 *   type: 'number',
 *   key: 'number',
 *   label: 'Meme Nr.'
 *  });
 *
 * const command = new memecord.Command({
 *   names: ['meme', 'memes'],
 *   description: 'Sends a meme',
 *   run: function(message, args, argsString) {
 *     const meme = memes[args.get('number')];
 *     message.channel.send(meme || `error 404: meme #${args.get('number')} not found`);
 *   },
 *   args: [memeNumber],
 *   cooldown: 1000
 * });
 *
 * <Client>.registerCommand(command);
 */
class Command {

	/**
	 * Creates a new command
	 * @param {object} options The command options
	 * @param {Array<string>} options.names The command names
	 * @param {string} options.description The command description
	 * @param {CommandFunction} options.run The function to run
	 * @param {Array<Argument>} [options.args=[]] The command arguments
	 * @param {number} [options.cooldown=0] The cooldown after each use in ms
	 * @param {boolean} [options.ownerOnly=false] Wether the command can only be used by the bot owner(s)
	 */
	constructor({
		names,
		description,
		run,
		args = [],
		cooldown = 0,
		ownerOnly = false
	} = {}) {
		if(!Array.isArray(names)) throw new TypeError(`Command names must be passed as an array, not ${typeof names}`);
		if(typeof description !== 'string') throw new TypeError(`Command descriptions must be passed as a string, not ${typeof description}`);
		if(!Array.isArray(args)) throw new TypeError(`Command arguments must be passed as an array, not ${typeof args}`);
		if(typeof run !== 'function') throw new TypeError(`Command functions must be passed as a function, not ${typeof run}`);
		if(typeof cooldown !== 'number') throw new TypeError(`Command cooldowns must be passed as a number, not ${typeof cooldown}`);
		if(typeof ownerOnly !== 'boolean') throw new TypeError(`Command option "ownerOnly" must be passed as a boolean, not ${typeof ownerOnly}`);

		this.name = names[0].toLowerCase();
		this.aliases = names.slice(1);
		this.names = names;
		this.description = description;
		this.args = args;
		this.run = run;
		this.cooldown = cooldown;
		this.ownerOnly = ownerOnly;
	}


	/**
	 * Returns a command's usage string
	 * @returns {string} The command's usage
	 */
	get usage() {

		const args = [];

		for(const argument of this.args) {

			let tag = argument.label;

			if(argument.infinite) tag = `${tag}...`;

			args.push(argument.optional ? `[${tag}]` : `<${tag}>`);

		}

		return args.join(' ');

	}

}

module.exports = Command;
