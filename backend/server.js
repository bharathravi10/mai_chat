const express = require('express');
const { WebSocketServer } = require('ws');

const app = express();
const PORT = 4000;

const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {

    // Handle incoming messages
    ws.on('message', (message) => {
        const data = message.toString(); // Convert Buffer to string
        console.log(`Received: ${data}`);

        try {
            const parsedMessage = JSON.parse(data);

            // Broadcast message to all connected clients
            wss.clients.forEach((client) => {
                if (client.readyState === ws.OPEN) {
                    client.send(JSON.stringify(parsedMessage));
                }
            });
        } catch (error) {
            console.error(`Error parsing message: ${error.message}`);
        }
    });

    // Handle client disconnect
    ws.on('close', () => {
        console.log('Client disconnected');
    });

    // Handle errors
    ws.on('error', (error) => {
        console.error(`WebSocket error: ${error.message}`);
    });
});
