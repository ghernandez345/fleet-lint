import type { Rule } from 'eslint';
import nodeModulesFirst from './node-modules-first';
import projectImportOrder from './project-import-order';

const rules: Record<string, Rule.RuleModule> = {
  'node-modules-first': nodeModulesFirst as unknown as Rule.RuleModule,
  'project-import-order': projectImportOrder as unknown as Rule.RuleModule,
};

export default rules;
