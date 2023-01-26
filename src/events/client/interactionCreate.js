const { InteractionType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { currentEmbed } = require('../../bot.js')

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const { commands } = client;
            const { commandName } = interaction;
            const command = commands.get(commandName);

            if (!command) return;

            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.error(error);
                await interaction.reply({
                    content: `Something went wrong while executing this command...`,
                    ephemeral: true
                })
            }

            if(currentEmbed.messageId != "" && interaction.channel.id === currentEmbed.channel) {
                currentEmbed.count += 1;
                if(currentEmbed.count === currentEmbed.maxStickMessageCount) {
                    await interaction.channel.messages.fetch(currentEmbed.messageId)
                        .then(m => {
                            m.delete()
                            sendNew(interaction)
                            currentEmbed.count = 0;
                        })
                        .catch(console.error)
                }
            }

        } else if (interaction.isButton()) {
            const { buttons } = client;
            const { customId } = interaction;
            const button = buttons.get(customId);
            if(!button) return new Error("There is no code for this button!");

            try{
                await button.execute(interaction, client);
            } catch(err) {
                console.error(err);
            }
        }
        
    }
}

const sendNew = async(interaction) => {
    const btn = new ButtonBuilder()
                .setCustomId(`playbutton`)
                .setEmoji('▶')
                .setStyle(ButtonStyle.Primary);
    const pause = new ButtonBuilder()
                .setCustomId('pausebutton')
                .setEmoji('⏸')
                .setStyle(ButtonStyle.Primary)
    const skip = new ButtonBuilder()
                .setCustomId(`skipbutton`)
                .setEmoji('⏭')
                .setStyle(ButtonStyle.Primary);
    const sent = await interaction.channel.send({
        embeds: [currentEmbed.embed],
        components: [new ActionRowBuilder().addComponents(btn, pause, skip)]
    })
    currentEmbed.messageId = sent;
}