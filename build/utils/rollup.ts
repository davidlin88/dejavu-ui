import { OutputOptions, RollupBuild } from 'rollup';
import { antPackage } from './paths';
import { getPackageDependencies } from './pkg';

export function writeBundles(bundle: RollupBuild, options: OutputOptions[]) {
  return Promise.all(options.map(option => bundle.write(option)));
}

export const generateExternal = async (options: { full: boolean }) => {
  const { dependencies, peerDependencies } = await getPackageDependencies(antPackage);

  return (id: string) => {
    const packages: string[] = peerDependencies;
    if (!options.full) {
      packages.push('@vue', ...dependencies);
    }
    return [...new Set(packages)].some(pkg => pkg === id || id.startsWith(`${pkg}/`));
  };
};

export function formatBundleFilename(name: string, minify: boolean, ext: string) {
  return `${name}${minify ? '.min' : ''}.${ext}`;
}
