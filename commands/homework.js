const Discord = require("discord.js")
var hw = require(`../informations/homework.json`)
module.exports = {
    name: 'homework',
    aliases: 'hw',
    cooldown: 60,
    guildOnly: true,
    execute(message, system, args) {
            const hw_embed = new Discord.MessageEmbed()
        .setColor(system.config.embed_colors.info)
        .setTitle(system.lang.homework.setTitle)
        .addFields(
            { name: hw.hw0, value: hw.hw00},
            { name: hw.hw1, value: hw.hw01},
            { name: hw.hw2, value: hw.hw02},
            { name: hw.hw3, value: hw.hw03},
            { name: hw.hw4, value: hw.hw04},
            { name: hw.hw5, value: hw.hw05},
            { name: hw.hw6, value: hw.hw06},
            { name: hw.hw7, value: hw.hw07},
            { name: hw.hw8, value: hw.hw08},
            { name: hw.hw9, value: hw.hw09},
            { name: hw.hw10, value: hw.hw010},
            { name: hw.hw11, value: hw.hw011},
            { name: hw.hw12, value: hw.hw012},
            { name: hw.hw13, value: hw.hw013},
            { name: '\u200B', value: '\u200B' },
            { name: system.lang.homework.t, value: hw.tests, inline: true},
            { name: system.lang.homework.o, value: hw.online, inline: true},
        )
        .setFooter(`${system.lang.homework.last_upd} ${hw.last_up}`);
    
    message.channel.send(hw_embed);
    }
}