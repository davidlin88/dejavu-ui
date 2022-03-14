import { mkdir } from 'fs/promises';
import { series, parallel } from 'gulp';
import { runTask, withTaskName } from './utils/gulp';
import { run } from './utils/process';
import { antOutput } from './utils/paths';

export default series(
  withTaskName('clean', () => run('pnpm run clean')),
  withTaskName('createOutput', () => mkdir(antOutput, { recursive: true })),

  parallel(
    runTask('buildModules'),
    runTask('buildModuleStyle'),
    runTask('buildFullBundle'),
    runTask('buildFullStyle'),
  ),
);

export * from './modules';
export * from './full-bundle';
export * from './style';
