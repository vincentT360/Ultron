const {prefix, token} = require("./config.json")

//fs allows you to interact with the file system
const fs = require('fs')
const ytdl = require('ytdl-core')

const Discord = require('discord.js')
const client = new Discord.Client()

//Create a collection to store our commands
client.commands = new Discord.Collection()
//Returns an array of all files in commands folder ending with .js
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

//Require each file we loop through
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log("Ready!")

})


client.on('message', message => {

    //If message does not start with our prefix or is made by a bot ignore.
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    //Removes prefix and splits message, uses a regex
    const args = message.content.slice(prefix.length).split(/ +/)

    //Gets the command which is the first word like !play it gives play
    const commandName = args.shift().toLowerCase();
    
    //If command does not exist, return
    if (!client.commands.has(commandName)) return;

    //Access command collection using the commandName key
    const command = client.commands.get(commandName);

    try{
        //Call the execute function to do something
        command.execute(client, message, args);
    }catch(error) {
        console.error(error)
        message.reply("There was an error in executing that command.")
    }

})



client.login(token)