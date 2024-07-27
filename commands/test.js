module.exports.config  = {
    name: "test",
    group: "misc"
}

module.exports.run = async(client, message, args ) =>{
    message.channel.send(client.muteRoleInvalid)
}