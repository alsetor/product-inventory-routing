# product-frontend/Dockerfile (recommended)
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# copy package files and install deps
COPY product-frontend/package*.json ./ 
# If you use yarn: COPY product-frontend/yarn.lock ./
RUN npm ci

# copy the rest of the app
COPY product-frontend/ ./

# build the Next app
ENV NODE_ENV=production
RUN npm run build

# Production image
FROM node:18-alpine AS runner
WORKDIR /app

# copy minimal runtime files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY product-frontend/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

# Start using next start
CMD ["npm", "run", "start"]
