#!/usr/bin/env node

import * as dotenv from 'dotenv';
import chalk from 'chalk';
import figlet from 'figlet';
import { main as chatGpt } from './providers/openai.js';
import { main as wolframAlpha } from './providers/wolframalpha.js';

dotenv.config(); // Ensure backward compatibility.

/**
 * Print the name of the CS50 course in the console.
 */
const init: any = (): void => {
  console.info(
    chalk.green(
      figlet.textSync('CS50x', {
        font: 'Ghost'
      })
    )
  );
};

/**
 * Ask the user to query the chosen model between ChatGPT-4o provided by Azure OpenAI Service and Wolfram|Alpha¹.
 */
const run: any = (): void => {
  console.clear();
  init();

  try {
    setTimeout(() => {
      console.clear();
      console.info(chalk.bold('Enter a user message below.\n\r'));
      chatGpt();
    }, 1000);
  } catch (error) {
    console.error(chalk.red.bold(`\n\r${error}`));
  }
};

run();

// ¹More models will be available soon.
