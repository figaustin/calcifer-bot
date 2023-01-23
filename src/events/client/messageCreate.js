module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        if(message.content.includes("Calcifer") || message.content.includes("calcifer")) {
            message.channel.send(`🔥 **Hello**, <@${message.author.id}>`)
        }
        
        else if(message.content.includes(`<@${client.user.id}`)) {
            message.channel.send(`🔥 **Hey**, <@${message.author.id}>, **what do you want?**`)
        }
    }
}