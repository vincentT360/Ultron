const ytdl = require("ytdl-core")
const fetch = require("node-fetch")
const {youtube_key} = require("../config.json")

const songQueue = []
const url ="https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q="

module.exports = {
    name: 'youtube',
    description: "Plays youtube songs | Ex: !youtube Brother Bear im on my way",
    async execute(client, message, args) {
        if (!args.length){
            message.channel.send("You didn't provide a song to play, try again :(")
        }
        // if (message.member.voiceChannel !== null){
        //     message.channel.send("You must be in a voice channel to play a song!")
        // }
        else{

            const link = await getYoutubeLink(message, args) //ADD IN LATER

            // const link = "www.youtube.com/watch?v=xfeys7Jfnx8" //TEMPORARY SO WE DONT USE UP API CALLS

            const songInfo = await ytdl.getInfo(link)

            //const songInfo = await ytdl.getInfo(args[0])

            const song = {
                title: songInfo.title,
                url: songInfo.video_url,
                voiceChannel: message.member.voice.channel,
                messageChannel: message.channel
            }

            //Add song to queue
            songQueue.push(song)

            //If the bot is not in a voice channel, play the queue
            if(client.voice.connections.size === 0){
                play()
            }

            //console.log(songQueue)
            
            // message.channel.send(`Playing: ${song.title}\n${song.url}`)
            // const voiceChannel = message.member.voice.channel

            // voiceChannel.join().then(connection => {
            //     connection.play(ytdl(link, {filter:"audioonly"}), {volume: 1})
            //     .on('finish', ()=> {
            //         connection.channel.leave()
            //     })
            // })

        }

    }
}

function assembleQuery(args){
    //Encodes into URI proper format
    const search = args.join(" ").trim()
    const cleanedSearch = encodeURI(search)
    return cleanedSearch
}

async function getYoutubeLink(message, args) {
    //Gets the youtube link using the Youtube API
    try {
        const query = assembleQuery(args)
        let videoLink = ""
        let data = await fetch(`${url}${query}&key=${youtube_key}`)
        let jsonData = await data.json()
        if (jsonData["items"] != []){
            const videoID = jsonData["items"][0]["id"]["videoId"]
            videoLink = `www.youtube.com/watch?v=${videoID}`
        }
        return videoLink
    }catch (error) {
        console.log(error)
        message.channel.send("Error processing the request :(")
        return ""
    }

}

function play() {

    //Get first song on the queue and shift
    const song = songQueue.shift()

    song.messageChannel.send(`Playing: ${song.title}\n${song.url}`)

    song.voiceChannel.join().then(connection => { //NOTE JUST ADDED highWaterMark, check to see if broken
        connection.play(ytdl(song.url, {filter:"audioonly"}), {volume: 1},{highWaterMark: 1})
        .on('finish', ()=> { //If there are still songs, continue playing
            if(song){
                play()
            }
            else{ //Else, leave
                connection.channel.leave()
            }
        })
    })

}