import { readFileSync, writeFileSync } from 'fs';
import chalk from 'chalk';

/**
 * Read the specified file and pass its content back to the LLM provider.
 * @param {string} file - File to be read.
 */
export const prompt = (): any => {
  try {
    const data = readFileSync('./dist/lib/data/example.txt', { encoding: 'utf-8' });
    return JSON.stringify(data);
  } catch (error) {
    console.error(chalk.red.bold(`\n\r${error}`));
  }
};

/**
 * Save the chat history into a './chat-history.txt' file.
 * @param {string} content - Chat history.
 */
export const output = (content: any): void => {
  // TODO: @fedtti - Format the chat history to be more human-readable.

  try {
    const data = writeFileSync('./chat-history.txt', content);
    console.info(chalk.bold(`\n\rThe chat history has been successfully saved in the './chat-history.txt' file.`));
  } catch (error) {
    console.error(chalk.red.bold(`\n\r${error}`));
  }
};
