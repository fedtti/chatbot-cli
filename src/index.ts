import chalk from 'chalk';
import OpenAI from 'openai';
import * as readline from 'readline';

/**
 * 
 */
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * 
 */
const main = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  try {
    rl.question('Prova?', async input => {
      const chatCompletion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ 'role': 'user', 'content': input }]
      });

      console.log(chatCompletion);

    });
  } catch (err) {
    console.error(err);
  }
};

main();
