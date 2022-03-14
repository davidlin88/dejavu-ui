import { defineComponent, ref } from 'vue';
import PortalWrapper from '../_util/PortalWrapper';
import Dialog from './Dialog';
import type { IDialogChildProps } from './IDialogPropTypes';
import dialogPropTypes from './IDialogPropTypes';

const IDialogPropTypes = dialogPropTypes();
const DialogWrap = defineComponent({
  name: 'DialogWrap',
  inheritAttrs: false,
  props: {
    ...IDialogPropTypes,
    visible: IDialogPropTypes.visible.def(false),
  },
  setup(props, { attrs, slots }) {
    const animatedVisible = ref(props.visible);

    // as IDialogChildProps;
    return () => {
      const { visible, getContainer, forceRender, afterClose } = props;
      let dialogProps = {
        ...props,
        ...attrs,
        ref: '_component',
        key: 'dialog',
      };
      return (
        <PortalWrapper
          visible={visible}
          forceRender={forceRender}
          getContainer={getContainer}
          v-slots={{
            default: (childProps: IDialogChildProps) => {
              dialogProps = {
                ...dialogProps,
                ...childProps,
                afterClose: () => {
                  afterClose?.();
                  animatedVisible.value = false;
                },
              };
              return <Dialog {...dialogProps} v-slots={slots}></Dialog>;
            },
          }}
        ></PortalWrapper>
      );
    };
  },
});

export default DialogWrap;
