# product-frontend/Dockerfile (recommended)
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# copy package files and install deps
COPY package*.json ./ 
RUN npm ci

# copy the rest of the app
COPY . ./

# build the Next app
ENV NODE_ENV=production
ENV NEXT_PUBLIC_API_URL=http://localhost:30045
RUN npm run build

# Production image
FROM node:18-alpine AS runner
WORKDIR /app

# copy minimal runtime files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY package*.json ./
COPY --from=builder /app/node_modules ./node_modules

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

# Start using next start
CMD ["npm", "run", "start"]
