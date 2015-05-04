#! /bin/bash
export HOME=/root
apt-get update
curl -sL https://deb.nodesource.com/setup | sudo bash -
apt-get install -y git nodejs libwww-perl build-essential
git clone https://github.com/zzo/sivart
cd sivart
npm install
echo __DONE__
