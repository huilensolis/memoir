# Contributing

## Getting started

### Clone the repo
In this case, we pull the original repository, following a case in which you have permissions over this repository. If it's not the case, create a fork and use the same command from the example below, and replace the repository URL with your fork URL.

```bash
git clone https://github.com/Huilensolis/memoir --depth=1
```

### set up environment variables
1. Create a `.env.local` file inside `/packages/client`, and write the variables. The list of necessary variables are listed in `packages/client/env.example`

```bash
cd packages/client # move to the client folder
touch .env.local # create a .env.local file

cp .env.example .env.local # copy the content of env.example file to .env.local file
```
2. Fill in the env variables

### Install turborepo globally
In this repository, we use bun as the package manager, but for installing turborepo, we are going to need `npm`, `yarn` or `pnpm`.

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

### Install packages
For this step, we are going to have bun installed

```bash
curl -fsSL https://bun.sh/install | bash
```

Now, placed in the project's root folder, install all dependencies

```bash
bun i
```

### Using turborepo for running npm scripts
The command `turbo` works as a npm script executer. It executes the scripts declared on both the api and client package.json.
For more information, see https://turbo.build/repo/docs

#### run development server

```bash
turbo dev
```

#### run linting

```bash
turbo lint
```

#### run build

```bash
turbo build
```

#### run tests

```bash
turbo test
```

## Api docs
Once you have started the development server of the API, you can see the docs on this endpoint. Adapt the endpoint to your case
```bash
localhost:3001/docs
```

## About linting and formatting
We use `eslint` and `prettier` on the client package, while we use `biome` on the api package.
To include linting within your IDE, you can add the following extensions:
- [integrate biome in your IDE](https://biomejs.dev/guides/integrate-in-editor/)
- [integrate eslint in your editor](https://eslint.org/docs/latest/use/integrations#editors)
- [intesgrate prettier in your editor](https://prettier.io/docs/en/editors.html)
> [!TIP]
> if your IDE does not support some of the linters/formatters, don't worry about it, we have a CD/CI GitHub workflow to format the code on each PR!
