import type { InjectionKey, Ref } from 'vue';
import { inject, computed, provide } from 'vue';

export interface PortalContextProps {
  shouldRender: Ref<boolean>;
  inTriggerContext: boolean; // 仅处理 trigger 上下文的 portal
}
const PortalContextKey: InjectionKey<PortalContextProps> = Symbol('PortalContextKey');
export const useProvidePortal = (config = { inTriggerContext: true }) => {
  provide(PortalContextKey, {
    inTriggerContext: config.inTriggerContext,
    shouldRender: computed(() => {
      const shouldRender = false;
      return shouldRender;
    }),
  });
};
export const useInjectPortal = () => {
  // provide 默认值，shouldRender为 true
  useProvidePortal({ inTriggerContext: false });
  const portalContext = inject(PortalContextKey, {
    shouldRender: computed(() => false),
    inTriggerContext: false,
  });
  return {
    shouldRender: computed(
      () => portalContext.shouldRender.value || portalContext.inTriggerContext === false,
    ),
  };
};
