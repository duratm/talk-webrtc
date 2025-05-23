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