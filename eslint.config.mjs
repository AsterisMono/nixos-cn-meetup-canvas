// eslint.config.mjs
import antfu from '@antfu/eslint-config';

export default antfu({
  typescript: true,
  nextjs: true,
  react: true,
  stylistic: {
    indent: 2,
    quotes: 'single',
    semi: true,
  },
}, {
  rules: {
    'node/prefer-global/process': 'off',
  },
});
