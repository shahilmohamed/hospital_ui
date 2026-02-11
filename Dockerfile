# Build stage
FROM node:24-alpine AS build

# Update CA certificates to fix SSL/TLS issues with Google Fonts
RUN apk update && apk add --no-cache ca-certificates && update-ca-certificates

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build -- --configuration production

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist/hospitalUI/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
