# Build the image (choose a tag you like)
docker build -t my-fullstack-app .

# Run it (exposes both ports; you can map them as you wish)
docker run -d -p 80:80 -p 3000:3000 --name my-app my-fullstack-app
