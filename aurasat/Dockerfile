# syntax=docker/dockerfile:1.6

# Build stage
FROM node:20-bullseye as build
WORKDIR /app
COPY package.json package-lock.json* .npmrc* ./ 2>/dev/null || :
COPY backend/package.json backend/package.json
COPY frontend/package.json frontend/package.json
RUN npm ci --silent
COPY . .
RUN npm run build

# Runtime stage
FROM node:20-bullseye
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /app/package*.json ./
COPY --from=build /app/backend/package*.json ./backend/
COPY --from=build /app/frontend/package*.json ./frontend/
RUN npm ci --omit=dev --silent && npm i -w backend --omit=dev --silent && npm i -w frontend --omit=dev --silent
COPY --from=build /app/backend/dist ./backend/dist
COPY --from=build /app/frontend/dist ./frontend/dist
ENV PORT=4000
ENV SERVE_STATIC=true
ENV FRONTEND_ORIGIN=http://localhost:4000
CMD ["node", "backend/dist/index.js"]
EXPOSE 4000