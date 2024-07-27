const { Client, Intents, CommandInteraction, ReactionUserManager } = require('discord.js'); 
const INTENTS = new Intents(32767); 

const client = new Client({
  intents: INTENTS
});

const Discord = require('discord.js');
const ms = require('ms')
module.exports.config = {
    name: "gstart",
    aliases: [],
    cooldown: 5,
    group: "misc",
    usage: '$gstart {duration} {winners} {channel} {prize}',
    description: "Starts a giveaway"
};

module.exports.run = async(client, message, args) => {

client.on('messageCreate', async message => {

    const prefix = "$"
    let args = message.content.substring(prefix.length).split(" ")

    if ((message.content.startsWith('$gstart'))) { 
        let duration = args[1];
        let winnerCount = args[2];

        if (!duration) 
            return message.channel.send('Please provide a duration for the giveaway!\nThe abbreviations for units of time are: `d (days), h (hours), m (minutes), s (seconds)`');
        if (
            !args[1].endsWith("d") &&
            !args[1].endsWith("h") &&
            !args[1].endsWith("m") &&
            !args[1].endsWith("s") 
        )
            return message.channel.send('Please provide a duration for the giveaway!\nThe abbreviations for units of time are: `d (days), h (hours), m (minutes), s (seconds)`');

        if (!winnerCount) return message.channel.send('Please provide the number of winners for the giveaway! E.g. `1w`')

        if (isNaN(args[2].toString().slice(0, -1)) || !args[2].endsWith("w"))
            return message.channel.send('Please provide the number of winners for the giveaway! E.g. `3w`');
                if ((args[2].toString().slice(0, -1)) <= 0)   
                    return message.channel.send('The number of winners cannot be less than 1!');

            let giveawayChannel = message.mentions.channels.first();
            if (!giveawayChannel || !args[3]) return message.channel.send("Please provide a valid channel to start the giveaway!")

            let prize = args.slice(4).join(" ");
            if (!prize) return message.channel.send('Please provide a prize to start the giveaway!');

            let startGiveawayEmbed = new Discord.MessageEmbed()
                .setTitle("🎉 GIVEAWAY 🎉")
                .setDescription(`${prize}\n\nReact with 🎉 to participate in the giveaway!\nWinners: **${winnerCount.toString().slice(0, -1)}**\nTime Remaining: **${duration}**\nHosted By: **${message.author}**`)
                .setColor('#FFFFFF')
                .setTimestamp(Date.now() + ms(args[1])) 
                .setFooter("Giveaway ends"); 

            let embedGiveawayHandle = await giveawayChannel.send({embeds: [startGiveawayEmbed]})
            embedGiveawayHandle.react("🎉").catch(console.error); 

            setTimeout(() => {
                if (embedGiveawayHandle.reactions.cache.get("🎉").count <= 1) {
                    return giveawayChannel.send("Nobody joined the giveaway :(")
                }
                if (embedGiveawayHandle.reactions.cache.get("🎉").count <= winnerCount.toString().slice(0, -1)) { 
                    return giveawayChannel.send("There's not enough people in the giveaway to satisfy the number of winners!")
                }

                let winner  = embedGiveawayHandle.reactions.cache.get("🎉").users.cache.filter((users) => !users.bot).random(winnerCount.toString().slice(0, -1)); 

                const endedEmbedGiveaway = new Discord.MessageEmbed()
                .setTitle("🎉GIVEAWAY 🎉")
                .setDescription(`${prize}\n\nWinner(s): ${winner}\nHosted By: **${message.author}**\nWinners: **${winnerCount.toString().slice(0, -1)}**\nParticipants: **${embedGiveawayHandle.reactions.cache.get("🎉").count - 1}**\nDuration: **${duration}**`)
                .setColor('#FFFFFF')
                .setTimestamp(Date.now() + ms(args[1])) 
                .setFooter("Giveaway ended"); 

                embedGiveawayHandle.edit({embeds:[endedEmbedGiveaway]}); 

                const congratsEmbedGiveaway = new Discord.MessageEmbed()
                .setDescription(`🥳 Congratulations ${winner}! You just won **${prize}**!`)
                .setColor('#FFFFFF')

                giveawayChannel.send({embeds: [congratsEmbedGiveaway]}).catch(console.error); 
            }, ms(args[1]));

        } 
    });
};

