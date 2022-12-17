require('dotenv').config();

const { token } = process.env;
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const { fileURLToPath } = require('url');
const  { DisTube } = require("distube");
const { YtDlpPlugin } = require('@distube/yt-dlp')

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.MessageContent] });
client.commands = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync('./src/functions');
for (const folder of functionFolders) {
    const functionFiles = fs.readdirSync(`./src/functions/${folder}`).filter(file => file.endsWith('.js'));

    for (const file of functionFiles)
        require(`./functions/${folder}/${file}`)(client);

}


client.distube = new DisTube(client, {
    leaveOnStop: false,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    plugins: [
        new YtDlpPlugin()
    ]
});

client.on('messageCreate', message => {
    if(message.content.includes("Calcifer") || message.content.includes("calcifer")) {
        message.channel.send(`🔥 Hello, <@${message.author.id}>`)
    }   
})


// const status = queue =>
//   `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.names.join(', ') || 'Off'}\` | Loop: \`${
//     queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
//   }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``
// client.distube
//   .on('playSong', (queue, song) =>
//     queue.textChannel.send(
//       `${client.emotes.play} | Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${
//         song.user
//       }\n${status(queue)}`
//     )
//   )
//   .on('addSong', (queue, song) =>
//     queue.textChannel.send(
//       `${client.emotes.success} | Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
//     )
//   )
//   .on('addList', (queue, playlist) =>
//     queue.textChannel.send(
//       `${client.emotes.success} | Added \`${playlist.name}\` playlist (${
//         playlist.songs.length
//       } songs) to queue\n${status(queue)}`
//     )
//   )
//   .on('error', (channel, e) => {
//     if (channel) channel.send(`${client.emotes.error} | An error encountered: ${e.toString().slice(0, 1974)}`)
//     else console.error(e)
//   })
//   .on('empty', channel => channel.send('Voice channel is empty! Leaving the channel...'))
//   .on('searchNoResult', (message, query) =>
//     message.channel.send(`${client.emotes.error} | No result found for \`${query}\`!`)
//   )
//   .on('finish', queue => queue.textChannel.send('Finished!'))

client.handleEvents();
client.handleCommands();
client.login(token);