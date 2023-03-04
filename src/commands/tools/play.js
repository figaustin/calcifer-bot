const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');


module.exports =  {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a song!')
        .addStringOption(option => 
            option.setName('input')
            .setDescription('Song name or youtube link')
            .setRequired(true)),
    async execute(interaction, client) {

        const songChoice = interaction.options.getString('input');

        const search = await client.distube.search(songChoice, {
            limit : 5
        })

        const message = {
            text: ""
        }

        const song = client.distube.play(interaction.member.voice.channel, search[0], {
            interaction,
            textChannel: interaction.channel,
            member: interaction.member,
        })
        .catch(err => {
            message.text = "🔥 ERROR You must be in a voice channel!"
        })

        if(interaction.member.voice.channel) {
            message.text = `🔥 Added **${search[0].name} (${search[0].formattedDuration})** to the queue!`
        } else {
            message.text = "🔥 ERROR You must be in a voice channel!"
        }

        const sentMessage = await interaction.reply({
            content: message.text,
        })
        
       
    }
}

