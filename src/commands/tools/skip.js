const { SlashCommandBuilder } = require('discord.js');
const { execute } = require('../../events/client/ready');
const { joinVoiceChannel } = require('@discordjs/voice');


module.exports =  {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skip to the next song in the queue'),
    async execute(interaction, client) {

        const skip = client.distube.skip(interaction);
        const newMessage = `🔥 Skipped to the next song in the queue!`
        await interaction.reply({
            content: newMessage
        })
        
    }
}