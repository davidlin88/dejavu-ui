import type { ExtractPropTypes } from 'vue';
import PropTypes from '../_util/vue-types';

function dialogPropTypes() {
  return {
    keyboard: PropTypes.looseBool,
    mask: PropTypes.looseBool,
    afterClose: PropTypes.func,
    closable: PropTypes.looseBool,
    maskClosable: PropTypes.looseBool,
    visible: PropTypes.looseBool,
    destroyOnClose: PropTypes.looseBool,
    mousePosition: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
    transitionName: PropTypes.string,
    maskTransitionName: PropTypes.string,
    // ? any? start
    title: PropTypes.any,
    footer: PropTypes.any,
    animation: PropTypes.any,
    maskAnimation: PropTypes.any,
    bodyProps: PropTypes.any,
    closeIcon: PropTypes.any,
    // ? end
    wrapStyle: PropTypes.object,
    bodyStyle: PropTypes.object,
    maskStyle: PropTypes.object,
    prefixCls: PropTypes.string,
    wrapClassName: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    zIndex: PropTypes.number,
    maskProps: PropTypes.any,
    wrapProps: PropTypes.any,
    getContainer: PropTypes.any,
    dialogStyle: PropTypes.object,
    dialogClass: PropTypes.string,
    forceRender: PropTypes.looseBool,
    getOpenCount: PropTypes.func,
    focusTriggerAfterClose: PropTypes.looseBool,
    onClose: PropTypes.func,
    modalRender: PropTypes.func,
  };
}

/**
 * dialog子项属性
 * ? 干嘛的
 */
export type IDialogChildProps = Partial<ExtractPropTypes<ReturnType<typeof dialogPropTypes>>>;
export default dialogPropTypes;
