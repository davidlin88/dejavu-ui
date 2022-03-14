import path from 'path';
import { rollup } from 'rollup';
import { antOutput, comRoot } from './utils/paths';
import { ElementPlusAlias } from './plugins/element-plus-alias';
import esbuild, { minify } from 'rollup-plugin-esbuild';
import filesize from 'rollup-plugin-filesize';
import { target } from './build-info';
import { formatBundleFilename, generateExternal, writeBundles } from './utils/rollup';
import { ANT_BRAND_NAME } from './utils/constants';
import { getPackageManifest } from './utils/pkg';
import { parallel } from 'gulp';
import { withTaskName } from './utils/gulp';
import json from '@rollup/plugin-json';
import vue from 'rollup-plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';

const version = getPackageManifest().version;

const banner = `/* ${ANT_BRAND_NAME} v${version} */\n`;
export async function buildFullEntry(minify: boolean) {
  const bundle = await rollup({
    input: path.resolve(comRoot, 'index.ts'),
    plugins: [
      ElementPlusAlias(),
      vue(),
      vueJsx(),
      json(),
      nodeResolve(),
      commonjs(),
      esbuild({
        exclude: [],
        minify,
        target,
        loaders: {
          '.vue': 'ts',
        },
      }),
      filesize(),
    ],
    external: await generateExternal({ full: true }),
  });

  await writeBundles(bundle, [
    {
      format: 'umd',
      file: path.resolve(antOutput, 'dist', formatBundleFilename('index.full', minify, 'js')),
      exports: 'named',
      name: 'Antdv',
      sourcemap: minify,
      banner,
    },
    {
      format: 'esm',
      file: path.resolve(antOutput, 'dist', formatBundleFilename('index.full', minify, 'mjs')),
      sourcemap: minify,
      banner,
    },
  ]);
}

export const buildFullBundle = parallel(
  withTaskName('buildFullMinified', () => buildFullEntry(true)),
  withTaskName('buildFull', () => buildFullEntry(false)),
);
