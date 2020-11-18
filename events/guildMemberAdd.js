module.exports = (system, member) => {
    //system.config.get_channel(system.config.chan_nameID.system).send("Test")
    let data = []
    data.push(`${member},` + system.lang.guildMemberAdd.welcome + system.config.chan_message.plus_welcome)

    system.config.get_channel(system.config.chan_nameID.welcome).send(data)
}
/*
//welcome role
const guild = new Discord.Guild();
const welcome_role = client.guilds.roles.cache.find(role => role.name === "Test");
//give welcome role
member.roles.add(welcome_role);
*/