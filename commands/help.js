module.exports = {
    name: 'help',
	aliases: ['commands'],
	usage: '[command name]',
    execute(message, system, args) {
        const { commands } = message.client;
        let lang = system.lang.help
        const help_embed = new system.Discord.MessageEmbed()
        if (!args.length /* || args[0] === 'dm'||'DM' */ ) {
            help_embed
            .setColor(system.config.embed_colors.important)
            .setTitle(lang.setTitle)
            .setDescription(commands.map(c => {return c.name;}).join(' / '))
            .addFields(
                { name: lang.addFields1, value: `\`${system.config.prefix}help [command_name]\``},
                { name: lang.addFields2_name, value: `${lang.addFields2_value1} \n ${lang.addFields2_value2}`},
                { name: lang.addFields3, value: '???'},
            )
            .setTimestamp()

            //if (args[0] == 'dm') {
                return message.author.send(help_embed)
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply(lang.sent_DM);
                })
                .catch(error => {
                    console.error(`${lang.cannot_send} ${message.author.tag}.\n`, error);
                    message.reply(lang.cannot_DM);
                });
            //}else{
            //    return message.channel.send(help_embed)
            //}
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
        
        if (!command) {
            help_embed
			.setColor(system.config.embed_colors.error)
			.addField('\`' + name + '\`', lang.not_valid)
			return message.channel.send(help_embed);
        }
        help_embed
        .setColor(system.config.embed_colors.important)
        .setTitle(`\`${lang.info}\``)
        .addFields(
            { name: lang.a, value: command.name, inline:true},
            { name: lang.b, value: command.aliases/* .join(', ') */ || `\`${lang.bb}\``, inline:true},
            { name: lang.g, value: command.permissions ||`\`${lang.gg}\``, inline:true},
            { name: lang.c, value: (system.lang[command.name].description || `\`${system.lang.cc}\``)},
            { name: lang.d, value: system.config.prefix+command.name + ' ' + (command.usage || ' '), inline:true},
            { name: lang.e, value: (command.cooldown? command.cooldown + ' sec' : `\`${lang.ee}\``), inline:true},
            { name: lang.f, value: (command.guildOnly ? system.lang.t : '\`' + system.lang.f + '\`'), inline:true}
        )
        .setTimestamp()
        message.channel.send(help_embed);
    }
}