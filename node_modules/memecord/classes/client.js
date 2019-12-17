require('colors');

const fs = require('fs');
const path = require('path');
const api = require('discord.js');
const Logger = require('./logger.js');
const Utils = require('./utils.js');

/**
 * The Client class allows you to create a new bot instance
 *
 * @example
 * const client = new memecord.Client({
 *   token: 'your-token-here',
 *   ownerID: 'your-user-id',
 *   prefix: 'meme!',
 *   djsOptions: {
 *     'disableEveryone': true
 *   }
 * });
 *
 * client.run();
 */
class Client {

	/**
	 * Creates a new bot instance
	 * @param {object} options Options for the client
	 * @param {string} options.token Discord login token for the client
	 * @param {string|Array<string>} options.ownerID Discord client ID of the owner
	 * @param {string} options.prefix The prefix for the bot to use
	 * @param {boolean} [options.selfbot=false] Whether this bot is a selfbot or not
	 * @param {boolean} [options.allowDM=false] Whether commands via DMs are allowed
	 * @param {boolean} [options.allowRecursion=false] Whether recursion is allowed (REALLY not recommended)
	 * @param {boolean} [options.allowBotUsage=false] Whether other bots may use this bot (not recommended)
	 * @param {string} [options.logLevel=INFO] The log level to use, one of NONE, ERROR, WARNING, INFO, VERBOSE
	 * @param {object} [options.djsOptions] Options to pass to discord.js, see {@link https://discord.js.org/#/docs/main/stable/typedef/ClientOptions}
	 *
	 * @property {external:Discord} api The discord.js module
	 * @property {external:Client} bot The discord.js client memecord sits on
	 * @property {external:Collection<string, Command>} commands A collection of all registered commands
	 * @property {external:Collection<string, external:Collection<string, number>>} commandCooldowns A collection of command cooldowns
	 * @property {Utils} utils An instance of the Utils class
	 * @property {Logger} logger An instance of the Logger class
	 */
	constructor(options) {
		if(typeof options.ownerID === 'string') options.ownerID = [options.ownerID];

		this.token = options.token;
		this.prefix = options.prefix;
		this.ownerIDs = options.ownerID;
		this.allowDM = options.allowDM;
		this.allowRecursion = options.allowRecursion;
		this.allowBotUsage = options.allowBotUsage;
		this.selfbot = options.selfbot;

		this.api = api;
		this.bot = new api.Client(options.djsOptions);
		this.commands = new api.Collection();
		this.commandCooldowns = new api.Collection();

		this.utils = new Utils(this);
		this.logger = new Logger({
			logLevel: options.logLevel || 'INFO',
			shardID: this.bot.shard ? this.bot.shard.id : 0
		});
	}

	/**
	 * Registers all commands and logs the bot in
	 * @returns {Promise<number>} The time taken to log in
	 */
	run() {
		return new Promise((resolve, reject) => {
			const initializationTimestamp = Date.now();
			this.logger.log('Starting bot..', 'VERBOSE');

			this.registerCommandHandler();

			this.bot.login(this.token).then(() => {
				const timeTaken = Date.now() - initializationTimestamp;

				this.logger.log(`Logged in as ${this.bot.user.tag.cyan} (Login took ${timeTaken > 2000 ? `${timeTaken}ms`.yellow : `${timeTaken}ms`.green})`);

				resolve(timeTaken);
			}).catch(reject);
		});
	}

	/**
	 * Registers a command
	 * @param {Command} command The command to register
	 * @returns {void}
	 */
	registerCommand(command) {
		if(command.constructor.name !== 'Command') throw new TypeError('Commands must be of type Command');
		if(command.name.includes(' ')) throw new Error('Command names cannot contain spaces');
		if(this.commands.has(command.name)) throw new Error(`Tried to register command "${command.name}" multiple times`);

		this.commands.set(command.name, command);

		this.logger.log(`Registered command ${command.name.cyan}`, 'VERBOSE');

		for(const alias of command.aliases) {
			if(alias.includes(' ')) throw new Error('Command names cannot contain spaces');
			if(this.commands.has(alias.toLowerCase())) throw new Error(`Tried to register command "${alias}" multiple times`);

			this.commands.set(alias.toLowerCase(), {
				name: command.name,
				alias: true
			});

			this.logger.log(`Registered command alias ${alias.cyan} for command ${command.name.cyan}`, 'VERBOSE');
		}
	}

	/**
	 * Recursively registers all commands in the given directory and all subdirectories
	 * @param {string} commandDirectory The directory to scan
	 * @returns {void}
	 */
	registerCommandsIn(commandDirectory) {

		for(const commandName of fs.readdirSync(commandDirectory)) {

			if(fs.statSync(path.resolve(commandDirectory, commandName)).isDirectory()) {

				this.registerCommandsIn(path.resolve(commandDirectory, commandName));

			} else {

				if(!commandName.match(/.+\.js/)) return;

				const file = path.resolve(commandDirectory, commandName);
				const command = require(file);

				try {
					this.registerCommand(command);
				} catch(error) {
					this.logger.log(`Failed to register command file ${file.yellow}: ${error.toString().red}`, 'ERROR');
				}

			}

		}

	}

	/**
	 * Recursively registers all events in the given directory and all subdirectories
	 * @param {string} eventDirectory The directory to scan
	 * @returns {void}
	 */
	registerEventsIn(eventDirectory) {

		for(const eventName of fs.readdirSync(eventDirectory)) {

			if(fs.statSync(path.resolve(eventDirectory, eventName)).isDirectory()) {

				this.registerEventsIn(path.resolve(eventDirectory, eventName));

			} else {

				if(!eventName.match(/.+\.js/)) return;

				const file = path.resolve(eventDirectory, eventName);
				const event = require(file);

				try {
					this.registerEvent(event);
				} catch(error) {
					this.logger.log(`Failed to register event file ${file.yellow}: ${error.toString().red}`, 'ERROR');
				}

			}

		}

	}

	/**
	 * Unregisters a command and all of its aliases
	 * @param {string} commandName The command to unregister
	 * @returns {boolean} Whether the command has been successfully unregistered
	 */
	unregisterCommand(commandName) {
		if(!this.commands.has(commandName)) return false;
		const command = this.commands.get(commandName);

		if(command.aliases) {

			for(const alias of command.aliases) {
				this.commands.delete(alias);
				this.logger.log(`Unregistered command alias ${alias.cyan} for command ${commandName.cyan}`, 'VERBOSE');
			}

		}

		this.commands.delete(command.name);
		this.logger.log(`Unregistered command ${command.alias ? `alias ${commandName.cyan} for command ${command.name.cyan}` : commandName.cyan}`, 'VERBOSE');

		return true;
	}

	/**
	 * Registers an event
	 * @param {Event} event The event to register
	 * @returns {void}
	 */
	registerEvent(event) {
		if(event.constructor.name !== 'Event') throw new TypeError('Event must be of type Event');

		this.bot.on(event.name, event.run.bind(this));
		this.logger.log(`Registered event ${event.name.cyan}`, 'VERBOSE');
	}

	/**
	 * Registers a message event handler that automatically executes commands
	 * @private
	 * @returns {void}
	 */
	registerCommandHandler() {
		this.bot.on('message', message => {
			if(!message.content.startsWith(this.prefix)) return;

			const messageArguments = message.content.replace(this.prefix, '').split(' ');
			const commandName = messageArguments.shift();

			if(!this.commands.has(commandName)) return;
			if(!this.allowBotUsage && message.author.bot) return;
			if(!this.allowRecursion && !this.selfbot && message.author.id === this.bot.user.id) return;
			if(this.selfbot && !this.ownerIDs.includes(message.author.id)) return;

			if(!this.allowDM && !this.selfbot && message.channel.type === 'dm') return void(message.channel.send(':x: Commands cannot be executed via DM'));

			let command = this.commands.get(commandName);

			if(command.alias) command = this.commands.get(command.name);
			if(command.ownerOnly && !this.ownerIDs.includes(message.author.id)) return void(message.channel.send(':x: Sorry, but you don\'t have permission to use this command!'));

			if(!this.selfbot) {
				if(this.commandCooldowns.has(message.author.id)) {

					const cooldowns = this.commandCooldowns.get(message.author.id);

					if(cooldowns.has(command.name)) {
						const cooldownExpiresAt = cooldowns.get(command.name);

						const timeRemaining = Math.ceil((cooldownExpiresAt - Date.now()) / 1000);

						if(Date.now() < cooldownExpiresAt) return void(message.channel.send(`:x: Cooldown! Please wait another ${timeRemaining} ${timeRemaining === 1 ? 'second' : 'seconds'} before using this command.`));
					}

					cooldowns.set(command.name, Date.now() + command.cooldown);

				} else {
					const cooldowns = new api.Collection();

					cooldowns.set(command.name, Date.now() + command.cooldown);

					this.commandCooldowns.set(message.author.id, cooldowns);
				}
			}

			const unsplitArguments = messageArguments.join(' ');
			const splitArguments = this.utils.splitArguments(unsplitArguments);
			const mappedArgs = this.utils.mapArguments(splitArguments, command.args);

			if(!mappedArgs.success) return void(message.channel.send(`\`\`\`${this.prefix}${command.name} ${command.usage}\`\`\`\n:x: ${mappedArgs.error}`));

			this.logger.log(`${this.ownerIDs.includes(message.author.id) ? message.author.tag.red : message.author.tag.green} used command ${command.name.cyan}`);
			this.logger.log(`Previous command executed by user ID ${message.author.id.yellow} in channel ID ${message.channel.id.yellow} of server ID ${message.guild ? message.guild.id.yellow : '0 (DM)'}`, 'VERBOSE');

			command.run.call(this, message, mappedArgs.args, unsplitArguments);
		});

		this.logger.log('Registered command handler', 'VERBOSE');
	}

}

module.exports = Client;
