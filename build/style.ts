import path from 'path';
import fs from 'fs/promises';
import chalk from 'chalk';
import { src, dest, series, parallel } from 'gulp';
import gulpSass from 'gulp-sass';
import dartSass from 'sass';
import autoPrefixer from 'gulp-autoprefixer';
import cleanCss from 'gulp-clean-css';
import { antOutput, comRoot, distDir, esDir, libDir, projRoot } from './utils/paths';
import { excludeFiles } from './utils/pkg';
import glob from 'fast-glob';
import { OutputOptions, Plugin, rollup } from 'rollup';
import esbuild from 'rollup-plugin-esbuild';
import { buildConfig, buildConfigEntries, target } from './build-info';
import { writeBundles } from './utils/rollup';
import { ElementPlusAlias } from './plugins/element-plus-alias';
import scss from 'rollup-plugin-scss';

const sass = gulpSass(dartSass);

const getDistFolder = (modules: Module) => (modules ? esDir : libDir);

function copyScssFiles(modules: Module) {
  return src(path.resolve(comRoot, '**/*.scss')).pipe(dest(getDistFolder(modules)));
}
function transformScss(modules: Module) {
  return src(path.resolve(comRoot, '**/style/index.scss'))
    .pipe(sass.sync())
    .pipe(autoPrefixer({ cascade: false }))
    .pipe(
      cleanCss({}, details => {
        console.log(
          `${chalk.cyan(details.name)}: ${chalk.yellow(
            details.stats.originalSize / 1000,
          )}KB -> ${chalk.green(details.stats.minifiedSize / 1000)}KB`,
        );
      }),
    )
    .pipe(dest(getDistFolder(modules)));
}

export async function buildModuleStyle(modules = true) {
  copyScssFiles(modules);
  transformScss(modules);
  buildStyleEntries();
}

/** extract css from style entry  */
export const buildFullStyle = async () => {
  const input = await glob('style.ts', {
    cwd: comRoot,
    absolute: true,
    onlyFiles: true,
  });
  const bundle = await rollup({
    input,
    watch: {
      skipWrite: true,
    },
    plugins: [
      scss({
        output: path.resolve(distDir, 'index.css'),
        outputStyle: 'compressed',
      }),
      esbuild(),
    ],
  });
  const output = path.resolve(distDir, 'style.js');

  await bundle.write({
    dir: distDir,
  });
  await fs.unlink(output);
};

/** generate bridge from js to s?css */
async function buildStyleEntries() {
  const input = excludeFiles(
    await glob(['**/style/index.ts'], {
      cwd: comRoot,
      absolute: true,
      onlyFiles: true,
    }),
  );
  const scssBundle = await rollup({
    input,
    plugins: [
      ElementPlusAlias(true),
      esbuild({
        sourceMap: true,
        target,
      }),
    ],
  });
  const cssBundle = await rollup({
    input,
    plugins: [
      ElementPlusAlias(false),
      esbuild({
        sourceMap: true,
        target,
      }),
    ],
  });

  const scssConfigs = [] as OutputOptions[];
  const cssConfigs = [] as OutputOptions[];
  Object.values(buildConfig).forEach(config => {
    const commonConfig: OutputOptions = {
      format: config.format,
      dir: config.output.path,
      exports: 'named',
      preserveModules: true,
      preserveModulesRoot: comRoot,
      sourcemap: false,
    };

    const cur1 = Object.assign(
      {},
      {
        entryFileNames: `index.${config.ext}`,
        ...commonConfig,
      },
    );
    const cur2 = Object.assign(
      {},
      {
        entryFileNames: `css.${config.ext}`,
        ...commonConfig,
      },
    );
    scssConfigs.push(cur1);
    cssConfigs.push(cur2);
  });

  await writeBundles(scssBundle, scssConfigs);
  await writeBundles(cssBundle, cssConfigs);
}

type Module = boolean;

declare module 'rollup-plugin-scss' {
  export interface CSSPluginOptions {
    outputStyle?: 'compressed';
  }
}
