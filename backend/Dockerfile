# BS Smart Solution API — production image
FROM node:20-alpine

WORKDIR /app

# Install production deps first (better layer caching)
COPY package*.json ./
COPY prisma ./prisma
RUN npm ci --omit=dev && npx prisma generate

COPY src ./src

ENV NODE_ENV=production
EXPOSE 5000

# Apply committed migrations, then start.
CMD ["sh", "-c", "npx prisma migrate deploy && node src/server.js"]
