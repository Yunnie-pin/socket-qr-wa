const { Client } = require('whatsapp-web.js');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Inisialisasi WhatsApp Client
const client = new Client();

// Saat QR Code dihasilkan
client.on('qr', (qr) => {
    console.log('QR Code Diterima', qr);

    // Kirim QR code secara real-time ke klien melalui WebSocket
    io.emit('qr', qr);
});

// Saat WhatsApp Client sudah terhubung
client.on('ready', () => {
    console.log('WhatsApp Client siap!');
});

// Mulai WhatsApp Client
client.initialize();

// Route dasar
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
    
});

// Koneksi WebSocket
io.on('connection', (socket) => {
    console.log('Klien terhubung');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});