import { projRoot } from './paths';
import { green } from 'chalk';
import { spawn } from 'child_process';

export const run = async (command: string, cwd: string = projRoot) =>
  new Promise<void>((resolve, reject) => {
    const [cmd, ...args] = command.split(' ');
    console.log(`run: ${green(`${cmd} ${args.join(' ')}`)}`);
    // 启动子进程
    const app = spawn(cmd, args, {
      cwd,
      stdio: 'inherit',
      shell: process.platform === 'win32',
    });
    const onProcessExit = () => app.kill('SIGHUP');
    app.on('close', code => {
      // 子进程关闭时，移除监听主进程
      process.removeListener('exit', onProcessExit);
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed. \n Command: ${command} \n Code:${code}`));
      }
    });
    // 主进程退出时，子进程也退出
    process.on('exit', onProcessExit);
  });
