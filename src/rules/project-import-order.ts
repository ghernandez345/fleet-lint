import { DEFAULT_PROJECT_PATH_ORDER } from '../utils/constants';
import { createRule } from '../utils/create-rule';

type Options = [
  {
    projectPaths: string[];
  },
];

type MessageIds = 'incorrectProjectOrder';

function getProjectPathIndex(
  importPath: string,
  projectPaths: string[]
): number {
  const firstSegment = importPath.split('/')[0];
  return projectPaths.indexOf(firstSegment);
}

export default createRule<Options, MessageIds>({
  name: 'project-import-order',
  meta: {
    type: 'layout',
    docs: {
      description:
        'Enforce a specific order for project imports based on configured path prefixes',
      recommended: 'error',
    },
    schema: [
      {
        type: 'object',
        properties: {
          projectPaths: {
            type: 'array',
            items: { type: 'string' },
            description: 'Ordered list of project path prefixes',
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      incorrectProjectOrder:
        'Project imports must follow the specified order. "{{current}}" should come before "{{previous}}".',
    },
  },
  defaultOptions: [{ projectPaths: DEFAULT_PROJECT_PATH_ORDER }],
  create(context) {
    const options = context.options[0] || { projectPaths: DEFAULT_PROJECT_PATH_ORDER };
    const { projectPaths } = options;

    interface ImportInfo {
      node: import('@typescript-eslint/types').TSESTree.ImportDeclaration;
      source: string;
      projectPathIndex: number;
    }

    const imports: ImportInfo[] = [];

    return {
      ImportDeclaration(node) {
        const source = node.source.value;

        if (source.startsWith('.') || source.startsWith('/')) {
          return;
        }

        const projectIdx = getProjectPathIndex(source, projectPaths);

        // Only track imports that match a project path
        if (projectIdx !== -1) {
          imports.push({
            node,
            source,
            projectPathIndex: projectIdx,
          });
        }
      },

      'Program:exit'() {
        for (let i = 1; i < imports.length; i++) {
          const current = imports[i];
          const previous = imports[i - 1];

          if (current.projectPathIndex < previous.projectPathIndex) {
            context.report({
              node: current.node,
              messageId: 'incorrectProjectOrder',
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
