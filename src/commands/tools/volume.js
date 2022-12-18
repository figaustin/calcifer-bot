const { SlashCommandBuilder } = require('discord.js');
const { execute } = require('../../events/client/ready');
const { joinVoiceChannel } = require('@discordjs/voice');


module.exports =  {
    data: new SlashCommandBuilder()
        .setName('volume')
        .setDescription('Change bot volume')
        .addIntegerOption(option => 
            option.setName('amount')
            .setDescription('volume amount')
            .setRequired(true)),
    async execute(interaction, client) {

        const message = await interaction.deferReply( {
            fetchReply: true
        });

        const queue = client.distube.getQueue(interaction)
        if(!queue) {
            return interaction.member.channel.send("There is nothing in the queue right now!")
        }

        const volume = interaction.options.getInteger('amount');
        
        if(isNaN(volume)) {
            return interaction.channel.send("Please enter a valid number!")
        }
        queue.setVolume(volume);
        
        const newMessage = `🔥 Volume set to **${volume}%**!`
        await interaction.editReply({
            content: newMessage
        })
    }
}