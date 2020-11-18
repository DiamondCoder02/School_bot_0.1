const Discord = require("discord.js")
module.exports = {
    name: 'user_info',
    aliases: ['ui', 'user'],
    guildOnly: true,
    args: true,
    usage: '<user>',
    execute(message, system, args) {
            const taggedUser = message.mentions.users.first();
            //const l_m_c_ID = system.client.channels.cache.get(taggedUser.lastMessageChannelID)
            const si_embed = new Discord.MessageEmbed()
        .setColor(system.config.embed_colors.other)
        .setTitle(system.lang.user_info.setTitle)
        //.setThumbnail(`https://e7.pngegg.com/pngimages/574/586/png-clipart-discord-computer-icons-logo-computer-software-others-miscellaneous-blue.png`)
        .addFields(
            {name: system.lang.user_info.tagged_user, value: taggedUser, inline:true},
            {name: system.lang.user_info.username, value: taggedUser.username, inline:true},
            {name: system.lang.user_info.D_tag, value: taggedUser.tag, inline:true},

            {name: system.lang.user_info.user_id, value: taggedUser.id, inline:true},
            {name: system.lang.user_info.user_cre_at, value: taggedUser.createdAt, inline:true},

            {name: system.lang.user_info.are_i_bot, value: (taggedUser.bot ? system.lang.t : system.lang.f)},
        )
        .setTimestamp()
        .setFooter(`[]~(￣▽￣)~*`);

    message.channel.send(si_embed);
    }
}