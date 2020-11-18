const Discord = require("discord.js")
module.exports = {
	name: 'reload',
	permissions: "ADMINISTRATOR",
	args: true,
    usage: '[command name]',
	execute(message, system, args) {
        const commandName = args[0].toLowerCase();
		const command = message.client.commands.get(commandName)
			|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) {
			const no_reload_embed = new Discord.MessageEmbed()
			.setColor(system.config.embed_colors.error)
			.addField(`${message.author.tag}!`, `${system.lang.reload.not_found} \`${commandName}\``)
			return message.channel.send(no_reload_embed);
		}

		delete require.cache[require.resolve(`./${command.name}.js`)];

		try {
			const newCommand = require(`./${command.name}.js`);
			message.client.commands.set(newCommand.name, newCommand);
			const reload_embed = new Discord.MessageEmbed()
			.setColor(system.config.embed_colors.important)
			.addField(`${command.name}!`, `${system.lang.reload.found}`)
			message.channel.send(reload_embed);
		} catch (error) {
			console.log(error);
			const error_reload_embed = new Discord.MessageEmbed()
			.setColor(system.config.embed_colors.error)
			.addField(`${system.lang.reload.error} \`${command.name}\`:`, `\`${error.message}\``)
			message.channel.send(error_reload_embed);
		}
	},
};