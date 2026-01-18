import configs from './configs';
import rules from './rules';

const plugin = {
  meta: {
    name: 'eslint-plugin-fleet-lint',
    version: '1.0.0',
  },
  configs,
  rules,
};

export = plugin;
