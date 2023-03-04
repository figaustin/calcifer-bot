const { SlashCommandBuilder, StringSelectMenuBuilder, ActionRowBuilder, SelectMenuOptionBuilder } = require('discord.js');
const { execute } = require('./play');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('changecolor')
        .setDescription('Change your name color!')
        .addStringOption(option => 
            option.setName('color')
                .setDescription('Select a default color')
                .setRequired(true)
                .addChoices(
                    { name: 'Custom', value: 'Custom'},  
                    { name: 'AQUA', value: 'AQUA'}, 
                    { name: 'GREEN', value: 'GREEN'}, 
                    { name: 'BLUE', value: 'BLUE'}, 
                    { name: 'YELLOW', value: 'YELLOW'}, 
                    { name: 'PURPLE', value: 'PURPLE'}, 
                    { name: 'LUMINOUS_VIVID_PINK', value: 'LUMINOUS_VIVID_PINK'}, 
                    { name: 'FUCHSIA', value: 'FUCHSIA'}, 
                    { name: 'GOLD', value: 'GOLD'}, 
                    { name: 'ORANGE', value: 'ORANGE'}, 
                    { name: 'RED', value: 'RED'}, 
                    { name: 'GREY', value: 'GREY'}, 
                    { name: 'NAVY', value: 'NAVY'}, 
                    { name: 'DARK_AQUA', value: 'DARK_AQUA'}, 
                    { name: 'DARK_GREEN', value: 'DARK_GREEN'}, 
                    { name: 'DARK_BLUE', value: 'DARK_BLUE'}, 
                    { name: 'DARK_PURPLE', value: 'DARK_PURPLE'}, 
                    { name: 'DARK_GOLD', value: 'DARK_GOLD'}, 
                    { name: 'DARK_ORANGE', value: 'DARK_ORANGE'}, 
                    { name: 'DARK_RED', value: 'DARK_RED'}, 
                    { name: 'DARK_GREY', value: 'DARK_GREY'}, 
                    { name: 'DARKER_GREY', value: 'DARKER_GREY'}, 
                    { name: 'LIGHT_GREY', value: 'LIGHT_GREY'}, 
                    { name: 'BLURPLE', value: 'BLURPLE'}, 
                    { name: 'GREYPLE', value: 'GREYPLE'}, 
            
                )
                )
                .addStringOption(option =>
                    option.setName('custom')
                    .setDescription('FORMAT: ###,###,### (HEX COLOR CODE, EX: 255,0,255)')),
    async execute(interaction, client) {
        
        const rolemgr = interaction.guild.roles;
        const roles = interaction.guild.roles.cache;

        const defaultColor = interaction.options.getString('color');
        const customColor = interaction.options.getString('custom');

        if(defaultColor == 'Custom') {
            if(customColor == null) {
                //DO SOMETHING
            } else {

            }
        } else {
            const found = false;
            for(let k in roles) {
                if(roles[k]['name'] == defaultColor) {
                    interaction.member.roles.add(k)
                    found = true;
                    break;
                } 
            }

            if(!found) {
                rolemgr.create({
                    name: defaultColor,
                    color: defaultColor,
                    hoist: false,
                    mentionable: false,
                })
                .then(role => {
                    interaction.member.roles.add(role);
                    role.setPosition(19);
                }
                    

                    )
            }
            
        }

        interaction.reply({
            content: "Working"
        })
    }
}