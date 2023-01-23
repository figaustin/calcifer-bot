module.exports = {
    data: {
        name: `Play`
    }, 
    async execute(interaction, client) {
        
        if(client.distube.paused) {
            client.distube.resume(interaction);
        } else {
            client.distube.pause(interaction);
        }
    }
}