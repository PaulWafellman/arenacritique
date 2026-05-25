# 1. Étape de build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# 2. Étape d'exécution (Production-ready)
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# On récupère les dépendances de production et le dossier de build de Next.js
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next

# Si vous avez des fichiers statiques dans un dossier public, décommentez la ligne suivante :
# COPY --from=builder /app/public ./public

EXPOSE 3000
ENV PORT=3000

# On lance le serveur Next.js de production
CMD ["npm", "run", "start"]