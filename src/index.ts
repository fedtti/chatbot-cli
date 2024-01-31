import { select, input } from '@inquirer/prompts';

const start = process.env.NODE_ENV === 'production' ? 'node' : 'tsx';

/**
 * Choose between available AI systems.
 */
const answer = await select({
  message: 'Please, select one of the available AI system:',
  choices: [
    {
      name: 'GPT',
      value: `${start} @/providers/openai.ts`
    }
  ]
});
