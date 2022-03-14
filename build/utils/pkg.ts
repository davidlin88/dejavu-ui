import type { ProjectManifest } from '@pnpm/types';
import path from 'path';
import { antPackage } from './paths';

export const excludeFiles = (files: string[]) => {
  const excludes = ['node_modules', 'test', 'mock', 'gulpfile', 'dist'];
  return files.filter(path => excludes.every(exclude => !path.includes(exclude)));
};

export const getPackageManifest = (pkgPath = antPackage) => {
  return require(pkgPath) as ProjectManifest;
};

export const getPackageDependencies = (
  pkgPath: string,
): Record<'dependencies' | 'peerDependencies', string[]> => {
  const manifest = getPackageManifest(pkgPath);
  const { dependencies = {}, peerDependencies = {} } = manifest;
  return {
    dependencies: Object.keys(dependencies),
    peerDependencies: Object.keys(peerDependencies),
  };
};
