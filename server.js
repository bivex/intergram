const express = require('express');
const cors = require('cors');
const compression = require('compression');
const axios = require('axios');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(compression());
app.use(express.static('dist', {index: 'demo.html', maxAge: '4h'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// handle admin Telegram messages
app.post('/hook', function(req, res){
    try {
        const message = req.body.message || req.body.channel_post;
        if (!message || !message.chat) {
            return res.status(200).end();
        }
        const chatId = message.chat.id;
        const name = message.chat.first_name || message.chat.title || "admin";
        const text = message.text || "";
        const reply = message.reply_to_message;

        if (text.startsWith("/start")) {
            console.log("/start chatId " + chatId);
            sendTelegramMessage(chatId,
                "*Welcome to Intergram* \n" +
                "Your unique chat id is `" + chatId + "`\n" +
                "Use it to link between the embedded chat and this telegram chat",
                "Markdown");
        } else if (reply) {
            let replyText = reply.text || "";
            let userId = replyText.split(':')[0];
            io.to(userId).emit(chatId + "-" + userId, {name, text, from: 'admin'});
        } else if (text){
            io.emit(chatId, {name, text, from: 'admin'});
        }

    } catch (e) {
        console.error("hook error", e, req.body);
    }
    res.statusCode = 200;
    res.end();
});

// handle chat visitors websocket messages
io.on('connection', function(socket){

    socket.on('register', function(registerMsg){
        let userId = registerMsg.userId;
        let chatId = registerMsg.chatId;
        let messageReceived = false;
        socket.join(userId);
        console.log("userId " + userId + " connected to chatId " + chatId);

        socket.on('message', function(msg) {
            messageReceived = true;
            io.to(userId).emit(chatId + "-" + userId, msg);
            let visitorName = msg.visitorName ? "[" + msg.visitorName + "]: " : "";
            sendTelegramMessage(chatId, userId + ":" + visitorName + " " + msg.text);
        });

        socket.on('disconnect', function(){
            if (messageReceived) {
                sendTelegramMessage(chatId, userId + " has left");
            }
        });
    });

});

async function sendTelegramMessage(chatId, text, parseMode) {
    if (!process.env.TELEGRAM_TOKEN) {
        console.error("TELEGRAM_TOKEN is not set");
        return;
    }
    try {
        await axios.post('https://api.telegram.org/bot' + process.env.TELEGRAM_TOKEN + '/sendMessage', {
            chat_id: chatId,
            text: text,
            parse_mode: parseMode
        });
    } catch (err) {
        console.error("Telegram send error:", err.response ? err.response.data : err.message);
    }
}

app.post('/usage-start', cors(), function(req, res) {
    console.log('usage from', req.query.host);
    res.statusCode = 200;
    res.end();
});

app.post('/usage-end', cors(), function(req, res) {
    res.statusCode = 200;
    res.end();
});

app.get("/.well-known/acme-challenge/:content", (req, res) => {
    res.send(process.env.CERTBOT_RESPONSE);
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, function(){
    console.log('listening on port:' + PORT);
});
