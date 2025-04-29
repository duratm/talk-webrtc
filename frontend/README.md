# Polycloud Frontend

This directory contains the frontend implementations for the Polycloud video conferencing application. The frontend is designed to work with all three backend implementations, demonstrating different approaches to WebRTC integration.

## Frontend Implementations

The frontend will have three different implementations corresponding to each backend approach:

1. **WebSocket Implementation**: A simple implementation that captures media, chunks it, and sends it through WebSockets.

2. **Rust SFU Client**: An implementation that establishes WebRTC peer connections with the Rust SFU server.

3. **Elixir SFU with STUNner Client**: An implementation that works with the Elixir SFU server and STUNner Gateway.

## Implementation Status

- WebSocket Implementation: ✅ Available
- Rust SFU Client: 🚧 Coming Soon
- Elixir SFU with STUNner Client: 🚧 Coming Soon

## Prerequisites

- Modern web browser with WebRTC support (Chrome, Firefox, Safari, Edge)
- Node.js and npm (for development)

## Getting Started

### WebSocket Implementation

The WebSocket implementation is already available in the `backend-websocket/public` directory. To use it:

1. Start the WebSocket backend server:
   ```bash
   cd ../backend-websocket
   npm install
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000`

### Other Implementations

Instructions for the Rust SFU and Elixir SFU client implementations will be provided once they are available.

## Development

To develop the frontend:

1. Clone the repository
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
3. Install dependencies (once package.json is available):
   ```bash
   npm install
   ```
4. Start the development server (once implemented):
   ```bash
   npm run dev
   ```

## Technologies Used

- HTML5, CSS3, JavaScript
- WebRTC API
- MediaStream API
- WebSocket API
- (Additional frameworks/libraries will be listed as they are implemented)

## Browser Compatibility

The application is designed to work with modern browsers that support WebRTC:
- Chrome 55+
- Firefox 52+
- Safari 11+
- Edge 79+