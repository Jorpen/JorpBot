//Welcome to JorpBot! below I will be outlining planned features.
//todo: trim "I love you" message, so that it will read no matter capitalization or spacing.
//more commands, ideas: !roll (selected die) !time
//restart function, so I don't have to keep constantly restarting my command prompt.
//Add Twitter post integration.
//Make bot automatically give people the "relatively cool lads" role after being in the server for "x" time
//figure out why in the heck this seems to hate custom emotes


const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')

//emoji line
const jool = client.emojis.find(emoji => emoji.name === "jool");

var greetingsList = ["Good morning :)", "Hello!", "Wow hey there!", "WHO ARE YOU also hi I guess.", 'Hey there ' + jool]
var tempTest = ['Hey there. ' + ":point_right: " + ":sunglasses: " +":point_right:"  ]
var commandList = ["!hello "]

client.on('ready', () => {
    console.log('beep boop I live')

})
//message tags block. This is how JorpBot processes commands, with the processCommand function.
client.on('message', (receivedMessage) => {
    if (receivedMessage.author.bot) {
        return
    }

    if (receivedMessage.content.includes(client.user.toString() + " I love you")) {
        receivedMessage.channel.send("I don't know you " + receivedMessage.author.toString() + " ya butt don't say stuff like that it makes me nervous!!!")
            .catch(console.error);
    }

    if (receivedMessage.content.startsWith("!")) {
        processCommand(receivedMessage)
    }

    

})
//scanning for messages and specific phrases
client.on('message', msg => {
    if (msg.author.bot) {
        return
    }
    //msg.reply will tag user, msg.channel.send will just reply in the channel REMEMBER THIS
    if (msg.content === 'Happy birthday Zack') {
        msg.channel.send('Happy birthday Zack!')
            .catch(console.error);
    }

})



//function block!
function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1)//removes !
    let splitCommand = fullCommand.split(" ")//split message into parts separated by spaces
    let primaryCommand = splitCommand[0]//This is the first word after the !
    let arguments = splitCommand.slice(1)//Everything else aka additional arguments

    console.log("Command received: " + primaryCommand)
    console.log("Arguments: " + arguments)

    if (primaryCommand == "commands") {
        receivedMessage.channel.send("Here is a list of the commands for me: " + commandList)
    }

    if (primaryCommand == "hello") {
        var response = greetingsList[Math.floor(Math.random() * greetingsList.length)];

        receivedMessage.channel.send(response)
            .catch(console.error);
    }
    //restarts the bot so I don't have to spam cmd close
    if (primaryCommand == "restart") {
        //this command line checks the role name to make sure its me
        if (receivedMessage.member.roles.find("name", "Jorpen?"))
            resetBot(receivedMessage.channel); 
        else
            receivedMessage.channel.send("You don't have permission for that!")
    }

    if (primaryCommand == "test") {
        receivedMessage.channel.send(tempTest)
        .catch(console.error)
    }
}

function resetBot(channel) {
    channel.send("Resetting, please hold!~")
        .then (msg => client.destroy())
        .then(() => client.login(botkey))
}







//This is the login line, please do not steal my bot's personal info he's sensitive

var botkey = config.TOKEN

client.login(botkey)