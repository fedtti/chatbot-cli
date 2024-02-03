import { select } from '@inquirer/prompts';
import { spawn } from 'child_process';

console.clear();

const execute = process.env.NODE_ENV === 'production' ? 'node' : 'tsx';

const answer = await select({
  message: 'Please, select one of the available AI system:',
  choices: [
    {
      name: 'GPT',
      value: `${execute} ./src/providers/openai.ts`
    },
    {
      name: 'Wolfram|Alpha',
      value: `${execute} ./src/providers/wolframalpha.ts`
    }
  ]
});

spawn(answer, { stdio: 'inherit', shell: true });
