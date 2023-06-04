const Discord = require("discord.js");
const slashHandler = require('../Structure/SlashHandler');

module.exports = (client) => {

	const activities = [
		{ name: `${client.guilds.cache.size} Serveurs`, type: Discord.ActivityType.Listening },
		{ name: `${client.channels.cache.size} Channels`, type: Discord.ActivityType.Playing },
		{ name: `${client.users.cache.size} Utilisateurs`, type: Discord.ActivityType.Watching },
		{ name: `Discord.js V14`, type: Discord.ActivityType.Competing }
	];

	const status = [
		'online',
		'dnd',
		'idle',
	];
  
	let i = 0;
	setInterval(() => {
		if(i >= activities.length) i = 0;
		client.user.setActivity(activities[i]);
		i++;
	}, 5000);

	let s = 0;
	setInterval(() => {
		if(s >= activities.length) s = 0;
		client.user.setStatus(status[s]);
		s++;
	}, 2500);

  slashHandler(client)
  console.log(`----------------------------------------------------`);
  console.log('\x1b[37m<\x1b[0m\x1b[32mSystem\x1b[0m\x1b[37m>\x1b[0m Connexion réussie avec \x1b[37m%s\x1b[0m', '@' + client.user.tag.replace(/\s/g, '') + '.');
  console.log(`----------------------------------------------------`);
  console.log(`\x1b[37m<\x1b[0m\x1b[31mSupport\x1b[0m\x1b[37m>\x1b[0m discord.gg/DFmwDxNo.`);
};
