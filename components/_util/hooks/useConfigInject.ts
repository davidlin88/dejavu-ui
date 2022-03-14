import type { ComputedRef } from 'vue';
import { computed } from 'vue';

export default (
  name: string,
): {
  prefixCls: ComputedRef<string>;
} => {
  const globalRrefixCls = 'ant';
  const prefixCls = computed(() => (name ? `${globalRrefixCls}-${name}` : globalRrefixCls));

  return {
    prefixCls,
  };
};
