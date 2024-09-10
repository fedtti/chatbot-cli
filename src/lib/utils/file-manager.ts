import { readFileSync, writeFileSync } from 'fs';
import chalk from 'chalk';

/**
 * Read the file and pass its content back to the provider in use.
 */
export const prompt: any = (): any => {
  try {
    const data = readFileSync('./dist/lib/data/example.txt', { encoding: 'utf-8' }); // TODO: @fmoretti - Add support for different files in the same folder.
    return JSON.stringify(data);
  } catch (error) {
    console.error(chalk.red.bold(`\n\r${error}`));
  }
};

/**
 * Save the chat history into a './chat-history.txt' file.
 * @param {string} content - Chat history.
 */
export const output: any = (content: any): void => {
  const data = JSON.parse(content);

  try {
    writeFileSync('./chat-history.txt', content);
    console.info(chalk.bold(`\n\rThe chat history has been successfully saved in the './chat-history.txt' file.`));
  } catch (error) {
    console.error(chalk.red.bold(`\n\r${error}`));
  }
};
