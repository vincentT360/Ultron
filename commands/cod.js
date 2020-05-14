const {prefix} = require('../config.json')

module.exports = {
    name: 'cod',
    description: `Asks if anyone wants to play COD, you can add mentions | Ex. ${prefix}COD @everyone`,
    execute(client, message, args) {
        let players = []
        
        message.mentions.users.forEach(element => {
            players.push(element)
        });
        players.push("Wanna play COD?")
        message.channel.send(players.join(" "))
    }
}