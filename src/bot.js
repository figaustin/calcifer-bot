require('dotenv').config();

const { token } = process.env;
const { Client, Collection, GatewayIntentBits} = require('discord.js');
const fs = require('fs');
const  { DisTube } = require("distube");
const { YtDlpPlugin } = require('@distube/yt-dlp')

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.MessageContent] });
client.commands = new Collection();
client.commandArray = [];
client.buttons = new Collection();

const functionFolders = fs.readdirSync('./src/functions');
for (const folder of functionFolders) {
    const functionFiles = fs.readdirSync(`./src/functions/${folder}`).filter(file => file.endsWith('.js'));

    for (const file of functionFiles)
        require(`./functions/${folder}/${file}`)(client);

}

const currentEmbed = {
    messageId: '',
    embed: '',
    maxStickMessageCount: 2,
    channel: "887541243859570718",
    count: 0,
    currentSong: ''
}

module.exports =  { currentEmbed };

client.distube = new DisTube(client, {
    leaveOnStop: false,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    plugins: [
        new YtDlpPlugin()
    ]
});


client.handleEvents();
client.handleCommands();
client.handleComponents();
client.login(token);


