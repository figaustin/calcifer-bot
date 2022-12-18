const { SlashCommandBuilder } = require('discord.js');


module.exports =  {
    data: new SlashCommandBuilder()
        .setName('resume')
        .setDescription('Resume the current song'),
    async execute(interaction, client) {
        
        client.distube.resume(interaction);
        
        const newMessage = `🔥 Resuming the current song...`
        await interaction.reply({
            content: newMessage
        })
    }
}