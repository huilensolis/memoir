# Contributing

## getting started
### clone the repo

```bash
git clone https://github.com/Huilensolis/memoir --depth=1
```

### create a .env file inside `/apps/client` and `/apps/api`, and fill it, following the examples provided in `/apps/client/env.example` and `/apps/api/env.example`

### install turbo repo

pnpm:

```bash
pnpm add turbo --global
```

npm:

```bash
npm install turbo --global
```

yarn:

```bash
yarn global add turbo
```

### install packages

```bash
pnpm i
```

### start the development server (for both: the client and api)

The command turbo <command> works as a npm script executer. It executes the scripts decalred on both the api and client package.json.
For more information, see https://turbo.build/repo/docs

```bash
turbo dev
```

### run linting

```bash
turbo lint
```

### run build

```bash
turbo build
```

### run tests

```bash
turbo test
```
