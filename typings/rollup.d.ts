import { CSSPluginOptions } from 'rollup-plugin-scss';

declare module 'rollup-plugin-scss';
{
  export interface CSSPluginOptions {
    outputStyle?: 'compressed';
  }
  export default function scss(options?: CSSPluginOptions): Plugin;
}

export {};
