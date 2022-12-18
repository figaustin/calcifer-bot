module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        if(message.content.includes("Calcifer") || message.content.includes("calcifer")) {
            message.channel.send(`🔥 **Hello**, <@${message.author.id}>`)
        }
        
        else if(message.content.includes(`<@${client.user.id}`)) {
            message.channel.send(`🔥 **Hey**, <@${message.author.id}>, **what do you want?**`)
        }

        else if(message.author.id == `${process.env.user_id}` && message.content.includes('sorry') || 
        message.author.id == `${process.env.user_id}` && message.content.includes('Sorry')) {
            message.channel.send(`🔥 <@${message.author.id}>, **put a dollar in the sorry jar!!!**`)
        }
    }
}