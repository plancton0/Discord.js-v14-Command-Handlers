const fs = require("fs");

module.exports = async (client) => {
  const commandFiles = fs.readdirSync("./Commands").filter((file) => file.endsWith(".js"));
  console.log(`----------------------------------------------------`);

  for (const file of commandFiles) {
    const command = require(`../Commands/${file}`);

    if (!command.name || typeof command.name !== "string") {
      console.error(`\x1b[31mLa commande ${file.slice(0, file.length - 3)} n'est pas identifiée par un nom spécifique.\x1b[0m`);
      continue;
    }

    if (!command.description || typeof command.description !== "string") {
      console.log("\x1b[31m",`La commande ${file.slice(0, file.length - 3)} n'a pas de description valide.`, "\x1b[0m");
    }

    client.commands.set(command.name, command);
    console.log(`\x1b[37m<\x1b[0m\x1b[34mCommands\x1b[0m\x1b[37m>\x1b[0m Commande ${file} enregistrée avec succès.`);
  }
};

