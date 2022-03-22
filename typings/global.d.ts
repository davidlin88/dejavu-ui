/* eslint-disable @typescript-eslint/consistent-type-imports */
declare module 'vue' {
  export interface GlobalComponents {
    AModal: typeof import('ant-design-vue')['Modal'];
    ALayout: typeof import('ant-design-vue')['Layout'];
    ALayoutHeader: typeof import('ant-design-vue')['LayoutHeader'];
    ALayoutFooter: typeof import('ant-design-vue')['LayoutFooter'];
    ALayoutContent: typeof import('ant-design-vue')['LayoutContent'];
    ALayoutSider: typeof import('ant-design-vue')['LayoutSider'];
  }
}

export {};
