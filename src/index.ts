import { select } from '@inquirer/prompts';

/**
 * Choose between available AI systems.
 */
const answer = await select({
  message: 'Please, select one of the available AI system:',
  choices: [
    {
      name: 'GPT',
      value: 'openai'
    }
  ]
});
