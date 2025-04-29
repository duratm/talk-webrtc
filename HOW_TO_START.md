# How to Start the Polycloud WebSocket Implementation

This guide provides step-by-step instructions for starting and using the WebSocket implementation of the Polycloud video conferencing application.

## Prerequisites

- Node.js (v14 or higher)
- npm (usually comes with Node.js)
- A modern web browser with WebRTC support (Chrome, Firefox, Safari, Edge)

## Starting the Server

1. Navigate to the WebSocket backend directory:
   ```bash
   cd backend-websocket
   ```

2. Install dependencies (if you haven't already):
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

   You should see a message indicating that the server is running on port 3000:
   ```
   Server is running on port 3000
   ```

## Accessing the Application

1. Open your web browser and navigate to:
   ```
   http://localhost:3000
   ```

2. You should see the WebSocket WebRTC Demo interface with the following elements:
   - Connection status indicator
   - Control buttons (Connect, Start Media, Stop Media, Join Room)
   - Local and remote video displays
   - Connected clients list

## Using the Application

1. **Connect to the WebSocket server**:
   - Click the "Connect" button to establish a WebSocket connection to the server
   - The connection status should change to "Connected" with your client ID

2. **Start media streaming**:
   - Click the "Start Media" button to request access to your camera and microphone
   - Grant permission when prompted by your browser
   - Your local video should appear in the "Local Video" container

3. **Join a room**:
   - Enter a room ID in the input field
   - Click the "Join Room" button
   - The connection status should update to show your room ID

4. **Interact with other clients**:
   - When other users connect and join the same room, they will appear in the "Connected Clients" list
   - You can select a specific client as a target by clicking the "Select as Target" button
   - Media chunks will be automatically forwarded between clients in the same room

5. **Stop media streaming**:
   - Click the "Stop Media" button to stop sending your video/audio

## Testing with Multiple Clients

To test the application with multiple clients:

1. Open the application in multiple browser windows or tabs
2. Connect each client to the server
3. Start media in each client
4. Join the same room ID in all clients
5. You should see the video from other clients in the "Remote Video" container

## Troubleshooting

- If you can't connect to the server, make sure it's running and listening on port 3000
- If media doesn't start, check that you've granted camera and microphone permissions
- If you don't see other clients, make sure they've joined the same room ID
- Check the browser console (F12) for any error messages

## Next Steps

Once you've successfully tested the WebSocket implementation, you can explore the other planned implementations:

- Rust SFU Server (coming soon)
- Elixir SFU with STUNner Gateway (coming soon)

For more information, refer to the project's [main README](./README.md) and the [guidelines document](./.junie/guidelines.md).