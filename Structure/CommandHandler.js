const fs = require("fs");

module.exports = async (client) => {
  const slashCommandFiles = fs.readdirSync("./Commands/Slash").filter((file) => file.endsWith(".js"));
  const prefixCommandFiles = fs.readdirSync("./Commands/Prefix").filter((file) => file.endsWith(".js"));

  console.log(`----------------------------------------------------`);
  
  for (const file of slashCommandFiles) {
    const slashCommand = require(`../Commands/Slash/${file}`);
    
    if (!slashCommand.name || typeof slashCommand.name !== "string") {
      console.error(`\x1b[31mLa commande ${file.slice(0, file.length - 3)} n'est pas identifiée par un nom spécifique.\x1b[0m`);
      continue;
    }
    
    if (!slashCommand.description || typeof slashCommand.description !== "string") {
      console.log("\x1b[31m",`La commande ${file.slice(0, file.length - 3)} n'a pas de description valide.`, "\x1b[0m");
    }
    
    client.slashCommands.set(slashCommand.name, slashCommand);
    console.log(`\x1b[37m<\x1b[0m\x1b[34mCommandSlash\x1b[0m\x1b[37m>\x1b[0m Commande ${file.replace(".js", "")} enregistrée avec succès.`);
  }
  
  console.log(`----------------------------------------------------`);

  for (const file of prefixCommandFiles) {
    const prefixCommand = require(`../Commands/Prefix/${file}`);
    
    if (!prefixCommand.name || typeof prefixCommand.name !== "string") {
      console.error(`\x1b[31mLa commande ${file.slice(0, file.length - 3)} n'est pas identifiée par un nom spécifique.\x1b[0m`);
      continue;
    }
    
    if (!prefixCommand.description || typeof prefixCommand.description !== "string") {
      console.log("\x1b[31m",`La commande ${file.slice(0, file.length - 3)} n'a pas de description valide.`, "\x1b[0m");
    }
    
    client.prefixCommands.set(prefixCommand.name, prefixCommand);
    console.log(`\x1b[37m<\x1b[0m\x1b[33mCommandPrefix\x1b[0m\x1b[37m>\x1b[0m Commande ${file.replace(".js", "")} enregistrée avec succès.`);
  }
};
