const { Client } = require('discord.js');
const client = new Client({
    intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILD_PRESENCES'],
    fetchAllMembers: true
});

const s = require("./utils/spotify")
const f = require("./utils/functions")

const d_config = require('./config/discord.json');
const s_config = require('./config/server.json');

var express = require('express');
var app = express();

var port = s_config.port || 3001;
var router = express.Router();

app.use('/', router);
client.login(d_config.token);
console.log('Bot running');
app.listen(port);
console.log('App now running on Port ' + port);


router.get('/user/:id', async function(req, res) {
    const user = client.users.cache.get(req.params.id)
    const member = client.guilds.cache.get("869281997082734652").members.cache.get(req.params.id);
    let array;
    function addToArray(data) {
        array = data.replace('undefined', '').split(' ')
    }
    member.presence.activities.forEach(e => {
        addToArray(array + e.id)
    })
    res.json({
        success: true,
        data: {
            spotify: s.getData(member),
            isListening: s.isListening(member),
            discord_user: {
                username: user.username,
                flags: user.flags,
                id: user.id,
                discriminator: user.discriminator,
                avatar: user.avatar
            },
            discord_status: member.presence.status,
            activities: array
        }
    })
});
