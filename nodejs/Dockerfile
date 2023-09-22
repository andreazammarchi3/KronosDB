# Use Ubuntu focal as a base image
FROM ubuntu:focal

# Set up working directories for backend and frontend
ENV BACKEND_WORKDIR=/root/backend
ENV FRONTEND_WORKDIR=/root/frontend

# Install common dependencies and set up keys
RUN apt-get update && apt-get install -y ca-certificates curl gnupg && \
    mkdir -p /etc/apt/keyrings && \
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg

# Install Node.js and npm for both backend and frontend
RUN NODE_MAJOR=18 && \
    echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list && \
    apt-get update && \
    apt-get install -y --no-install-recommends nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install npm globally
RUN npm install -g npm@latest

# Backend setup
WORKDIR ${BACKEND_WORKDIR}
COPY ./backend ${BACKEND_WORKDIR}
RUN npm install
EXPOSE 3000
CMD npm start

# Frontend setup
WORKDIR ${FRONTEND_WORKDIR}
COPY ./frontend ${FRONTEND_WORKDIR}
RUN npm install
EXPOSE 5173
CMD npm run dev
