FROM node:22-alpine

WORKDIR /app

COPY backend/package*.json ./backend/

WORKDIR /app/backend

RUN npm ci --omit=dev

WORKDIR /app

COPY backend/src ./backend/src
COPY frontend ./frontend

EXPOSE 5000

CMD ["node", "backend/src/server.js"]
