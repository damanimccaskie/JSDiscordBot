# memecord

[![Join the support discord](https://discordapp.com/api/guilds/267646428682256395/embed.png)](https://discord.gg/aRt6zMU) [![NPM Version](https://img.shields.io/npm/v/memecord.svg?maxAge=3600)](https://www.npmjs.com/package/memecord) [![Downloads](https://img.shields.io/npm/dt/memecord.svg?maxAge=3600)](https://www.npmjs.com/package/memecord) [![Dependencies](https://david-dm.org/xmatmen/memecord/status.svg)](https://david-dm.org/xmatmen/memecord) [![Greenkeeper badge](https://badges.greenkeeper.io/xmatmen/memecord.svg)](https://greenkeeper.io/) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/bb184fd10ab74a18ad5f2236ea6da741)](https://www.codacy.com/app/xmatmen/memecord?utm_source=github.com&utm_medium=referral&utm_content=xmatmen/memecord&utm_campaign=badger)

[![NPM](https://nodei.co/npm/memecord.png?downloads=true&stars=true)](https://www.npmjs.com/package/memecord)

### About
---
memecord is a [Discord](https://discordapp.com/) bot framework, based on [discord.js](https://github.com/hydrabolt/discord.js), that allows you to easily create Discord bots. Take a look at [the Documentation](https://xmatmen.github.io/memecord/) for further info.  

### Installation
---
**NodeJS 6.0.0 or newer is required**  
Ignore any warnings about unmet peer dependencies, as they're all optional.  

Without voice support: `npm install memecord --save`  
With voice support: `npm install memecord node-opus --save`  

### Example
---
```js
const memecord = require('memecord');

const client = new memecord.Client({
    token: 'your token here',
    ownerID: '277411860125581312',
    prefix: 'meme!',
    logLevel: 'VERBOSE'
});

const someCommand = new memecord.Command({
  names: ['meme', 'memes'],
  description: 'Sends a random meme',
  cooldown: 1000,
  run: function(message) {
    message.channel.send('Error 404: Meme not found');
  }
});

client.registerCommand(someCommand);

client.run();
```

### Links
---
* [Documentation](https://xmatmen.github.io/memecord/)
* [GitHub Repository](https://github.com/xmatmen/memecord)
* [Discord Server](https://discord.gg/aRt6zMU)
* [NPM](https://www.npmjs.com/package/memecord)
* [discord.js Documentation](https://discord.js.org/#/docs/main/stable/general/welcome)

### Help
---
If you don't understand something in the documentation, how to use the framework, you are experiencing problems, or you just need friends (i feel you), don't hesistate to join our [Discord Server](https://discord.gg/aRt6zMU)
