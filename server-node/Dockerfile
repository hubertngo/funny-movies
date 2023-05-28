FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock package-lock.json ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  else echo "Lockfile not found." && exit 1; \
  fi

COPY . .

CMD ["yarn","start"]
