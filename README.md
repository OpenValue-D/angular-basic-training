# OpenValue Angular Basic Training

This repository contains the training materials for the [Angular Basic Training by OpenValue](https://openvalue.training/).

## Prerequesites:

- Node.js version 24 (we recommend to install Node.js using the [node version manager "nvm"](https://github.com/nvm-sh/nvm)
  - execute `node --version` to verify
- npm version 11 (it's included in the Node.js installation)
  - execute `npm --version` to verify
  - executing `npm install` in this repo should be successful
  - executing `npm run start` should allow you to see some content under [localhost:4200](https://localhost:4200)
- Git
  - make sure you can clone this repository and create your own commits
- Chrome browser
  - in the root of this repo `npm run test` should run the tests and open a Chrome Browser
- around 2 GB of free space

## Development server

To start a local development server, run:

```bash
npm run start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
npx ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
npx ng generate --help
```

## Building

To build the project run:

```bash
npm run build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
npm run test
```
