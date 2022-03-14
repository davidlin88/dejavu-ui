import { resolve } from 'path';

export const projRoot = resolve(__dirname, '..', '..');
export const antPackage = resolve(projRoot, 'package.json');
export const pkgRoot = resolve(projRoot, 'components');
// export const pkgRoot = resolve(projRoot, 'components');
export const comRoot = pkgRoot;

// dist
export const buildOutput = resolve(projRoot, 'dist');
// dist/antdv
export const antOutput = resolve(buildOutput, 'antdv');
export const esDir = resolve(antOutput, 'es');
export const libDir = resolve(antOutput, 'lib');
export const distDir = resolve(antOutput, 'dist');
