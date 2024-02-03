import * as dotenv from 'dotenv';
import needle from 'needle';
import { input } from '@inquirer/prompts';
import chalk from 'chalk';

dotenv.config();

const app_id = process.env.WOLFRAMALPHA_APP_ID;

console.clear();

const main = async () => {
  console.log(chalk.bold(`Enter a user message below.\n`));

  try {
    const question = await input({
      message: chalk.blue('You: ')
    });

    question.toLowerCase() === 'exit' ? (console.log(chalk.bold(`\n\rHave a nice day.`)), process.exit(0)): 0;

    encodeURIComponent(question).replace(/%20/g, '+');

    let answer;

    await needle('get', `https://www.wolframalpha.com/api/v1/llm-api?appid=${app_id}&input=${question}&output=plaintext`)
                .then((res) => {
                  answer = res.body;
                })
                .catch((err) => {
                  console.error(chalk.red.bold(`\n\r${err}.`));
                });

    if (!!answer) {
      console.log(chalk.magenta('Bot: ') + answer);
    }

    main();
  } catch (err) {
    console.error(chalk.red.bold(`\n\r${err}.`));
  }
};

main();
