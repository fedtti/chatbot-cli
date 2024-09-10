import * as dotenv from 'dotenv';
import OpenAI from 'openai';
import { input, confirm, select } from '@inquirer/prompts';
import chalk from 'chalk';
import { prompt, output } from '../lib/utils/file-manager.js';

dotenv.config(); // Ensure backward compatibility.

const client = new OpenAI({
  baseURL: 'https://models.inference.ai.azure.com',
  apiKey: process.env.GITHUB_TOKEN
});
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

    const response: OpenAI.Chat.ChatCompletion = await client.chat.completions.create({
      messages: history,
      model: 'gpt-4o',
      temperature: 1.,
      max_tokens: 1000,
      top_p: 1.
    });
    const answer: string | null = response.choices[0].message.content;

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
