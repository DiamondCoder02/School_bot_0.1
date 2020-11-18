module.exports = {
    name: 'server_info',
    aliases: ['si', 'server'],
    cooldown: 30,
    guildOnly: true,
    execute(message, system) {
        let lang = system.lang.server_info, botlist = '', bots = []
        system.client.users.cache.filter(u_obj => u_obj.bot === true).forEach(val => {bots.push(val)})
		for(var u in bots){
			let member = message.guild.members.cache.get(bots[u].id)//, image = bots[u].avatarURL() //avatarokhoz, de nem tudom hogy lehet megjeleníteni
			botlist += lang.aF4_1 + `${member}` + "\n" + lang.aF4_2 + "\`" 
                //+ (system.config.toISO ? system.config.toISO(member.joinedAt) : member.joinedAt) 
                + "\`\n\n"
		}
        const si_embed = new system.Discord.MessageEmbed()
        .setColor(system.config.embed_colors.other)
        .setTitle(lang.setTitle)
        .setThumbnail(`https://e7.pngegg.com/pngimages/574/586/png-clipart-discord-computer-icons-logo-computer-software-others-miscellaneous-blue.png`)
        .addFields(
            {name: lang.aF1_1, value: `${message.guild.name} / ${message.guild.nameAcronym}`, inline:true},
            {name: lang.aF1_2, value: message.guild.region, inline:true},
            {name: lang.aF1_3, value: message.guild.memberCount, inline:true},
            {name: lang.aF1_4, value: message.guild.owner, inline:true},
            {name: lang.aF44_5, value: (message.guild.partnered ? system.lang.t : system.lang.f), inline:true},
            {name: lang.aF1_5, value: message.guild.createdAt},
        )
        .addField(`\u200B`, `**${lang.aF2}**`)
        .addField(lang.aF22, `${message.guild.me} \n ${message.guild.joinedAt}`, true)
        //.addField("What", (botlist? botlist : '-'), true)
        .addField(`\u200B`, `**${lang.aF3}**`)
        .addFields(
            {name: lang.aF33_1, value: message.guild.premiumSubcriptionCount || '0', inline:true},
            {name: lang.aF33_2, value: message.guild.premiumTier, inline:true},
        )
        .addField(`\u200B`, `**${lang.aF4}**`)
        .addFields(
            {name: lang.aF44_1, value: (message.guild.available ? system.lang.t : system.lang.f), inline:true},
            {name: lang.aF44_2, value: message.guild.systemChannel, inline:true},
            {name: '\u200B', value: '\u200B', inline:true},
            {name: lang.aF44_3, value: message.guild.mfaLevel, inline:true},
            {name: lang.aF44_4, value: message.guild.explicitContentFilter, inline:true},
        )
        .setTimestamp()
        .setFooter(`[]~(￣▽￣)~*`);
    message.channel.send(si_embed);
    }
}