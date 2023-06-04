const Discord = require("discord.js");
const config = require("./config")

const partials = [
    Discord.Partials.Message,
    Discord.Partials.Channel,
    Discord.Partials.Reaction,
    Discord.Partials.GuildMember,
    Discord.Partials.GuildScheduledEvent,
    Discord.Partials.ThreadMember,
    Discord.Partials.User
];

const intents = [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.GuildModeration,
    Discord.GatewayIntentBits.GuildEmojisAndStickers,
    Discord.GatewayIntentBits.GuildIntegrations,
    Discord.GatewayIntentBits.GuildWebhooks,
    Discord.GatewayIntentBits.GuildInvites,
    Discord.GatewayIntentBits.GuildVoiceStates,
    Discord.GatewayIntentBits.GuildPresences,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.GuildMessageReactions,
    Discord.GatewayIntentBits.GuildMessageTyping,
    Discord.GatewayIntentBits.DirectMessages,
    Discord.GatewayIntentBits.DirectMessageReactions,
    Discord.GatewayIntentBits.DirectMessageTyping,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.GuildScheduledEvents
];

const client = new Discord.Client({
    partials: partials,
    intents: intents
});

client.commands = new Discord.Collection();
client.color = config.color;


const eventHandler = require('./Structure/EventHandler');
const commandHandler = require('./Structure/CommandHandler');
const slashHandler = require('./Structure/SlashHandler');

eventHandler(client);
commandHandler(client);
slashHandler(client);

client.login(config.token);

process.on("unhandledRejection", err => {
  if (err.message) return;
  console.log("[ANTI-CRASH] Uncaught Promise Error: ", err);
});

process.on("rejectionHandled", err => {
  console.log("[ANTI-CRASH] RejectionHandled: ", err);
  return;
});

process.on("uncaughtException", err => {
  console.log("[ANTI-CRASH] UncaughtException: ", err);
  return;
});

process.on("uncaughtExceptionMonitor", err => {
  console.log("[ANTI-CRASH] UncaughtExceptionMonitor: ", err);
  return;
});