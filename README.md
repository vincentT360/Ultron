# Ultron

A discord bot that can play youtube videos in your channel and do other silly things!

### Prerequisites

Make sure you have Node.js and FFMPEG installed on your computer.

Additionally, be sure to have a Discord account, a Discord bot token, and a YouTube API key.

### Installing

Running node's install should get you started!

```
npm install <git-host>:<git-user>/<repo-name>
npm install <git repo url>
npm install <folder>
```
### Additionally Information

Not included is the config.js file, this is where all the prefix/tokens/keys are held to make the bot actually work.

Be sure to add a config.js file to the project folder and format it as so:
- prefix is the bot prefix such as !help or _help, the prefix would be ! or _
- token is the discord bot token found by heading over to the Discord Developers Portal
- youtube_key is the YouTube API key found by heading over to the Google Developers Portal
```
{
    prefix: "",
    token: "",
    youtube_key: "", 
}
```

## Hosting

A simple way to deploy it is to either host it on a server or run it on a Raspberry Pi 24/7.

## Built With

* [Discord.js](http://www.dropwizard.io/1.0.2/docs/) - The discord javascript bot library used
* [ytdl-core](https://www.npmjs.com/package/ytdl-core) - The youtube download library used
* [FFMPEG](https://www.ffmpeg.org/) - The audio streaming library used

## Author

* **Vincent Thai** [vincentT360](https://github.com/vincentT360)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
