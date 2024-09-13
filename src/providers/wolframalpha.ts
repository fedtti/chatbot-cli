import * as dotenv from 'dotenv';
import { input, confirm, select } from '@inquirer/prompts';
import chalk from 'chalk';
import { output } from '../lib/utils/file-manager.js';

dotenv.config(); // Ensure backward compatibility.

const history: any[] = [];

/**
 * Start a conversation between the user and the bot.
 */
export const main = async (): Promise<void> => {
  try {
    const question: string = await input({
      message: chalk.blue('You: ')
    });
    const regex = /exit|quit/gi
    const greetings = chalk.bold('\n\rHave a nice day.');
    question.match(regex) ? (console.info(greetings), process.exit(0)): 0;
    history.push({
      role: 'user',
      content: question
    });

    const url: string = `https://www.wolframalpha.com/api/v1/llm-api?&input=${question}&format=plaintext`;
    const token: string | undefined = process.env.WOLFRAMALPHA_APP_ID;
    const response: Response = await fetch(url, {
      headers: {
        'Content-Type': 'json',
        'Authorization': `Bearer ${token}`
      }
    });

    const answer = response.json();

    if (!!answer) {
      console.log(`${chalk.magenta('Bot: ')} ${answer}`);
      history.push({
        role: 'assistant',
        content: answer
      });
    }

    const quit: boolean = await select({
      message: 'Continue?',
      choices: [
        {
          name: 'Yes',
          value: false
        },
        {
          name: 'No',
          value: true
        }
      ]
    });

    if (!!quit) {
      const save: boolean = await confirm({
        message: 'Do you want to save the chat history?',
        default: false
      });

      if (!!save) {
        await output(JSON.stringify(history));
      }

      console.info(greetings);
      process.exit(0);
    }

    main();
  } catch (error) {
    console.error(chalk.red.bold(`\n\r${error}`));
  }
};
