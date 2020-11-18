const Discord = require("discord.js")
const parser = require('rss-parser')
module.exports = {
    name: 'rss_reload',
    aliases: 'rss',
    guildOnly: true,
    execute(message, system, args) {
        let parser_ = new parser({
            customFields: {
            image: ['title', 'url'],
            item: ['title', 'link', 'pubDate' , 'description']
            }
        });
        parser_.parseURL(system.config.rss_api.school_rss, function(err, feed) {
            const rss_channel = system.client.channels.cache.get(system.config.chan_nameID.news)
            //client.channels.cache.get(735518782143070258).reply(feed.image.title + "\n" + feed.image.url)
            //rss_channel.send(feed.image.title + "\n" + feed.image.url)
            //console.log("\n\t" + feed.image.title + "\n" + feed.image.url + "\n\n");
            /*try{    
                feed.items.forEach(function(entry) {
                    //rss_channel.send("Iskola hírek teszt: \n" + entry.title + ' (' + entry.pubDate + "): \n" + entry.link + "\n" ); //+ entry.description + "\n")
                    console.log(entry.title + ' (' + entry.pubDate + "): \n" + entry.link + "\n" ); //+ entry.description + "\n");
                        const rss_embed = new Discord.MessageEmbed()
                    .setColor(system.config.embed_colors.info)
                    .setTitle(entry.title)
                    .setDescription(entry.link)
                    .setThumbnail(feed.image.url)
                    .setFooter(entry.pubDate);
                    //const channel = system.client.channels.cache.get(system.config.chan_nameID.news)
                    //system.client.channels.cache.get(channel).send(rss_embed); return
                    rss_channel.send(rss_embed)
                })*/
            try{    
                feed.items.forEach(function(entry) {
                    //rss_channel.send("Iskola hírek teszt: \n" + entry.title + ' (' + entry.pubDate + "): \n" + entry.link + "\n" ); //+ entry.description + "\n")
                    console.log(entry.title + ' (' + entry.pubDate + "): \n" + entry.link + "\n" ); //+ entry.description + "\n");
                        const rss_embed = new Discord.MessageEmbed()
                    .setColor(system.config.embed_colors.info)
                    .setTitle(entry.title)
                    .setDescription(entry.link)
                    .setThumbnail(feed.image.url)
                    .setFooter(entry.pubDate);
                    //const channel = system.client.channels.cache.get(system.config.chan_nameID.news)
                    //system.client.channels.cache.get(channel).send(rss_embed); return
                    rss_channel.send(rss_embed)
                })
            }catch(error){
                console.log(error)
            }
        })

    }
}