const {prefix} = require('../config.json')

module.exports = {
    name: 'help',
    description: `Shows commands | Ex. ${prefix}help`,
    execute(client, message, args) {
        const data = [] 
        const {commands} = message.client
        console.log(commands)
        commands.forEach(element => {
            data.push(`\n${prefix}${element.name}\n${element.description}\n`)
        });
        message.reply(data)
    }
}