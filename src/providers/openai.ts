import * as dotenv from 'dotenv';
import OpenAI from 'openai';
import { input } from '@inquirer/prompts';
import chalk from 'chalk';

dotenv.config();

const main = async () => {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  console.log(chalk.bold('Enter a user message below.\n'));

  const messages: any[] = [];

  try {
    const question = await input({
      message: chalk.blue('You: ')
    });

    question.toLowerCase() === 'exit' ? (console.log(chalk.bold('Have a nice day.')), process.exit(0)): 0;

    messages.push({
      role: 'user',
      content: question
    });

    const completion: OpenAI.Chat.ChatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages
    });

    const answer: string | null = completion.choices[0].message.content;
      
    if (!!answer) {
      console.log(chalk.magenta('Bot: ') + answer);
      messages.push({
        role: 'assistant',
        content: answer
      });
    }

    main();
  } catch (err) {
    console.error(chalk.red.bold(`\n\r${err}.`));
  }
};

main();
