const { SlashCommandBuilder } = require('discord.js');
const { execute } = require('../../events/client/ready');
const { joinVoiceChannel } = require('@discordjs/voice');


module.exports =  {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skip to the next song in the queue'),
    async execute(interaction, client) {


        const message = {
            text : `🔥 Skipped to the next song in the queue!`
        };
        const skip = client.distube.skip(interaction, {}).catch(error => {
            message.text = "🔥 No song up next! Leaving the voice channel!"
            client.distube.voices.get(interaction).leave()
        })
       
        await interaction.reply({
            content: message.text
        })
        
    }
}