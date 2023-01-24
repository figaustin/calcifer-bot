const  { DisTube } = require("distube");
const { currentEmbed } = require('../../bot.js')
const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    name: 'playSong',
    async execute(queue, song) {
        
        if(currentEmbed.messageId === '') {
            const embed = new EmbedBuilder();

            embed.setTitle(song.name)
                .setDescription(`Requested By: ${song.member}`)
                .setColor(0xe28743)
                .setImage(song.thumbnail)
                .setURL(song.url)
                .setThumbnail(queue.client.user.displayAvatarURL())

            const btn = new ButtonBuilder()
                .setCustomId(`playbutton`)
                .setLabel('⏯')
                .setStyle(ButtonStyle.Primary);

            
            const sent = await queue.textChannel.send(
                {
                    embeds: [embed],
                    components: [new ActionRowBuilder().addComponents(btn)]
                }
                );

            currentEmbed.messageId = sent.id;
            
        } else {

            const embed = new EmbedBuilder();

            embed.setTitle(song.name)
                .setDescription(`Requested By: ${song.member}`)
                .setColor(0xe28743)
                .setImage(song.thumbnail)
                .setURL(song.url)
                .setThumbnail(queue.client.user.displayAvatarURL())
            
            
            await queue.textChannel.messages.fetch(currentEmbed.messageId)
                .then(m => {
                    m.edit({embeds: [embed]})
                })
                .catch(console.error)
        }
         
    }
}