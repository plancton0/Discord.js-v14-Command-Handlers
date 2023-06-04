const fs = require('fs');

module.exports = (client) => {
  const eventFiles = fs.readdirSync('./Events').filter(file => file.endsWith('.js'));

  for (const file of eventFiles) {
    const event = require(`../Events/${file}`);
    const eventName = file.split('.')[0];
    client.on(eventName, event.bind(null, client));
  }
};
