const express = require('express');
const cors = require('cors');
const compression = require('compression');
const http = require('http');
const axios = require('axios');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Import Hexagonal DI Container
const { createContainer } = require('./src/infrastructure/config/container');
const container = createContainer(io);

app.use(compression());
app.use(express.static('dist', {
    index: 'demo.html',
    maxAge: 0,
    setHeaders: (res) => {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Primary HTTP Adapter: Telegram Webhook Route
app.post('/hook', async (req, res) => {
    try {
        await container.processAdminReplyUseCase.execute({ telegramUpdate: req.body });
    } catch (e) {
        console.error("[HTTP Adapter] Hook processing error:", e);
    }
    res.status(200).end();
});

// Primary WebSocket Adapter: Chat Visitor Events
io.on('connection', (socket) => {
    socket.on('register', (registerMsg) => {
        const userId = registerMsg.userId;
        const chatId = registerMsg.chatId;
        let messageReceived = false;

        socket.join(userId);
        console.log(`[SocketAdapter] User ${userId} registered on chat ${chatId}`);

        socket.on('message', async (msg) => {
            messageReceived = true;
            await container.sendVisitorMessageUseCase.execute({
                chatId,
                userId,
                text: msg.text,
                visitorName: msg.visitorName
            });
        });

        socket.on('disconnect', () => {
            if (messageReceived && container.telegramAdapter) {
                container.telegramAdapter.sendMessage(chatId, `${userId} has left`);
            }
        });
    });
});

app.post('/usage-start', cors(), (req, res) => {
    console.log('[HTTP Adapter] Usage start from:', req.query.host);
    res.status(200).end();
});

app.post('/usage-end', cors(), (req, res) => {
    res.status(200).end();
});

app.get("/.well-known/acme-challenge/:content", (req, res) => {
    res.send(process.env.CERTBOT_RESPONSE);
});

const requestedPort = process.env.RANDOM_PORT === 'true' || process.env.PORT === '0' ? 0 : (process.env.PORT || 3000);
server.listen(requestedPort, async () => {
    const actualPort = server.address().port;
    console.log(`[Hexagonal Server] Listening on port: ${actualPort}`);

    const token = process.env.TELEGRAM_TOKEN;
    const webhookUrl = process.env.WEBHOOK_URL;
    if (token && webhookUrl) {
        try {
            await axios.get(`https://api.telegram.org/bot${token}/setWebhook?url=${webhookUrl}`);
            console.log(`[Telegram Bot] Webhook successfully registered for ${webhookUrl}`);
        } catch (e) {
            console.error(`[Telegram Bot] Webhook registration failed:`, e.message);
        }
    }
});
