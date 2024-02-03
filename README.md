# Chatbot × AI

A CLI text-only chatbot based on AI systems written in Node.js

- [Description](#description)
- [Instructions](#instructions)
  - [Requirements](#requirements)
  - [Installing](#installing)
  - [Usage](#usage)
- [Contributing](#contributing)
- [Notes](#notes)

## Description

This chatbot let you ask text-only questions from the CLI to different AI systems using Node.js.

1. [OpenAI GPT-3.5](https://platform.openai.com/docs/api-reference)
2. [Wolfram|Alpha LLM](https://products.wolframalpha.com/llm-api/documentation)

## Instructions

Put an active API key in a `.env` file:

```
OPENAI_API_KEY=YOUR_API_KEY
WOLFRAMALPHA_APP_ID=YOUR_APP_ID
```

Replace `YOUR_API_KEY` with your own API key hash.

Please, keep in mind that [OpenAI](https://openai.com/) checks for public API keys hashes, so **it will be invalidated if you publish it** somewhere on the web.

### Requirements

- [Node.js](https://nodejs.org/)
- [Chalk](https://www.npmjs.com/package/chalk)

### Installing

```
npm install
npm run build
```

### Usage

```
npm run start
```

## Contributing

Please, use [SemVer](https://semver.org/) and [Conventional Commits](https://www.conventionalcommits.org/) in pull requests. [Hacktoberfest](https://hacktoberfest.com/) participants are welcome.

### Notes

It works with **Node.js v20.x** or higher.
