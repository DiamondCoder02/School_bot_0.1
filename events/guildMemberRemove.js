module.exports = (system, member) => {
    system.config.get_channel(system.config.chan_nameID.goodbye)
    .send(`${member}, ` + system.lang.guildMemberRemove.goodbye)
}