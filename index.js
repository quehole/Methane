// NOTE: This code originally belonged for the bot "XEUS" with was owned by me quehole.

const { Client } = require('discord.js');
const client = new Client();

require('./utils/defines')(client);
require('./utils/structure/registery')(client);
require('./utils/handlers/commands')(client);
require('./utils/handlers/events')(client);
const token = require('./config/bot.json');
const prefix = require('./config/bot.json');

client.on('ready', () => {
  console.log('Logging in...');
  client.on("debug", (e) => console.log(e));

  client.user.setActivity('{prefix}help', { type: "LISTENING" })
})

client.on('message', async (message) => {
  message.channel.messages.fetch()
  require('./utils/handlers/handler')(client, message)
});

client.on('messageUpdate', (o, message) => {
  require('./utils/handlers/editHandles')(client, message);
})

client.on("message", async message => {
  if (message.content.startsWith("hi")) {
    message.channel.send(`hello!`)
  }
});

client.login(token)
