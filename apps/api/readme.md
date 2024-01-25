# how to set up the api server, docker and its database.

## first of all, install bun and docker compose

## start postgresql database

```bash
docker compose up -d
```

## generate migration

```bash
bun run generate-migrations
```

## run migrations

```bash
bun run migrate
```

## start development server

```bash
bun run dev
```
