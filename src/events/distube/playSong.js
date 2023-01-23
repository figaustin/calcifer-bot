const  { DisTube } = require("distube");
const { currentEmbed } = require('../../bot.js')
const { EmbedBuilder } = require('discord.js');

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
            
            const sent = await queue.textChannel.send({embeds: [embed]});
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