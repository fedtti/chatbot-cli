import { select } from '@inquirer/prompts';
import { spawn } from 'child_process';

const answer = await select({
  message: 'Please, select one of the available AI system:',
  choices: [
    {
      name: 'GPT',
      value: `node --env-file=.env @/providers/openai.ts`
    }
  ]
});

spawn(answer, { stdio: 'inherit', shell: true });
