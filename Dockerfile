FROM node:10

# Install Chrome

RUN echo 'deb http://dl.google.com/linux/chrome/deb/ stable main' > /etc/apt/sources.list.d/chrome.list

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -

RUN set -x \
    && apt-get update \
    && apt-get install -y \
        google-chrome-stable

ENV CHROME_BIN /usr/bin/google-chrome

# Log versions

RUN set -x \
    && node -v \
    && npm -v \
    && google-chrome --version 


RUN npm i -g npm@6.14.5

WORKDIR /ltzcore

# Add source
COPY lerna.json ./
COPY package*.json ./

COPY  ./packages/ltzcore-client/package.json ./packages/ltzcore-client/package.json
COPY  ./packages/ltzcore-client/package-lock.json ./packages/ltzcore-client/package-lock.json

COPY  ./packages/ltzcore-build/package.json ./packages/ltzcore-build/package.json
COPY  ./packages/ltzcore-build/package-lock.json ./packages/ltzcore-build/package-lock.json

COPY  ./packages/ltzcore-lib-cash/package.json ./packages/ltzcore-lib-cash/package.json
COPY  ./packages/ltzcore-lib-cash/package-lock.json ./packages/ltzcore-lib-cash/package-lock.json

COPY  ./packages/ltzcore-lib/package.json ./packages/ltzcore-lib/package.json
COPY  ./packages/ltzcore-lib/package-lock.json ./packages/ltzcore-lib/package-lock.json

COPY  ./packages/ltzcore-mnemonic/package.json ./packages/ltzcore-mnemonic/package.json
COPY  ./packages/ltzcore-mnemonic/package-lock.json ./packages/ltzcore-mnemonic/package-lock.json

COPY  ./packages/ltzcore-node/package.json ./packages/ltzcore-node/package.json
COPY  ./packages/ltzcore-node/package-lock.json ./packages/ltzcore-node/package-lock.json

COPY  ./packages/ltzcore-p2p-cash/package.json ./packages/ltzcore-p2p-cash/package.json
COPY  ./packages/ltzcore-p2p-cash/package-lock.json ./packages/ltzcore-p2p-cash/package-lock.json

COPY  ./packages/ltzcore-p2p/package.json ./packages/ltzcore-p2p/package.json
COPY  ./packages/ltzcore-p2p/package-lock.json ./packages/ltzcore-p2p/package-lock.json

COPY  ./packages/ltzcore-wallet-client/package.json ./packages/ltzcore-wallet-client/package.json
COPY  ./packages/ltzcore-wallet-client/package-lock.json ./packages/ltzcore-wallet-client/package-lock.json

COPY  ./packages/ltzcore-wallet-service/package.json ./packages/ltzcore-wallet-service/package.json
COPY  ./packages/ltzcore-wallet-service/package-lock.json ./packages/ltzcore-wallet-service/package-lock.json

COPY  ./packages/ltzcore-wallet/package.json ./packages/ltzcore-wallet/package.json
COPY  ./packages/ltzcore-wallet/package-lock.json ./packages/ltzcore-wallet/package-lock.json

COPY  ./packages/insight/package.json ./packages/insight/package.json
COPY  ./packages/insight/package-lock.json ./packages/insight/package-lock.json

COPY  ./packages/crypto-wallet-core/package.json ./packages/crypto-wallet-core/package.json
COPY  ./packages/crypto-wallet-core/package-lock.json ./packages/crypto-wallet-core/package-lock.json


RUN npm install
RUN npm run bootstrap
ADD . .
RUN npm run compile
