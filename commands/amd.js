const {prefix} = require('../config.json')

module.exports = {
    name: 'amd',
    description: `AMD Graphics cards are better for the price | Ex. ${prefix}amd`,
    execute(client, message, args) {
        message.channel.send("AMD has better value for the price")
    }
}