#!/bin/sh
# Start the Node.js backend
node resource.ts &

# Hand over to nginx (runs in foreground)
exec nginx -g 'daemon off;'
