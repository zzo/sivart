#! /bin/bash
apt-get update
apt-get install -y git npm
git clone https://github.com/zzo/sivart
cd sivart
npm install
nodejs index.js
