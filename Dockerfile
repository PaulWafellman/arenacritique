# 1. Étape d'installation et de build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 2. Étape d'exécution (légère pour la production)
FROM node:20-alpine AS runner
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
# Si vous avez des dossiers importants comme les migrations drizzle :
COPY --from=builder /app/drizzle ./drizzle 

EXPOSE 3000
CMD ["node", "dist/index.js"]