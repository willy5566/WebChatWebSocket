const express = require('express');
const http = require('http');
const ServerSocket = require('ws').Server;

const PORT = 3000;
const IP = '10.10.60.148';

const app  = express();
const server = http.createServer(app);

app.use(express.static('client'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html');
});

server.listen(PORT, IP, () => {
    console.log(`[Server] Listening on http://${IP}:${PORT}`);
});

const wss = new ServerSocket({ server });

wss.on('connection', (ws, req) => {
    console.log(req.headers);
    ws.id = req.headers['sec-websocket-key'].substring(0, 8);
    ws.send(`[Client ${ws.id} is connected!]`);

    // Listen for message from client
    ws.on('message', data => {
        console.log('[Message from client]: ', data);
        // Get clients who connected
        let clients = wss.clients;
        // Use loop for sending message to each client
        clients.forEach(client => {
            client.send(`${ws.id}: ` + data);
        })
        //ws.send('[Get message from server]');
    });

    ws.on('close', () => {
        console.log('Close connected');
    });
});