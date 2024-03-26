// This code originally belonged for the bot "XEUS"
const { Client } = require('discord.js');
const client = new Client();
const { token } = require('./config/bot.json')
const { keep_alive } = require("./keep_alive");

require('./utils/defines')(client);
require('./utils/structure/registery')(client);
require('./utils/handlers/commands')(client);
require('./utils/handlers/events')(client);

client.on('ready', () => {
  console.log('Logging in...');
client.on("debug", ( e ) => console.log(e));
    
  client.user.setActivity('$help', { type: "LISTENING"})
})

client.on('message', async(message) => {
    message.channel.messages.fetch()
require('./utils/handlers/handler')(client, message)
});

client.on('messageUpdate', (o, message) => {
require('./utils/handlers/editHandles')(client, message);
})



client.login("MTIxOTE1ODQyMjA1NDc2ODY1MA.GrDedq.a4i_l5pZFVYGXQo8VBTuW8WPjYT1QfOy-iEMwQ")