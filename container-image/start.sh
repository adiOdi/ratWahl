#!/bin/sh
# Start the Node.js backend
#node index.js &

# Hand over to nginx (runs in foreground)
exec nginx -g 'daemon off;'
