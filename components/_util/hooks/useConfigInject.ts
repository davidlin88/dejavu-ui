import type { ComputedRef } from 'vue';
import { computed } from 'vue';

export default (
  name: string,
): {
  prefixCls: ComputedRef<string>;
} => {
  const globalPrefixCls = 'ant';
  const prefixCls = computed(() => (name ? `${globalPrefixCls}-${name}` : globalPrefixCls));

  return {
    prefixCls,
  };
};
