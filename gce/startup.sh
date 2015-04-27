#! /bin/bash
apt-get update
curl -sL https://deb.nodesource.com/setup | sudo bash -
apt-get install -y git npm libwww-perl build-essential
git clone https://github.com/zzo/sivart
cd sivart
npm install
nodejs server.js 80
