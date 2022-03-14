import { FileSizeReporter } from 'rollup-plugin-filesize';
import { command } from '../utils/log';
import { cyan, bold, yellow, green } from 'chalk';

export const reporter: FileSizeReporter = (opt, outputOptions, info) => {
  return command(
    `${cyan(bold(info.fileName))}: bundle size ${yellow(info.bundleSize)} -> minified ${green(
      info.minSize,
    )}`,
  );
};
