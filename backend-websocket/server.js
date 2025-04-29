const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

// Configuration
const PORT = process.env.PORT || 3000;

// Initialize Express app and HTTP server
const app = express();
const server = http.createServer(app);

// Serve static files if needed
app.use(express.static(path.join(__dirname, 'public')));

// Initialize WebSocket server
const wss = new WebSocket.Server({ server });

// Store connected clients
const clients = new Map();

// Handle WebSocket connections
wss.on('connection', (ws) => {
  const clientId = uuidv4();
  console.log(`Client connected: ${clientId}`);

  // Store client connection
  clients.set(clientId, {
    id: clientId,
    ws: ws,
    joinedAt: new Date()
  });

  // Send client their ID
  ws.send(JSON.stringify({
    type: 'connection',
    clientId: clientId,
    message: 'Connected to WebSocket server'
  }));

  // Notify all clients about the new connection
  broadcastClientList();

  // Handle incoming messages
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);

      // Handle different message types
      switch (data.type) {
        case 'media-chunk':
          // Forward media chunk to the target client(s)
          handleMediaChunk(clientId, data);
          break;
        case 'join-room':
          // Handle room joining logic
          handleJoinRoom(clientId, data);
          break;
        case 'ping':
          // Handle ping message (for testing connectivity)
          handlePing(clientId, data);
          break;
        case 'heartbeat':
          // Handle heartbeat message (for connection health check)
          // Just log at debug level and don't respond to avoid unnecessary traffic
          // console.log(`Received heartbeat from ${clientId}`);
          break;
        default:
          console.log(`Received unknown message type from ${clientId}:`, data.type);
      }
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });

  // Handle client disconnection
  ws.on('close', () => {
    console.log(`Client disconnected: ${clientId}`);
    clients.delete(clientId);
    broadcastClientList();
  });
});

// Function to broadcast the list of connected clients to all clients
function broadcastClientList() {
  const clientList = Array.from(clients.values()).map(client => ({
    id: client.id,
    joinedAt: client.joinedAt,
    roomId: client.roomId || null  // Include roomId in the client list
  }));

  const message = JSON.stringify({
    type: 'client-list',
    clients: clientList
  });

  broadcast(message);
}

// Function to handle media chunks
function handleMediaChunk(senderId, data) {
  console.log(`Received media chunk from client ${senderId}, chunk size: ${data.chunk ? data.chunk.length : 0} bytes`);

  // Get the sender's client object to determine their room
  const senderClient = clients.get(senderId);
  if (!senderClient) {
    console.log(`Sender client ${senderId} not found`);
    return;
  }

  // If targetId is specified, send only to that client
  if (data.targetId) {
    const targetClient = clients.get(data.targetId);
    if (targetClient && targetClient.ws.readyState === WebSocket.OPEN) {
      console.log(`Sending media chunk from ${senderId} to target ${data.targetId}`);
      targetClient.ws.send(JSON.stringify({
        type: 'media-chunk',
        senderId: senderId,
        mediaType: data.mediaType, // 'audio' or 'video'
        chunk: data.chunk,
        timestamp: data.timestamp
      }));
    } else {
      console.log(`Target client ${data.targetId} not found or not connected`);
    }
  } else if (senderClient.roomId) {
    // If sender is in a room, broadcast to all clients in the same room
    console.log(`Broadcasting media chunk from ${senderId} to room ${senderClient.roomId}`);

    let recipientCount = 0;
    for (const [id, client] of clients.entries()) {
      if (id !== senderId && 
          client.roomId === senderClient.roomId && 
          client.ws.readyState === WebSocket.OPEN) {
        console.log(`Sending media chunk to client ${id} in room ${senderClient.roomId}`);
        client.ws.send(JSON.stringify({
          type: 'media-chunk',
          senderId: senderId,
          mediaType: data.mediaType,
          chunk: data.chunk,
          timestamp: data.timestamp
        }));
        recipientCount++;
      }
    }
    console.log(`Media chunk sent to ${recipientCount} clients in room ${senderClient.roomId}`);

    if (recipientCount === 0) {
      console.log(`No other clients in room ${senderClient.roomId} to receive media chunk`);
    }
  } else {
    // If sender is not in a room, broadcast to all clients except sender
    console.log(`Broadcasting media chunk from ${senderId} to all clients (no room)`);

    let recipientCount = 0;
    for (const [id, client] of clients.entries()) {
      if (id !== senderId && client.ws.readyState === WebSocket.OPEN) {
        console.log(`Sending media chunk to client ${id} (no room)`);
        client.ws.send(JSON.stringify({
          type: 'media-chunk',
          senderId: senderId,
          mediaType: data.mediaType,
          chunk: data.chunk,
          timestamp: data.timestamp
        }));
        recipientCount++;
      }
    }
    console.log(`Media chunk sent to ${recipientCount} clients (no room)`);

    if (recipientCount === 0) {
      console.log(`No other clients connected to receive media chunk`);
    }
  }
}

// Function to handle room joining
function handleJoinRoom(clientId, data) {
  const client = clients.get(clientId);
  if (client) {
    client.roomId = data.roomId;

    // Notify client they've joined the room
    client.ws.send(JSON.stringify({
      type: 'room-joined',
      roomId: data.roomId
    }));

    // Notify other clients in the same room
    for (const [id, otherClient] of clients.entries()) {
      if (id !== clientId && otherClient.roomId === data.roomId && otherClient.ws.readyState === WebSocket.OPEN) {
        otherClient.ws.send(JSON.stringify({
          type: 'client-joined',
          clientId: clientId
        }));
      }
    }
  }
}

// Function to handle ping messages (for testing connectivity)
function handlePing(senderId, data) {
  console.log(`Received ping from client ${senderId}, message: ${data.message || 'No message'}`);

  const senderClient = clients.get(senderId);
  if (!senderClient) {
    console.log(`Sender client ${senderId} not found`);
    return;
  }

  // Send pong response back to sender
  senderClient.ws.send(JSON.stringify({
    type: 'pong',
    message: `Server received your ping: ${data.message || 'No message'}`,
    timestamp: Date.now()
  }));

  // If targetId is specified, forward ping to that client
  if (data.targetId) {
    const targetClient = clients.get(data.targetId);
    if (targetClient && targetClient.ws.readyState === WebSocket.OPEN) {
      console.log(`Forwarding ping from ${senderId} to target ${data.targetId}`);
      targetClient.ws.send(JSON.stringify({
        type: 'ping',
        senderId: senderId,
        message: data.message,
        timestamp: data.timestamp
      }));
    } else {
      console.log(`Target client ${data.targetId} not found or not connected`);
      // Notify sender that target is not available
      senderClient.ws.send(JSON.stringify({
        type: 'ping-error',
        targetId: data.targetId,
        message: 'Target client not found or not connected',
        timestamp: Date.now()
      }));
    }
  } else if (senderClient.roomId) {
    // If sender is in a room, forward ping to all clients in the same room
    console.log(`Broadcasting ping from ${senderId} to room ${senderClient.roomId}`);

    let recipientCount = 0;
    for (const [id, client] of clients.entries()) {
      if (id !== senderId && 
          client.roomId === senderClient.roomId && 
          client.ws.readyState === WebSocket.OPEN) {
        console.log(`Forwarding ping to client ${id} in room ${senderClient.roomId}`);
        client.ws.send(JSON.stringify({
          type: 'ping',
          senderId: senderId,
          message: data.message,
          timestamp: data.timestamp
        }));
        recipientCount++;
      }
    }

    console.log(`Ping forwarded to ${recipientCount} clients in room ${senderClient.roomId}`);

    if (recipientCount === 0) {
      console.log(`No other clients in room ${senderClient.roomId} to receive ping`);
      // Notify sender that no other clients are in the room
      senderClient.ws.send(JSON.stringify({
        type: 'ping-info',
        message: 'No other clients in the room to receive ping',
        timestamp: Date.now()
      }));
    }
  }
}

// Function to broadcast a message to all connected clients
function broadcast(message) {
  for (const client of clients.values()) {
    if (client.ws.readyState === WebSocket.OPEN) {
      client.ws.send(message);
    }
  }
}

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
