# http-client

A simple TypeScript CLI that fetches a random dog fact and displays a random dog image in your terminal.

## What it does

- Fetches a dog fact from [dogapi.dog](https://dogapi.dog/api/v2/facts)
- Fetches a random dog image from [dog.ceo](https://dog.ceo/api/breeds/image/random)
- Renders the image directly in the terminal using [chafa](https://hpjansson.org/chafa/)
- Validates all API responses with [Zod](https://zod.dev)

## Prerequisites

- Node.js 18+
- pnpm
- `chafa` for terminal image rendering

```bash
# Install chafa (Ubuntu/Debian)
sudo apt install chafa
```

## Setup

```bash
pnpm install
```

## Usage

```bash
# Run in dev mode (with watch)
pnpm dev

# Or build and run
pnpm build
pnpm start
```
