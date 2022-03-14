import type { CSSProperties, PropType } from 'vue';
import { computed, defineComponent, ref } from 'vue';
import type { MouseEventHandler } from '../_util/EventInterface';
import dialogPropTypes from './IDialogPropTypes';

export type ContentRef = {};

export default defineComponent({
  name: 'Content',
  inheritAttrs: false,
  props: {
    ...dialogPropTypes(),
    motionName: String,
    ariaId: String,
    onVisibleChange: Function as PropType<(visible: boolean) => void>,
    onMousedown: Function as PropType<MouseEventHandler>,
    onMouseup: Function as PropType<MouseEventHandler>,
  },
  setup(props, { expose, slots, attrs }) {
    const sentinelStartRef = ref<HTMLDivElement>();
    const sentinelEndRef = ref<HTMLDivElement>();
    expose({
      focus: () => {
        sentinelStartRef.value?.focus();
      },
      changeActive: next => {
        const { activeElement } = document;
        if (next && activeElement === sentinelEndRef.value) {
          sentinelStartRef.value.focus();
        } else if (!next && activeElement === sentinelStartRef.value) {
          sentinelEndRef.value.focus();
        }
      },
    });
    const transformOrigin = ref<string>();
    const contentStyleRef = computed(() => {
      const { width, height } = props;
      const contentStyle: CSSProperties = {};
      if (width !== undefined) {
        contentStyle.width = typeof width === 'number' ? `${width}px` : width;
      }
      if (height !== undefined) {
        contentStyle.height = typeof height === 'number' ? `${height}px` : height;
      }
      if (transformOrigin.value) {
        contentStyle.transformOrigin = transformOrigin.value;
      }
      return contentStyle;
    });

    return () => {
      const {
        prefixCls,
        footer = slots.footer?.(),
        title = slots.title?.(),
        closable,
        onClose,
        closeIcon = slots.closeIcon?.(),
        bodyStyle,
        bodyProps,
        visible,
        destroyOnClose,
        onMousedown,
        onMouseup,
      } = props;

      let footerNode: any;
      if (footer) {
        footerNode = <div class={`${prefixCls}__footer`}>{footer}</div>;
      }

      let headerNode: any;
      if (title) {
        headerNode = (
          <div class={`${prefixCls}__header`}>
            <div class={`${prefixCls}__title`}>{title}</div>
          </div>
        );
      }

      let closer: any;
      if (closable) {
        closer = (
          <button type="button" onClick={onClose} class={`${prefixCls}__close`}>
            {closeIcon || <span class={`${prefixCls}__close-x`}></span>}
          </button>
        );
      }

      const content = (
        <div class={`${prefixCls}__content`}>
          {closer}
          {headerNode}
          <div class={`${prefixCls}__body`} style={bodyStyle} {...bodyProps}>
            {slots.default?.()}
          </div>
          {footerNode}
        </div>
      );
      return visible || !destroyOnClose ? (
        <div
          {...attrs}
          v-show={visible}
          style={{ ...contentStyleRef.value, ...(attrs.style as any) }}
          class={[prefixCls, attrs.class]}
          onMousedown={onMousedown}
          onMouseup={onMouseup}
        >
          {content}
        </div>
      ) : null;
    };
  },
});
