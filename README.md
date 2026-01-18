# eslint-plugin-fleet-lint

ESLint plugin with shareable configs and custom rules for Fleet projects.

## Installation

```bash
yarn add -D eslint-plugin-fleet-lint eslint
```

## Usage

Add to your `.eslintrc.js`:

```javascript
module.exports = {
  extends: ['plugin:fleet-lint/recommended'],
  settings: {
    'import/resolver': {
      webpack: {
        config: './webpack.config.js',
      },
    },
  },
};
```

## Adding Custom Rules

1. Create a rule in `src/rules/your-rule.ts` using the `createRule` utility
2. Export it from `src/rules/index.ts`
3. Rebuild with `yarn build`

## Development

```bash
# Install dependencies
yarn install

# Build
yarn build

# Clean build output
yarn clean
```

## Publishing

```bash
yarn publish
```
