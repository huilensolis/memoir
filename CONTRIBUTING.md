# Contributing

## clone the repo

```bash
git clone https://github.com/Huilensolis/memoir --depth=1
```

## create a .env file inside each app folder, and fill it, following the examples provided on the files env.example in each folder

## install turborrepo

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

## install packages

```bash
pnpm i
```

## start the development server (for both: the client and api)

the command turbo <command> works as a npm script executer. It executes the scripts on both the api and client. To declare a turbo script, you can edit the turbo.json file, on the "pipeline" section.
for more information, see https://turbo.build/repo/docs

```bash
turbo dev
```

## run linting

```bash
turbo lint
```

## run build

```bash
turbo build
```

## run tests

```bash
turbo test
```
