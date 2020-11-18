const Discord = require("discord.js")

const fs = require('fs')
let languagesFiles = fs.readdirSync('./languages')//.filter(file => file.endsWith('.json'));
let informationsFiles = fs.readdirSync('./informations');
let eventFiles = fs.readdirSync('./events')//.filter(file => file.endsWith('.js'));
let commandFiles = fs.readdirSync('./commands')//.filter(file => file.endsWith('.js'))

module.exports = {
    name: 'version',
    cooldown: '60',
    execute(message, system, args) {

            const version_embed = new Discord.MessageEmbed()
        .setColor(system.config.embed_colors.other)
        .setTitle(system.lang.version.setTitle)
        .setDescription(`${system.lang.version.setDescription} ~20.0%`)
        .setThumbnail('https://e7.pngegg.com/pngimages/574/586/png-clipart-discord-computer-icons-logo-computer-software-others-miscellaneous-blue.png')
        .addFields(
            { name: system.lang.version.f_idea, value: system.config.version.f_idea},
            { name: system.lang.version.to_fix, value: system.config.version.to_fix},
            { name: system.lang.version.bugs, value: system.config.version.bugs},
            { name: system.lang.version.lang, value: languagesFiles, inline:true},
            { name: system.lang.version.event, value: eventFiles, inline:true},
            { name: system.lang.version.info, value: informationsFiles},
            { name: system.lang.version.command, value: commandFiles},
        )
        .setTimestamp()
        .setFooter(`${system.lang.version.last_upd}: 24-09-2020`);
    
    message.channel.send(version_embed)
    }
}
