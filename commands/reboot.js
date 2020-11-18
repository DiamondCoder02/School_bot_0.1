module.exports = {
    name: 'reboot',
	guildOnly: true,
	permissions: "ADMINISTRATOR",
	cooldown: 1,
    args: true,
    usage: '<password>',
    execute(message, system, args) {	
		const reboot_embed = new system.Discord.MessageEmbed()
		if(args[0] === system.config.bot_password){
			try{
				reboot_embed
				.setColor(system.config.embed_colors.important)
				.addField(system.lang.reboot.reboot, message.author)
				require('child_process').exec('cmd /c start "" cmd /c run.bat', function(error, stdout, stderr) {
						console.log(stdout);
					})
				if (message.channel.type != 'dm') message.delete()
				message.channel.send(reboot_embed)
				.then(() => system.client.destroy())
				.then(() => process.exit())
			} catch (error) {
				reboot_embed
				.setColor(system.config.embed_colors.error)
				.addField(message.author, `\`${error.message}\``)
				message.channel.send(reboot_embed);
			}
		}else{
			reboot_embed
			.setColor(system.config.embed_colors.error)
			.addField(message.author.tag, `\`${system.lang.reboot.wrong_pass}\``)
			message.channel.send(reboot_embed);
		}
    }
}