const { SlashCommandBuilder } = require('discord.js');


module.exports =  {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Check what is in the queue'),
    async execute(interaction, client) {
        
        const queue = client.distube.getQueue(interaction);

        const message = {
            text: ""
        }

        if(!queue) {
            message.text = `🔥 There is nothing in the queue!`
            
        } else {
            message.text = `${queue.songs.map((song, id) =>
                `**${id ? id + '.' :'Currently Playing: '}** ${song.name} - \`(${song.formattedDuration})\``,
                )
            .slice(0, 10)
            .join('\n') }`
        }

        

        await interaction.reply({
            content: message.text
        })
    }
}