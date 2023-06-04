const Discord = require("discord.js");

module.exports = {
  name: 'choices',
  description: 'Exemple très simple d\'une commande a choices.',
  cooldown: 0,
  owners: false, 
  permission: 0,
  options: [
    {
      type: "string",
      name: "choices",
      description: "choices",
      required: true,
      choices: [
        { name: 'test01', value: '01' },
        { name: 'test02', value: '02' },
        { name: 'test03', value: '03' },
        { name: 'test04', value: '04' },
      ],
    }
  ],
  execute(client, interaction) {
    const choices = interaction.options.getString('choices');

    if (choices === '01') {
      interaction.reply({ ephemeral: true, content: 'test01' });
    } else if (choices === '02') {
      interaction.reply({ ephemeral: true, content: 'test02' });
    } else if (choices === '03') {
      interaction.reply({ ephemeral: true, content: 'test03' });
    } else if (choices === '04') {
      interaction.reply({ ephemeral: true, content: 'test04' });
    } else {
      interaction.reply({ ephemeral: true, content: 'Unknown language' });
    }
  }
};