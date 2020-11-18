const Discord = require("discord.js")
var ul = require(`../informations/usefull_links.json`)
module.exports = {
    name: 'usefull_links',
    aliases: ['ul'],
    guildOnly: true,
    execute (message, system, args) {
            const u_cont = get_obj(ul)
            const usefull_links_embed = new Discord.MessageEmbed()
        .setColor(system.config.embed_colors.info)
        .setTitle(system.lang.u_l.setTitle)
        .setDescription(system.lang.u_l.setDescription)
        .setThumbnail(ul.thumbnail)
        .addFields(
            { name: ul.type_1, value: ul.URL_1 },
            { name: ul.type_2, value: ul.URL_2 },
            { name: ul.type_3, value: ul.URL_3 },
            { name: ul.type_4, value: ul.URL_4 },
            { name: ul.type_5, value: ul.URL_5 },
        )
        .setFooter(`${system.lang.u_l.last_upd} ${ul.last_update}`);
    
    message.channel.send(usefull_links_embed);
    }
}

/*
		.setThumbnail(t_cont[0])
		.addField("\u200B", t_cont[1] )
		.setFooter(system.lang.t_c.last_upd + t_cont[2])
		message.channel.send(tc_embed)
*/
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