FROM node:current-alpine
ENV NODE_ENV=production
WORKDIR /app
RUN apk add --no-cache make libtool autoconf automake g++ python3 ffmpeg
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --omit=dev
COPY . .
CMD ["node", "."]
