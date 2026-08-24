# ─── Stage 1: Build Astro ───
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ─── Stage 2: Serve con Nginx ───
FROM nginx:stable-alpine

# Certbot per auto-rinnovo SSL (opzionale, commentare se non serve)
RUN apk add --no-cache certbot certbot-nginx

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]