#! /bin/bash
apt-get update
apt-get install -y git npm libwww-perl
git clone https://github.com/zzo/sivart
cd sivart
npm install
nodejs server.js 80
