ARG RUST_VERSION=1.77
FROM rust:${RUST_VERSION}-buster AS build
WORKDIR /opt/beep-rtc

COPY Cargo.toml .
COPY Cargo.lock .

COPY src src
RUN cargo build --release && \
    cp ./target/release/beep-sfu /bin/server

FROM debian:bullseye-slim AS final

# See https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#user
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "1000" \
    appuser
USER appuser

# Copy the executable from the "build" stage.
COPY --from=build /bin/server /bin/

# Expose the TCP port the signal server will listen on
EXPOSE 8080
# Expose the UDP ports the media server will listen on
EXPOSE 33436/udp

# What the container should run when it is started.
CMD /bin/server -d --level info -e prod --host 0.0.0.0 --ip-endpoint 162.38.112.223 --media-port-min 33436 --media-port-max 334