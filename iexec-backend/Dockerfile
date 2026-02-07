FROM node:18-alpine

WORKDIR /app

COPY package.json bun.lock ./
RUN npm install -g bun && bun install --production

COPY src ./src

# iExec default entrypoint
ENTRYPOINT ["bun", "run", "src/trade.js"]
