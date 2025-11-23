# Step 1: Build Angular app
FROM node:14 AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Step 2: Serve using Node.js (Railway-friendly)
FROM node:14-alpine
WORKDIR /app

# Copy built files
COPY --from=build /app/dist/hospitalUI ./dist
COPY --from=build /app/package*.json ./
COPY --from=build /app/server.js ./

# Install only production dependencies
RUN npm ci --only=production

# Expose port (Railway will set PORT env variable)
ENV PORT=3000
EXPOSE $PORT

CMD ["node", "server.js"]
