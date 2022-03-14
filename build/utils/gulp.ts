import type { TaskFunction } from 'gulp';
import { run } from './process';
/**
 * 给自定义任务命名
 * @param name 任务名
 * @param fn 自定义任务
 * @returns 带名字的自定义任务
 */
export const withTaskName = <T extends TaskFunction>(name: string, fn: T) =>
  Object.assign(fn, { displayName: name });

/**
 * 运行指定build任务
 * @param name 任务名
 * @returns 带名字的build gulp任务
 */
export const runTask = (name: string) => withTaskName(name, () => run(`pnpm run build ${name}`));
