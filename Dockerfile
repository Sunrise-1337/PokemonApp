ARG WORKDIR=/opt/app

FROM node:20-alpine AS builder

ARG WORKDIR
WORKDIR ${WORKDIR}

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:20-alpine AS runtime

ARG WORKDIR
WORKDIR ${WORKDIR}

COPY --from=builder ${WORKDIR}/package*.json ./

RUN npm ci --omit=dev

COPY --from=builder ${WORKDIR}/dist ./dist

EXPOSE 4000
CMD ["node", "dist/pokemon-app/server/server.mjs"]