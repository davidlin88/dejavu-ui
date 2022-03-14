/* eslint-disable @typescript-eslint/consistent-type-imports */
declare module 'vue' {
  export interface GlobalComponents {
    AModal: typeof import('ant-design-vue')['Modal'];
  }
}

export {};
