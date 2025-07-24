# iliad-technical-test

Technical test for iliad. Simple web app that fetches data from multiple APIs and manipulates the responses using Pinia state manager.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit

# Generates coverage report
npm run coverage
```

Unit Tests:

- stores/users.spec.ts
- components/Comment.spec.ts
- composables/useCommentActions.spec.ts

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e --project=chromium
# Runs the tests of a specific file
npm run test:e2e tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e --debug
```

E2E tests:

- Search user flow
- Delete post flow

## 🐳 Run with Docker Compose

The project includes a `docker-compose.yml` file for easy setup.

### Step 1: Build the app locally

Since the container is for serving static files, build the app locally first:

```bash
npm install
npm run build
```

### Step 2: Run the container

```bash
docker-compose up --build
```

Your Vue 3 app will be available at: http://localhost:8080

### Step 3: Stop the container

```bash
docker-compose down
```
