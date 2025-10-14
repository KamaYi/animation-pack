module.exports = async function (plop) {
  const { pascalCase, paramCase } = await import('change-case');
  plop.setHelper('pascalCase', (txt) => pascalCase(txt));
  plop.setHelper('kebabCase', (txt) => paramCase(txt));

  plop.setGenerator('component', {
    description: '创建 React 组件与对应的 Storybook 模板',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: '组件名（PascalCase）:',
        validate: (v) => !!v || '组件名不能为空',
      },
      {
        type: 'input',
        name: 'category',
        message: 'Storybook 分类（如 Animation/ 或 Components/）:',
        default: 'Components/',
      },
      {
        type: 'confirm',
        name: 'withStyle',
        message: '是否创建样式文件（.css 与 .less）?',
        default: false,
      },
    ],
    actions: (data) => {
      const basePath = 'src/components/{{pascalCase name}}';
      /** @type {import('plop').ActionType[]} */
      const actions = [
        {
          type: 'add',
          path: `${basePath}/index.tsx`,
          templateFile: 'plop-templates/component/index.tsx.hbs',
        },
        {
          type: 'add',
          path: `${basePath}/{{pascalCase name}}.tsx`,
          templateFile: 'plop-templates/component/Component.tsx.hbs',
        },
        {
          type: 'add',
          path: `${basePath}/{{pascalCase name}}.stories.tsx`,
          templateFile: 'plop-templates/component/Component.stories.tsx.hbs',
        },
      ];

      if (data.withStyle) {
        actions.push(
          {
            type: 'add',
            path: `${basePath}/{{pascalCase name}}.css`,
            template: '/* {{pascalCase name}} component styles */\n',
          },
          {
            type: 'add',
            path: `${basePath}/{{pascalCase name}}.less`,
            template: '/* {{pascalCase name}} component styles (LESS) */\n',
          }
        );
      }

      return actions;
    },
  });
};


