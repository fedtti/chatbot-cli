import OpenAI from 'openai';
import * as readline from 'readline';
import chalk from 'chalk';

/**
 * Set OpenAI API key.
 */
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * 
 */
const main = () => {
  const messages: any[] = [];

  console.log(chalk.bold('Enter a user message below.'));

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.setPrompt('\nYou: ');
  rl.prompt();

  rl.on('line', async (input) => {
    try {
      const question = {
        role: 'user',
        content: input
      }
      messages.push(question);
      
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages
      });
      
      const answer = completion.choices[0].message.content;
      
      if (!!answer) {
        console.log(chalk(`Bot: ${answer}`));
        messages.push({
          role: 'assistant',
          content: answer
        });
      }

      rl.prompt();
    } catch (err) {
      console.error(chalk.bold.red(`Error: ${err}`));
    }
  });

  rl.on('close', () => {
    console.log('\nThank you!');
  });
};

main();
