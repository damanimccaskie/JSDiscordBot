/**
 * The event class allows you to create event listeners, that automatically fires when a [discord.js event]{@link https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=channelCreate} is received
 *
 * @example
 * const event = new memecord.Event({
 *   name: 'guildCreate',
 *   run: function(guild) {
 *     guild.defaultChannel.send('Thanks for inviting me to your server!');
 *   }
 * });
 *
 * <Client>.registerEvent(event);
 */
class Event {

	/**
	 * Creates a new event handler
	 * @param {object} options The event options
	 * @param {string} options.name The event name
	 * @param {EventFunction} options.run The function to run
	 */
	constructor({
		name,
		run
	} = {}) {
		if(typeof name !== 'string') throw new TypeError(`Event names must be passed as a string, not ${typeof name}`);
		if(typeof run !== 'function') throw new TypeError(`Event functions must be passed as a function, not ${typeof run}`);

		this.name = name;
		this.run = run;
	}

}

module.exports = Event;
