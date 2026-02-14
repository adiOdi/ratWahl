# ------------------------------------------------------------
# 1️⃣ Build stage – Angular front‑end
# ------------------------------------------------------------
FROM node:20-alpine AS frontend-build

# Set working directory for the front‑end
WORKDIR /app/frontend

# Install Angular CLI (optional – you can also rely on a local version)
RUN npm install -g @angular/cli

# Copy only package files first (caches npm install layer)
COPY frontend/package*.json ./
RUN npm ci               # clean install of exact versions

# Copy the rest of the front‑end source code
COPY frontend/ ./

# Build the production bundle
RUN ng build --configuration production \
    && cp -r dist/* /dist   # move built files to a known location


# ------------------------------------------------------------
# 2️⃣ Build stage – Node.js back‑end
# ------------------------------------------------------------
FROM node:20-alpine AS backend-build

# Set working directory for the back‑end
WORKDIR /app/backend

# Copy only package files first (caches npm install layer)
COPY backend/package*.json ./
RUN npm ci               # install back‑end deps

# Copy the rest of the back‑end source code
COPY backend/ ./

# If you transpile (e.g., TypeScript → JavaScript), do it here
# RUN npm run build      # uncomment if you have a build script


# ------------------------------------------------------------
# 3️⃣ Runtime stage – combine front‑end + back‑end
# ------------------------------------------------------------
# Use a lightweight image that can serve static files and run Node
FROM nginx:alpine AS runtime

# ---- Serve Angular static files via Nginx ----
# Remove default config and copy a minimal one
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/

# Copy the built Angular assets into Nginx’s html folder
COPY --from=frontend-build /dist/ /usr/share/nginx/html/

# ---- Run the Node.js API alongside Nginx ----
# Create a non‑root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Copy the back‑end code (and its node_modules) into the image
COPY --from=backend-build /app/backend /srv/app

WORKDIR /srv/app

# Expose ports
EXPOSE 80   # Nginx (front‑end)
EXPOSE 3000 # Node.js API (adjust if your API uses a different port)

# Start both processes with a tiny init system (tini) or a process manager.
# Here we use `tini` (already present in the nginx image) to launch a simple script.
# Create a start script:
#   └─ /srv/app/start.sh
#   #!/bin/sh
#   # Start the API in background
#   node index.js &
#   # Then hand over to nginx (foreground)
#   exec nginx -g 'daemon off;'
#
# Make sure the script is executable:
#   RUN chmod +x /srv/app/start.sh
#
# Finally set the entrypoint:
ENTRYPOINT ["/sbin/tini", "--", "/srv/app/start.sh"]
