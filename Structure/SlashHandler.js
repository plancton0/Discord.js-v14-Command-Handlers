const Discord = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const config = require('../config');

module.exports = async (client) => {
  const commands = [];

  client.slashCommands.forEach((command) => {
    const slashCommand = new Discord.SlashCommandBuilder()
      .setName(command.name)
      .setDescription(command.description)
      .setDefaultMemberPermissions(command.permission === 0 ? null : command.permission);

    if (command.options?.length >= 1) {
      for (let i = 0; i < command.options.length; i++) {
        if (command.options[i].type === 'string') {
          const option = new Discord.SlashCommandStringOption()
            .setName(command.options[i].name)
            .setDescription(command.options[i].description)
            .setRequired(command.options[i].required);

          if (command.options[i].choices) {
            const choices = command.options[i].choices.map((choice) => ({
              name: choice.name,
              value: choice.value,
            }));

            for (const choice of choices) {
              option.addChoices(choice);
            }
          }
          slashCommand.addStringOption(option);
        } else if (command.options[i].type === 'user') {
          const option = new Discord.SlashCommandUserOption()
            .setName(command.options[i].name)
            .setDescription(command.options[i].description)
            .setRequired(command.options[i].required);

          slashCommand.addUserOption(option);
        } else if (command.options[i].type === 'channel') {
          const option = new Discord.SlashCommandChannelOption()
            .setName(command.options[i].name)
            .setDescription(command.options[i].description)
            .setRequired(command.options[i].required);

          slashCommand.addChannelOption(option);
        } else if (command.options[i].type === 'role') {
          const option = new Discord.SlashCommandRoleOption()
            .setName(command.options[i].name)
            .setDescription(command.options[i].description)
            .setRequired(command.options[i].required);

          slashCommand.addRoleOption(option);
        } else if (command.options[i].type === 'number') {
          const option = new Discord.SlashCommandNumberOption()
            .setName(command.options[i].name)
            .setDescription(command.options[i].description)
            .setRequired(command.options[i].required);

          slashCommand.addNumberOption(option);
        } else if (command.options[i].type === 'integer') {
          const option = new Discord.SlashCommandNumberOption()
            .setName(command.options[i].name)
            .setDescription(command.options[i].description)
            .setRequired(command.options[i].required);

          slashCommand.addIntegerOption(option);
        }
      }
    }

    commands.push(slashCommand.toJSON());
  });
  
  const rest = new REST({ version: '10' }).setToken(config.token);

  await rest.put(Routes.applicationCommands(config.clientId), {
    body: commands,
  });
};
