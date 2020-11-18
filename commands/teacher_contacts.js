const Discord = require("discord.js")
let tc = require('../informations/teacher_contacts.json')

module.exports = {
	name: 'teacher_contacts',
	aliases: ['tc'],
	guildOnly: true,
	execute(message, system, args) {
		const t_cont = get_obj(tc)
		const tc_embed = new Discord.MessageEmbed()
		.setColor(system.config.embed_colors.info)
		.setTitle(system.lang.t_c.setTitle)
		.setDescription(system.lang.t_c.setDescription)
		.setThumbnail(t_cont[0])
		.addField("\u200B", t_cont[1] )
		.setFooter(system.lang.t_c.last_upd + t_cont[2])
        message.channel.send(tc_embed)
        /*
        .then((resultMessage) => {
            resultMessage.react('⬅️')
            .then(resultMessage.react('➡️'))
        })
        */
	}
}
//{ name: `${tc.teacher_1.name}`, value: `\`${tc.teacher_1.subject}\` \n${tc.teacher_1.email_other}`}

function get_obj(value, get = '', sep = 10, suf = "\n"){
	if (value.constructor !== Array || value.length < 1) return false
	var out = '', tn = '', lu = '', find = [], i = 0
	for (let a in value){
		if (value[a].constructor !== Object || Object.keys(value[a]).length < 1) continue
		for (let o in value[a]){
			if (!value[a][o]) continue
			if (get && value[a][o].toLowerCase().search(get.toLowerCase()) >= 0) find.push(value[a])
			switch (o){
				case 'thumbnail': {tn += value[a][o] + suf; break}
				case 'last_update': {lu += value[a][o] + suf; break}
				case 'name': {out += "**" + value[a][o] + "**" + suf; ++i; break}
				case 'subject': {out += "\`" + value[a][o] + "\`" + suf; break}
				default: out += value[a][o] + suf
			}
		}
		if (i%sep == 0) out += suf
	}
	if (find.length > 0) return get_obj(find, "::find::")
	return (get == "::find::")? out : [tn, out, lu]
}
/*
module.exports = {
    name: 'teacher_contacts',
    aliases: ['tc'],
    guildOnly: true,
    execute(message, system, args) {
            const t = arr_obj(tc) //.split(":::");
            const tc_embed = new Discord.MessageEmbed()
        .setColor(system.config.embed_colors.info)
        .setTitle(system.lang.t_c.setTitle)
        .setDescription(system.lang.t_c.setDescription)
        .addField("teszt:", t )
        //.setFooter(t[1])
        //.setThumbnail(t[1])
        .addFields(
            { name: `${tc.teacher_1.name}`, value: `\`${tc.teacher_1.subject}\` \n${tc.teacher_1.email_other}`},
            { name: `${tc.teacher_2.name}`, value: `\`${tc.teacher_2.subject}\` \n${tc.teacher_2.email_other}`},
            { name: `${tc.teacher_3.name}`, value: `\`${tc.teacher_3.subject}\` \n${tc.teacher_3.email_other}`},
            { name: `${tc.teacher_4.name}`, value: `\`${tc.teacher_4.subject}\` \n${tc.teacher_4.email_other}`},
            { name: `${tc.teacher_5.name}`, value: `\`${tc.teacher_5.subject}\` \n${tc.teacher_5.email_other}`},
            { name: `${tc.teacher_6.name}`, value: `\`${tc.teacher_6.subject}\` \n${tc.teacher_6.email_other}`},
            { name: `${tc.teacher_7.name}`, value: `\`${tc.teacher_7.subject}\` \n${tc.teacher_7.email_other}`},
            { name: `${tc.teacher_8.name}`, value: `\`${tc.teacher_8.subject}\` \n${tc.teacher_8.email_other}`},
            { name: `${tc.teacher_9.name}`, value: `\`${tc.teacher_9.subject}\` \n${tc.teacher_9.email_other}`},
            { name: `${tc.teacher_10.name}`, value: `\`${tc.teacher_10.subject}\` \n${tc.teacher_10.email_other}`},
            { name: `${tc.teacher_11.name}`, value: `\`${tc.teacher_11.subject}\` \n${tc.teacher_11.email_other}`},
            { name: `${tc.teacher_12.name}`, value: `\`${tc.teacher_12.subject}\` \n${tc.teacher_12.email_other}`},
            { name: `${tc.teacher_13.name}`, value: `\`${tc.teacher_13.subject}\` \n${tc.teacher_13.email_other}`},
            { name: `${tc.teacher_14.name}`, value: `\`${tc.teacher_14.subject}\` \n${tc.teacher_14.email_other}`},
            { name: `${tc.teacher_15.name}`, value: `\`${tc.teacher_15.subject}\` \n${tc.teacher_15.email_other}`},
            { name: `${tc.teacher_16.name}`, value: `\`${tc.teacher_16.subject}\` \n${tc.teacher_16.email_other}`},
            { name: `${tc.teacher_17.name}`, value: `\`${tc.teacher_17.subject}\` \n${tc.teacher_17.email_other}`},
        )
        //.setFooter(`${system.lang.t_c.last_upd} ${tc.last_update}`);
    message.channel.send(tc_embed)
    }
}
*/