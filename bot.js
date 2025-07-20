// Load environment variables
require("dotenv").config();

// Import Discord.js
const { Client, GatewayIntentBits } = require("discord.js");

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// When the client is ready, run this code
client.once("ready", () => {
  console.log(`✅ Bot is online! Logged in as ${client.user.tag}`);
});

// Listen for voice state changes (when someone joins/leaves voice channels)
client.on("voiceStateUpdate", (oldState, newState) => {
  const user = newState.member.user;

  // User joined a voice channel
  if (!oldState.channel && newState.channel) {
    console.log(
      `🎤 ${user.username} joined voice channel: ${newState.channel.name}`,
    );
  }

  // User left a voice channel
  if (oldState.channel && !newState.channel) {
    console.log(
      `👋 ${user.username} left voice channel: ${oldState.channel.name}`,
    );
  }

  // User moved between channels
  if (
    oldState.channel &&
    newState.channel &&
    oldState.channel.id !== newState.channel.id
  ) {
    console.log(
      `🔄 ${user.username} moved from ${oldState.channel.name} to ${newState.channel.name}`,
    );
  }
});

// Login to Discord with your client's token
client.login(process.env.DISCORD_BOT_TOKEN);
