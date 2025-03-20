import { WebSocketServer } from 'ws';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const historyFilePath = path.join(__dirname, 'chatHistory.json');

let chatHistory = [];
try {
    if (fs.existsSync(historyFilePath)) {
        const data = fs.readFileSync(historyFilePath, 'utf-8');
        chatHistory = JSON.parse(data);
    }
} catch (error) {
    console.error('Error loading chat history:', error);
}

const saveChatHistory = () => {
    fs.writeFileSync(historyFilePath, JSON.stringify(chatHistory, null, 2));
};

const wss = new WebSocketServer({ port: 4000 });

wss.on('connection', (ws) => {
    // Send chat history to new client
    ws.send(JSON.stringify({ type: 'history', history: chatHistory }));

    ws.on('message', (data) => {
        try {
            const message = JSON.parse(data.toString());

            if (message.type === 'message') {
                const newMessage = {
                    user: message.user,
                    text: message.text,
                    timestamp: new Date().toLocaleTimeString(),
                };

                // Store the message in history and save to file
                chatHistory.push(newMessage);
                saveChatHistory();

                // Broadcast message to all connected clients
                wss.clients.forEach((client) => {
                    if (client.readyState === ws.OPEN) {
                        client.send(JSON.stringify({ type: 'message', ...newMessage }));
                    }
                });
            }

            if (message.type === 'typing') {
                wss.clients.forEach((client) => {
                    if (client !== ws && client.readyState === ws.OPEN) {
                        client.send(JSON.stringify({ type: 'typing', user: message.user }));
                    }
                });
            }
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    });
});
