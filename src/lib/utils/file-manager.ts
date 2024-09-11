import { readdirSync, readFileSync, writeFileSync } from 'fs';
import chalk from 'chalk';

const path: string = './dist/lib/data';

/**
 * Read the file(s) list and returns an array of names.
 * @returns {string}
 */
export const list: any = (): string[] | void => {
  try {
    let data: string[] = [];
    const dir = readdirSync(path);
    dir.forEach(name => {
      data.push(name);
    });
    return !!data ? data : undefined;
  } catch (error) {
    console.error(chalk.red.bold(`\n\r${error}`));
  }
};

/**
 * Read the file contents and pass them back to the active model as a prompt.
 * @param {string} file - File to read.
 * @returns {string}
 */
export const prompt: any = (file: string): string | void => {
  try {
    const data = readFileSync(`${path}/${file}`, { encoding: 'utf-8' });
    return !!data ? data : undefined;
  } catch (error) {
    console.error(chalk.red.bold(`\n\r${error}`));
  }
}

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
