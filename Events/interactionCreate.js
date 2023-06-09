const Discord = require("discord.js");
require('dotenv').config();
const owners = process.env.owners

const cooldowns = new Map();

module.exports = async (client, interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.slashCommands.get(interaction.commandName);
  if (!command) return;

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 0) * 1000;

  if (timestamps.has(interaction.user.id)) {
    const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = Math.ceil((expirationTime - now) / 1000).toString().replace(/\.0$/, '');
      return interaction.reply({
        content: `Veuillez attendre ${timeLeft} seconde(s) avant de réutiliser la commande \`${command.name}\`.`,
        ephemeral: true,
      });
    }
  }

  timestamps.set(interaction.user.id, now);
  setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

  try {
    if (command.owners && !owners.includes(interaction.user.id)) {
      return interaction.reply({ ephemeral: true, content: "Seul le développeur du bot est autorisé à utiliser cette commande." });
    }
    command.execute(client, interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "Une erreur est survenue lors de l'exécution de la commande.",
      ephemeral: true,
    });
  }
};
