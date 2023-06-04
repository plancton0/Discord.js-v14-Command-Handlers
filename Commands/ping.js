const Discord = require("discord.js");

module.exports = {
  name: 'ping',
  description: 'Obtenez le temps mis par le bot pour répondre à une commande.',
  cooldown: 2,
  owners: false,
  permission: 0,

  execute(client, interaction) {
    interaction.reply({ ephemeral: true, content: `⏳ Recherche du ping...` })
      .then(reply => {
        setTimeout(() => {
          reply.edit({ ephemeral: true, content: `**Ping:** \`${client.ws.ping}ms\``});
        }, 1500);
      })
      .catch((e) => console.log(e));
    return;
  }
}