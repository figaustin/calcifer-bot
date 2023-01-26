module.exports = {
    data: {
        name: `skipbutton`
    }, 
    async execute(interaction, client) {
        
        const skip = client.distube.skip(interaction, {}).catch(error => {
            client.distube.voices.get(interaction).leave()
        })

        await interaction.deferReply();
        await interaction.deleteReply();
    }
}