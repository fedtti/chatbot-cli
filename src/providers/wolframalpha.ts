import * as dotenv from 'dotenv';
import * as needle from 'needle';
import { input } from '@inquirer/prompts';
import chalk from 'chalk';

dotenv.config();

const token = process.env.WOLFRAMALPHA_APP_ID;

console.clear();

const main = async () => {
  console.log(chalk.bold(`Enter a user message below.\n`));

};

main();
