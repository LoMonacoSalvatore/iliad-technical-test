# iliad-technical-test

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
bun install
```

### Compile and Hot-Reload for Development

```sh
bun dev
```

### Type-Check, Compile and Minify for Production

```sh
bun run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
bun test:unit
```

The unit test present tests actions of the /stores/users.ts

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
bunx playwright install

# When testing on CI, must build the project first
bun run build

# Runs the end-to-end tests
bun test:e2e
# Runs the tests only on Chromium
bun test:e2e --project=chromium
# Runs the tests of a specific file
bun test:e2e tests/example.spec.ts
# Runs the tests in debug mode
bun test:e2e --debug
```

During the E2E test, the flow tested is the following:

- Land on Homepage
- Search for the User card
- If present, click on it
- Navigate to user page
- Search for the "View users's posts" button and click on it if visible
- Navigate to posts page
- Search for Post cards and count them to save the initial value
- Search for the delete button and click on it
- Final result is the post cards's initial value is lower than the current count

### Lint with [ESLint](https://eslint.org/)

```sh
bun lint
```

## 🐳 Run with Docker Compose

The project includes a `docker-compose.yml` file for easy setup.

### Step 1: Build the app locally

Since the container is for serving static files, build the app locally first:

```bash
bun run build
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
