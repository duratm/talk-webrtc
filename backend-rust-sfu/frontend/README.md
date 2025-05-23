# WebSocket Backend for Polycloud

This is the WebSocket-based implementation of the Polycloud video conferencing application. It uses a simple approach where audio and video are captured, chunked, and transmitted through WebSockets, with the backend forwarding these chunks to other participants.

## Prerequisites

- Node.js (v14 or higher)
- npm

## Installation

1. Clone the repository
2. Navigate to the WebSocket backend directory:
   ```bash
   cd backend-websocket
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

1. Start the server:
   ```bash
   npm start
   ```
   
   For development with auto-reload:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000`

## How It Works

1. The server uses Express and the 'ws' library to create a WebSocket server
2. Clients connect to the server and receive a unique ID
3. Clients can join rooms to group participants
4. When a client captures media (audio/video), it's chunked and sent to the server
5. The server forwards these chunks to other clients in the same room
6. The receiving clients decode and display the media

## Testing

Run the tests with:
```bash
npm test
```

## Project Structure

- `server.js` - Main server file with WebSocket implementation
- `public/` - Static files served by Express
  - `index.html` - Client-side implementation with UI and WebSocket client
- `package.json` - Project configuration and dependencies