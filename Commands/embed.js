const Discord = require("discord.js");

module.exports = {
  name: 'embed',
  description: 'Exemple très simple d\'embed.',
  cooldown: 0,
  owners: false, 
  permission: Discord.PermissionFlagsBits.ManageGuild,

  execute(client, interaction) {
    const Embed = new Discord.EmbedBuilder()
    .setTitle(`Embed Exemple`)
    .setDescription(`Ceci est un exemple d'embed !`)
    .setColor(client.color)
    .setFooter({text: client.user.username, iconURL: client.user.displayAvatarURL()})
    .addFields(
      { name: 'Text01', value: 'Value01', inline: true },
      { name: 'Text03', value: 'Value03', inline: true },
    )
    .setThumbnail(client.user.displayAvatarURL())
    .setTimestamp();

    interaction.reply({ ephemeral: true, embeds: [Embed] });
  }
};