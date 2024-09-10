import * as dotenv from 'dotenv';
import OpenAI from 'openai';
import { input, select } from '@inquirer/prompts';
import chalk from 'chalk';

dotenv.config(); // Ensure backward compatibility.

const client = new OpenAI({ baseURL: 'https://models.inference.ai.azure.com', apiKey: process.env.GITHUB_TOKEN });

/**
 * Start a conversation between the user and the bot.
 * @param {any[]} messages - Chat history.
 */
export const main = async (messages: any[] = []) => {
  if (!messages) {
    messages = [];
  }

  try {
    const question: string = await input({
      message: chalk.blue('You: ')
    });

    const regex = /exit|quit/gi

    question.match(regex) ? (console.info(chalk.bold(`\n\rHave a nice day.`)), process.exit(0)): 0;

    messages.push({
      role: 'user',
      content: question
    });

    const response: OpenAI.Chat.ChatCompletion = await client.chat.completions.create({
      messages: messages,
      model: 'gpt-4o',
      temperature: 1.,
      max_tokens: 1000,
      top_p: 1.
    });

    const answer: string | null = response.choices[0].message.content;

    if (!!answer) {
      console.log(chalk.magenta('Bot: ') + answer);
      messages.push({
        role: 'assistant',
        content: answer
      });
    }

    const quit: boolean = await select({
      message: 'More?',
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
      console.info(chalk.bold(`\n\rHave a nice day.`));
      process.exit(0);
    }
    
    main(messages);
  } catch (error) {
    console.error(chalk.red.bold(`\n\r${error}`));
  }
};

main();
