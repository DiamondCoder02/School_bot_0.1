const parser = require('rss-parser')
/*** Discord, fs load ***/
const Discord = require('discord.js'), fs = require('fs')
const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();
/*** config and language load ***/
let config = require('./config.json');
const lang = require('./languages/' + config.language + '.json');
const system = {Discord, client, config, lang, fs};
/*** Console logs ***/
console.log(client);
//client.on("error", (e) => console.error(e))
//client.on("warn", (e) => console.warn(e))
//client.on("debug", (e) => console.info(e))
client.login(config.token);

//For now
if (config.language == "hungarian"){
	/* magyar dátumformátum */
	config.lastedit = config.lastedit.split('-').reverse().join('. ') + '.'
	config.toISO = function(val){ return val.toISOString().replace(/\.\d.*/gi, '').replace(/T|-/gi, '. ')}
}

//Channel watcher
config.get_channel = function get_channel(ch) { 
    //csatorna kezelő függvény config obj.-ba, hogy mindenhol elérhető legyen
    let channel = '', ch_cache = client.channels.cache
    if (ch_cache.get(ch) !== undefined){
        channel = ch_cache.get(ch)
    } else if (ch_cache.find(c => c.name === ch) !== undefined){
        channel = ch_cache.find(c => c.name === ch)
    } else {
        console.log(lang.ready.error)
        //process.exit()
    }
    return ch_cache.get(channel.id)
}

//Event reader
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      const event = require(`./events/${file}`);
      // Get just the event name from the file name
      let eventName = file.split(".")[0];
      // super-secret recipe to call events with all their proper arguments *after* the `client` var.
      // this means each event will be called with the client argument
      client.on(eventName, event.bind(null, system));
      delete require.cache[require.resolve(`./events/${file}`)];
    });
});
//command handler / executor
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command)
}
client.on('message', message => {
    //message listener
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;
	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    //command find
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
    if(!command) return;
    //server only check
    if (command.guildOnly && message.channel.type === 'dm') {
            const guildOnly_embed = new Discord.MessageEmbed()
        .setColor(system.config.embed_colors.error)
        .addField("(* ￣︿￣))", lang.index.can_not_execute_DM)
        return message.reply(guildOnly_embed);
    }
    //arguments
    if (command.args && !args.length) {
		let reply = `${message.author}, ${lang.index.no_argument}`;
		if (command.usage) {
			reply += `\n${lang.index.proper_argument} \`${config.prefix}${command.name} ${command.usage}\``;
        }
            const no_args_embed = new Discord.MessageEmbed()
        .setColor(system.config.embed_colors.error)
        .addField("(* ￣︿￣))", reply)
		return message.channel.send(no_args_embed);
	}
    //Cooldown
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 1) * 1000;
    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            const not_done_cooldown_embed = new Discord.MessageEmbed()
        .setColor(system.config.embed_colors.error)
        .addField(command.name, lang.index.cooldown1 + ' ' + timeLeft.toFixed(1) + ' ' + lang.index.cooldown2)
            return message.reply(not_done_cooldown_embed);
        }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    //role check
    if (message.guild) {
        var role = (message.channel.permissionsFor(message.member).has(command.permissions) || message.channel.type == "dm")
    }
    //user cache
    //let _member = user_c.find(u_obj => u_obj.username === config.admin)
    if (role || message.channel.type == "dm" /* _member === message.author.id */) {
        //run and error catch
        try {
            command.execute(message, system, args)
        } catch (error) {
            console.error(error);
                const error_embed = new Discord.MessageEmbed()
                .setColor(config.embed_colors.error)
                //.setDescription(lang.index.error)
                .addField(lang.index.error, `${lang.index.error_terminal} \`${lang.index.error_or}\` ${lang.index.error_bot_owner} \n**Error:**\`${error.message}\``)
            message.reply(error_embed)
        }
    }
    //No role
    else {
            const no_role_embed = new Discord.MessageEmbed()
        .setColor(system.config.embed_colors.important)
        .addField("(* ￣︿￣))", lang.index.perm_req)
        message.reply(no_role_embed)
    }
});
/*
let parser_ = new parser({
    customFields: {
    image: ['title', 'url'],
    item: ['title', 'link', 'pubDate' , 'description']
    }
});
parser_.parseURL(config.rss_api.school_rss, function(err, feed) {
    const rss_channel = client.channels.cache.get(config.rss_api.newsID)
    //client.channels.cache.get(735518782143070258).reply(feed.image.title + "\n" + feed.image.url)
    //rss_channel.send(feed.image.title + "\n" + feed.image.url)
    //console.log("\n\t" + feed.image.title + "\n" + feed.image.url + "\n\n");
    try{    
        feed.items.forEach(function(entry) {
            //rss_channel.send("Iskola hírek teszt: \n" + entry.title + ' (' + entry.pubDate + "): \n" + entry.link + "\n" ); //+ entry.description + "\n")
            console.log(entry.title + ' (' + entry.pubDate + "): \n" + entry.link + "\n" ); //+ entry.description + "\n");
                const rss_embed = new Discord.MessageEmbed()
            .setColor(config.embed_colors.info)
            .setTitle(entry.title)
            .setDescription(entry.link)
            .setThumbnail(feed.image.url)
            .setFooter(entry.pubDate);
            //const channel = system.client.channels.cache.get(system.config.rss_api.newsID)
            //system.client.channels.cache.get(channel).send(rss_embed); return
            rss_channel.send(rss_embed)
        })
    }catch(error){
    console.log(error)
    }
})
*/