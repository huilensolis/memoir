# how to set up the api server, docker and its database.

## first of all, install bun and docker, with docker compose plugin

## start postgresql database in docker container

```bash
bun run setup
```

## start development server (this will also run `setup`)

```bash
bun run dev
```

# troubleshooting
```bash
error: Connection terminated unexpectedly
```
this error is usual, but dont worry, its not an issue. it means that the postgres databse is not ready to accept requests yet. just wait until it is ready

---
