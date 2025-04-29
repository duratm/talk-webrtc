# Polycloud - WebRTC Implementation Showcase

Polycloud is a project designed to demonstrate the progressive implementation of WebRTC technology for video conferencing applications. It serves as a learning resource and code repository for a talk about WebRTC, showing different approaches to building real-time communication applications.

## Project Overview

This project demonstrates three different implementation approaches for a video conferencing application:

1. **WebSocket Implementation**: A simple approach where audio and video are captured, chunked, and transmitted through WebSockets. The backend forwards these chunks to other participants.

2. **Rust SFU Server**: An implementation using a Rust-based Selective Forwarding Unit (SFU) server with integrated TURN capabilities for more efficient media routing.

3. **Elixir SFU with STUNner Gateway**: An implementation using an Elixir SFU server behind a STUNner gateway, demonstrating a more scalable architecture.

The frontend has corresponding implementations to interact with each of these backends.

## Project Structure

The repository is organized into the following directories:

- `backend-websocket/` - WebSocket-based implementation
- `backend-rust-sfu/` - Rust SFU server implementation
- `backend-elixir-sfu/` - Elixir SFU server implementation
- `frontend/` - Frontend implementations for each backend approach

## Getting Started

### WebSocket Implementation

1. Navigate to the WebSocket backend directory:
   ```bash
   cd backend-websocket
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

For more detailed instructions, see the [WebSocket Backend README](./backend-websocket/README.md).

### Rust SFU Server

Coming soon...

### Elixir SFU with STUNner Gateway

Coming soon...

## Development Guidelines

For detailed development guidelines, build instructions, testing information, and more, please refer to the [Guidelines Document](./.junie/guidelines.md).

## Future Plans

Future development plans include:
- Using Elixir for signaling and real-time user information
- Integrating a Rust-based SFU server for media handling
- Enhancing the frontend with more features and better UI

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).