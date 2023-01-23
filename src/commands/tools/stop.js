const { SlashCommandBuilder } = require('discord.js');


module.exports =  {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stop the queue and disconnect me'),
    async execute(interaction, client) {
        client.distube.getQueue(interaction).stop();
        client.distube.voices.get(interaction).leave();
        
        const newMessage = `🔥 Stopped the queue and disconnected!`
        await interaction.reply({
            content: newMessage
        })
    }
}