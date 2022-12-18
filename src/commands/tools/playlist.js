const { SlashCommandBuilder } = require('discord.js');
const { execute } = require('../../events/client/ready');
const { joinVoiceChannel } = require('@discordjs/voice');
const { SearchResultType } = require('distube');


module.exports =  {
    data: new SlashCommandBuilder()
        .setName('playlist')
        .setDescription('Play a playlist!')
        .addStringOption(option => 
            option.setName('input')
            .setDescription('Playlist youtube link')
            .setRequired(true)),
    async execute(interaction, client) {

        const songChoice = interaction.options.getString('input');


        const search = await client.distube.search(songChoice, {
            type : SearchResultType.PLAYLIST,
        })



        const message = {
            text: ""
        }

        const play = client.distube.play(interaction.member.voice.channel, search[0], {
            interaction,
            textChannel: interaction.channel,
            member: interaction.member,
        })
        .catch(err => {
            message.text = "🔥 ERROR You must be in a voice channel!"
        })

        if(interaction.member.voice.channel) {
            message.text = `🔥 Added **${search[0].name}** to the queue!`
        } else {
            message.text = "🔥 ERROR You must be in a voice channel!"
        }

        await interaction.reply({
            content: message.text
        })
    }
}