const Discord = require("discord.js")
module.exports = {
    name: 'ping',
    cooldown: '10',
    execute(message, system) {
        let date = system.lang.ping.date.split('-')
		let totalSeconds = (system.client.uptime / 1000);
		let days = Math.floor(totalSeconds / 86400);
		let hours = Math.floor( (totalSeconds %= 86400) / 3600);
		let minutes = Math.floor( (totalSeconds%= 3600) / 60);
		let seconds = Math.floor(totalSeconds % 60);
		let uptime = days + date[0] + hours + date[1] + minutes + date[2] + seconds + date[3];
        const ping_embed = new Discord.MessageEmbed()
            .setColor(system.config.embed_colors.important)
            .addField(system.lang.ping.calc, '\u200B')
        message.channel.send(ping_embed).then((resultMessage) => {
            let ping = resultMessage.createdTimestamp - message.createdTimestamp
            resultMessage.edit(new Discord.MessageEmbed()
                .setColor(system.config.embed_colors.important)
                .addField(`Ping: \`` + ping + 'ms\`, Discord API: \`' + system.client.ws.ping + 'ms\`', system.lang.ping.uptime + uptime)
            )
        })
    }
}