# Stage 1: Build frontend
FROM node:20-alpine as frontend-builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Build the frontend application
RUN npm run build

# Stage 2: Setup backend and serve frontend
FROM node:20-alpine

WORKDIR /app

# Copy package files for backend
COPY package*.json ./
COPY server.js ./

# Install only production dependencies
RUN npm install --production

# Copy built frontend from previous stage
COPY --from=frontend-builder /app/dist ./dist

# Expose ports for both frontend and backend
EXPOSE 3000
EXPOSE 3001

# Start both services
CMD ["sh", "-c", "node server.js & npx serve -s dist -p 3000"]