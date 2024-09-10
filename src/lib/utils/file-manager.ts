import { promises as fs } from 'fs';
import chalk from 'chalk';

export const output = async (content: any): Promise<any> => {
  try {
    await fs.writeFile('./chat-history.txt', content);
    console.info();
  } catch (error) {
    console.error(chalk.red.bold(`\n\r${error}`));
  }
};
