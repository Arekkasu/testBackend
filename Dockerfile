# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files and install production dependencies only
COPY package*.json ./
RUN npm install --only=production

# Copy built application from builder stage
COPY --from=builder /app/index.js ./

# Expose the port the app runs on
EXPOSE 5000

# Command to run the application
CMD ["node", "index.js"] 