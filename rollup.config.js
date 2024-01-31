import typescript from '@rollup/plugin-typescript';

export default {
  input: ['./src/index.ts', './src/providers/openai.ts'],
  output: {
    dir: 'dist',
    format: 'esm'
  },
  plugins: [
    typescript()
  ]
};
