import path from 'path';
import { ModuleFormat } from 'rollup';
import { ANT_PKG } from './utils/constants';
import { antOutput } from './utils/paths';

export const modules = ['esm', 'cjs'] as const;
export type Module = typeof modules[number];
export interface BuildInfo {
  module: 'ESNext' | 'CommonJS';
  format: ModuleFormat;
  ext: 'mjs' | 'cjx' | 'js';
  output: {
    /** e.g: `es` */
    name: string;
    /** e.g: `dist/antdv/es` */
    path: string;
  };
  bundle: {
    /** e.g: `antdv/es` */
    path: string;
  };
}

export const buildConfig: Record<Module, BuildInfo> = {
  esm: {
    module: 'ESNext',
    format: 'esm',
    ext: 'mjs',
    output: {
      name: 'es',
      path: path.resolve(antOutput, 'es'),
    },
    bundle: {
      path: `${ANT_PKG}/es`,
    },
  },
  cjs: {
    module: 'CommonJS',
    format: 'cjs',
    ext: 'js',
    output: {
      name: 'lib',
      path: path.resolve(antOutput, 'lib'),
    },
    bundle: {
      path: `${ANT_PKG}/lib`,
    },
  },
};

export const buildConfigEntries = Object.entries(buildConfig) as BuildConfigEntries;
export type BuildConfigEntries = [Module, BuildInfo][];
export const target = 'es2018';
