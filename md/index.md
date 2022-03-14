<div align="center">
  <h2>
  Compare <a href="https://github.com/vueComponent/ant-design-vue">Antdv</a> and <a href="https://github.com/element-plus/element-plus">Element Plus</a>
  </h2>
</div>

### package management

**pnpm vs yarn**

- `El+` uses `pnpm`
- `Antdv` uses `yarn`

From my experience, `pnpm` is more elegant than `yarn`.`pnpm` is almost as fast as `yarn`, in addition, `pnpm` has a unique way to handle architecture in `node_modules` which can avoid the problem of illegle refferences.And the `pnpm` project's directory struture looks more clear.

_TODO: add image comparison of directories_

_TODO: add link of how pnpm prevent illegal refferences_

_PS: I have to say, YARN is easier to type than PNPM._

### architecture

**monorepo vs single repo**

- `El+` is a monorepository
- `Antdv` is a single repository.

`El+` divides some modules like `@element-plus/theme-chalk` into a seperated directory as a independent npm repository.

It's easier to work with a project that consists only of SCSS files when build bundles. But it sense of fragmentationmaybe because html/js are not togather with css.

Besides, I haven't found any obvious advantages of UI Components using monorepo.

## CSS extension

- `El+` uses scss
- `Antdv` uses less

It doesn't matter, just use what you like.

## Typescript Coverage

`El+` has less js files, but `Antdv` has more complete type support. ( benefit by migrating from [antd](https://github.com/ant-design/ant-design/) )

## Component syntsx

- `El+` uses `.vue`+`.ts`
- `Antdv` use `.tsx`

Components with `.vue` are easy to get started especially for Vue.js rookies.

However, as a UI component library, it is inevitable to reuse components. If you use `.vue` files as basic components, you have to use Vue.js's api like `createVNode`, it's too abstract to write and read. But with `.tsx/.jsx`, you can write component like writing html tags in jsx.

_TODO: add image comparison of .tsx and .vue createVNode_

## Building

They all use `gulp` as automate toolkit.

- `El+` follows `gulp`'s recommended usage ([export your task](https://gulpjs.com/docs/en/getting-started/creating-tasks))
- `Antdv` take the old way ( use [task()](https://gulpjs.com/docs/en/api/task) ) to define a task)

`gulp` is just a tool to enhance workflows. As for packaging, `El+` uses `rollup` to build full bundle and modules, it uses gulp plugin (like `gulp-sass`, etc.) to transform and package style files.

Compare to `El+`, `Antdv` uses less gulp plugins, it use `webpack` to build full bundle instead of `rollup`. `Antdv` write many automate script including build, publish, git commander, etc.

`Antdv` wrote a lot of manual scripts, which are more difficult and more complex, but at the same time, the processing of file flow is more in-depth. `Antdv`'s `gulp` scripts is very helpful for us to understand automation.
