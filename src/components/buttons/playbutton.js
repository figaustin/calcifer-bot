module.exports = {
    data: {
        name: `playbutton`
    }, 
    async execute(interaction, client) {
        
        client.distube.resume(interaction);
        
        await interaction.deferReply();
        await interaction.deleteReply();
    }
}