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
# clean install of exact versions
RUN npm ci

# Copy the rest of the front‑end source code
COPY frontend/ ./

# Build the production bundle and move built files to a known location
RUN ng build --configuration production && cp -r dist/*/browser /dist


# ------------------------------------------------------------
# 2️⃣ Build stage – Node.js back‑end
# ------------------------------------------------------------
FROM node:20-alpine AS backend-build

# Set working directory for the back‑end
WORKDIR /app/backend

# Copy only package files first (caches npm install layer)
COPY backend/package*.json ./
# install back‑end deps
RUN npm ci

# Copy the rest of the back‑end source code
COPY backend/ ./

# If you transpile (e.g., TypeScript → JavaScript), do it here
# RUN npm run build      # uncomment if you have a build script


# ------------------------------------------------------------
# 3️⃣ Runtime stage – combine front‑end + back‑end
# ------------------------------------------------------------
# Use a lightweight image that can serve static files and run Node
FROM nginx:alpine AS runtime

RUN apk add --no-cache tini nodejs

# ---- Serve Angular static files via Nginx ----
# Remove default config and copy a minimal one
RUN rm /etc/nginx/conf.d/default.conf
COPY container-image/nginx.conf /etc/nginx/conf.d/

# Copy the built Angular assets into Nginx’s html folder
COPY --from=frontend-build /dist/ /usr/share/nginx/html/

# Copy the back‑end code (and its node_modules) into the image
COPY --from=backend-build /app/backend /srv/app

# Copy the startup script into the image
WORKDIR /srv/app
COPY container-image/start.sh .
RUN chmod +x start.sh

# Expose ports
# Nginx (front‑end)
EXPOSE 80
# Node.js API (adjust if your API uses a different port)
EXPOSE 3000

#ENTRYPOINT ["/tini", "--"]
ENTRYPOINT ["/sbin/tini", "-s", "--"]
CMD ["/srv/app/start.sh"]
