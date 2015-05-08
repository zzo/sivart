cd /sivart
git pull
HOME=/root npm install
export NODE_ENV=production
nodejs server.js 80
echo __ALIVE__
