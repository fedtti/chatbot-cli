import OpenAI from 'openai';
import * as readline from 'readline';
import chalk from 'chalk';

/**
 * Set an OpenAI API key.
 */
export const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Start the CLI interaction.
 */
const main = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const messages: any[] = [];

  console.log(chalk.bold('Enter a user message below.\n'));

  rl.setPrompt(chalk.blue('You: '));
  rl.prompt();

  rl.on('line', async (input) => {
    try {
      const question = {
        role: 'user',
        content: input
      }
      messages.push(question);
      
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

      rl.prompt();
    } catch (err) {
      console.error(chalk.bold.red(`Error: ${err}.`));
    }
  });

  rl.on('close', () => {
    console.log(chalk.bold('\n\nHave a nice day.'));
  });
};

main();
