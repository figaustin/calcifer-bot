const { SlashCommandBuilder } = require('discord.js');


module.exports =  {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pause the current song'),
    async execute(interaction, client) {
        
        client.distube.pause(interaction);
        
        const newMessage = `🔥 Pausing the current song...`
        await interaction.reply({
            content: newMessage
        })
    }
}