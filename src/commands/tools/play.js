const { SlashCommandBuilder } = require('discord.js');
const { execute } = require('../../events/client/ready');
const { joinVoiceChannel } = require('@discordjs/voice');


module.exports =  {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a song!')
        .addStringOption(option => 
            option.setName('input')
            .setDescription('Song name or youtube link')
            .setRequired(true)),
    async execute(interaction, client) {

        const song = interaction.options.getString('input') ?? 'No input provided';

        const message = await interaction.deferReply( {
            fetchReply: true
        });

        client.distube.play(interaction.member.voice.channel, song, {
            interaction,
            textChannel: interaction.channel,
            member: interaction.member,
        })
        .catch(err => {
            interaction.channel.send("ERROR" + err.message);
        })
        const newMessage = "NOW PLAYING: " + song
        await interaction.editReply({
            content: newMessage
        })
    }
}
