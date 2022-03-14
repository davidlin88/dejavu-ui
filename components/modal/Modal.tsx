import type { CSSProperties, PropType } from 'vue';
import { defineComponent } from 'vue';
import Dialog from '../vc-dialog/Dialog';
import { initDefaultProps } from '../_util/props-util';
import PropTypes from '../_util/vue-types';
import CloseOutlined from '@ant-design/icons-vue/CloseOutlined';
import useConfigInject from '../_util/hooks/useConfigInject';

const modalProps = () => ({
  prefixCls: String,
  visible: { type: Boolean, default: undefined },
  title: PropTypes.any,
  closable: { type: Boolean, default: undefined },
  footer: PropTypes.any,
  icon: PropTypes.any,
  maskClosable: { type: Boolean, default: undefined },
  destroyOnClose: { type: Boolean, default: undefined },
  wrapClassName: String,
  mask: { type: Boolean, default: undefined },
  width: [String, Number],
  'onUpdate:visible': Function as PropType<(visible: boolean) => void>,
  okText: PropTypes.any,
  cancelText: PropTypes.any,
  okButtonProps: Object as PropType<CSSProperties>,
  cancelButtonProps: Object as PropType<CSSProperties>,
});

export default defineComponent({
  name: 'AModal',
  inheritAttrs: false,
  props: initDefaultProps(modalProps(), {
    width: 520,
    visible: true,
  }),
  emits: ['update:visible', 'ok'],
  setup(props, { emit, slots, attrs }) {
    const handleCancel = () => {
      emit('update:visible', false);
    };
    const handleOk = () => {
      emit('ok');
    };

    const renderFooter = () => {
      const { okText, cancelText, okButtonProps, cancelButtonProps } = props;
      return (
        <div>
          <button onClick={handleCancel} {...cancelButtonProps}>
            {cancelText || 'Cancel'}
          </button>
          <button onClick={handleOk} {...okButtonProps}>
            {okText || 'OK'}
          </button>
        </div>
      );
    };
    return () => {
      const { prefixCls } = useConfigInject('modal');
      const { wrapClassName, visible } = props;
      const { ...restProps } = props;
      return (
        <Dialog
          {...attrs}
          {...restProps}
          prefixCls={prefixCls.value}
          visible={visible}
          onClose={handleCancel}
          wrapClassName={wrapClassName}
          v-slots={{
            ...slots,
            footer: renderFooter,
            closeIcon: () => {
              return (
                <span class={`${prefixCls.value}__close-x`}>
                  {<CloseOutlined class={`${prefixCls.value}-close-icon`}></CloseOutlined>}
                </span>
              );
            },
          }}
        ></Dialog>
      );
    };
  },
});
