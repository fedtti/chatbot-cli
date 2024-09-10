import { promises as fs } from 'fs';
import chalk from 'chalk';

/**
 * Save the chat history into a `./chat-history.txt` file.
 * @param {string} content - Chat history.
 */
export const output = async (content: any): Promise<any> => {
  try {
    await fs.writeFile('./chat-history.txt', content);
    console.info(chalk.bold(`\n\rThe chat history has been successfully saved in the './chat-history.txt' file.`));
  } catch (error) {
    console.error(chalk.red.bold(`\n\r${error}`));
  }
};
