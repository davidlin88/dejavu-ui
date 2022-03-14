import { defineComponent, ref } from 'vue';
import classNames from '../_util/classNames';
import omit from '../_util/omit';
import { initDefaultProps } from '../_util/props-util';
import type { ContentRef } from './Content';
import Content from './Content';
import dialogPropTypes from './IDialogPropTypes';
import Mask from './Mask';
import { getMotionName } from './util';

export default defineComponent({
  name: 'Dialog',
  inheritAttrs: false,
  props: initDefaultProps(
    {
      ...dialogPropTypes(),
    },
    {
      mask: true,
      visible: false,
      keyboard: false,
      closable: true,
      maskClosable: true,
      destroyOnClose: false,
      prefixCls: 'rc-dialog',
      focusTriggerAfterClose: true,
    },
  ),
  setup(props, { attrs, slots }) {
    const wrapperRef = ref<HTMLDivElement>();
    const contentRef = ref<ContentRef>();

    // Events
    const onDialogVisibleChanged = () => {};
    const onInternalChange = (e: Event) => {
      props.onClose(e);
    };
    const onWrapperClick = (e: MouseEvent) => {
      if (!props.maskClosable) return null;
      if (wrapperRef.value === e.target) {
        onInternalChange(e);
      }
    };
    return () => {
      const {
        prefixCls,
        visible,
        maskTransitionName,
        maskAnimation,
        maskStyle,
        mask,
        zIndex,
        maskProps,
        wrapClassName,
        wrapStyle,
        wrapProps,
        transitionName,
        animation,
      } = props;
      const { style, class: className } = attrs;
      return (
        <div class={`${prefixCls}__root`}>
          <Mask
            prefixCls={prefixCls}
            visible={mask && visible}
            motionName={getMotionName(prefixCls, maskTransitionName, maskAnimation)}
            style={{ zIndex, ...maskStyle }}
            maskProps={maskProps}
          ></Mask>
          <div
            class={classNames(`${prefixCls}__wrap`, wrapClassName)}
            ref={wrapperRef}
            style={{ zIndex, ...wrapStyle, display: !visible ? 'none' : null }}
            {...wrapProps}
            onClick={onWrapperClick}
          >
            <Content
              {...omit(props, ['onClose'])}
              style={style}
              class={className}
              v-slots={slots}
              ref={contentRef}
              motionName={getMotionName(prefixCls, transitionName, animation)}
              onVisibleChange={onDialogVisibleChanged}
              onClose={onInternalChange}
            ></Content>
          </div>
        </div>
      );
    };
  },
});
