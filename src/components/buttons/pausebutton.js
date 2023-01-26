module.exports = {
    data: {
        name: `pausebutton`
    }, 
    async execute(interaction, client) {
        
        client.distube.pause(interaction)

        await interaction.deferReply();
        await interaction.deleteReply();

    }
}