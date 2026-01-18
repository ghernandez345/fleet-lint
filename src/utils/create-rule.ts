import { ESLintUtils } from '@typescript-eslint/utils';

export const createRule = ESLintUtils.RuleCreator(
  (name) => `https://github.com/your-org/eslint-plugin-fleet-lint/blob/main/docs/rules/${name}.md`
);
