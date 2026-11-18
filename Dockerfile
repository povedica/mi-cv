FROM node:22-bookworm-slim

ENV ASTRO_TELEMETRY_DISABLED=1
WORKDIR /app
RUN chown node:node /app
USER node

COPY --chown=node:node package.json package-lock.json ./
RUN npm ci

COPY --chown=node:node astro.config.mjs tsconfig.json ./
COPY --chown=node:node src/ ./src/
COPY --chown=node:node public/ ./public/
COPY --chown=node:node tests/ ./tests/
COPY --chown=node:node knowledge/publication.mjs ./knowledge/publication.mjs

EXPOSE 4321
CMD ["npm", "run", "dev"]
