import { excludeFiles } from './utils/pkg';
import glob from 'fast-glob';
import { comRoot, pkgRoot, projRoot } from './utils/paths';
import { rollup } from 'rollup';
import css from 'rollup-plugin-css-only';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import esbuild from 'rollup-plugin-esbuild';
import filesize from 'rollup-plugin-filesize';
import type { Plugin } from 'rollup';
import { generateExternal, writeBundles } from './utils/rollup';
import { buildConfigEntries, target } from './build-info';
import type { OutputOptions } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { reporter } from './plugins/size-reporter';
import { ElementPlusAlias } from './plugins/element-plus-alias';
import { parallel } from 'gulp';
import chalk from 'chalk';
import json from '@rollup/plugin-json';

const _buildModules = async () => {
  const input = excludeFiles(
    await glob('**/*.{js,ts,tsx,vue}', {
      cwd: comRoot,
      absolute: true,
      onlyFiles: true,
    }),
  );

  const bundles = await rollup({
    input,
    plugins: [
      ElementPlusAlias(),
      <Plugin>(css() as unknown),
      vue(),
      vueJsx(),
      nodeResolve({
        extensions: ['.mjs', '.js', '.json', '.ts'],
      }),
      commonjs(),
      json(),
      esbuild({
        sourceMap: true,
        target,
        loaders: {
          '.vue': 'ts',
        },
      }),
      filesize({ reporter }),
    ],
    // 跳过打包pkg中已声明的依赖
    external: await generateExternal({ full: false }),
    treeshake: false,
  });
  await writeBundles(
    bundles,
    buildConfigEntries.map(([module, config]): OutputOptions => {
      return {
        format: config.format,
        dir: config.output.path,
        exports: module === 'cjs' ? 'named' : undefined,
        // ?
        preserveModules: true,
        preserveModulesRoot: comRoot,
        sourcemap: true,
        entryFileNames: `[name].${config.ext}`,
      };
    }),
  );
};

export const buildModules = _buildModules;
