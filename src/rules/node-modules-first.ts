import { DEFAULT_PROJECT_PATH_ORDER } from '../utils/constants';
import { createRule } from '../utils/create-rule';

type Options = [
  {
    projectPaths: string[];
  },
];

type MessageIds = 'nodeModulesFirst';

function isNodeModule(importPath: string, projectPaths: string[]): boolean {
  if (importPath.startsWith('.') || importPath.startsWith('/')) {
    return false;
  }

  const firstSegment = importPath.split('/')[0];
  return !projectPaths.includes(firstSegment);
}

export default createRule<Options, MessageIds>({
  name: 'node-modules-first',
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Enforce that node module imports come before project imports',
      recommended: 'error',
    },
    schema: [
      {
        type: 'object',
        properties: {
          projectPaths: {
            type: 'array',
            items: { type: 'string' },
            description: 'List of project path prefixes to distinguish from node modules',
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      nodeModulesFirst:
        'Node module imports must come before project imports. "{{current}}" (node module) should be before "{{previous}}" (project import).',
    },
  },
  defaultOptions: [{ projectPaths: DEFAULT_PROJECT_PATH_ORDER }],
  create(context) {
    const options = context.options[0] || { projectPaths: DEFAULT_PROJECT_PATH_ORDER };
    const { projectPaths } = options;

    interface ImportInfo {
      node: import('@typescript-eslint/types').TSESTree.ImportDeclaration;
      source: string;
      isNodeModule: boolean;
    }

    const imports: ImportInfo[] = [];

    return {
      ImportDeclaration(node) {
        const source = node.source.value as string;

        if (source.startsWith('.') || source.startsWith('/')) {
          return;
        }

        imports.push({
          node,
          source,
          isNodeModule: isNodeModule(source, projectPaths),
        });
      },

      'Program:exit'() {
        for (let i = 1; i < imports.length; i++) {
          const current = imports[i];
          const previous = imports[i - 1];

          if (current.isNodeModule && !previous.isNodeModule) {
            context.report({
              node: current.node,
              messageId: 'nodeModulesFirst',
              data: {
                current: current.source,
                previous: previous.source,
              },
            });
          }
        }
      },
    };
  },
});
