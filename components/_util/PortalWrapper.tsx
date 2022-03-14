import { defineComponent, ref } from 'vue';
import Portal from './Portal';
import PropTypes from './vue-types';

const getParent = (getContainer: GetContainer) => {
  if (getContainer) {
    if (typeof getContainer === 'string') {
      return document.querySelectorAll(getContainer)[0];
    }
    if (typeof getContainer === 'function') {
      return getContainer();
    }
    if (typeof getContainer === 'object' && getContainer instanceof window.HTMLElement) {
      return getContainer;
    }
  }
  return document.body;
};

export type GetContainer = string | HTMLElement | (() => HTMLElement);

export default defineComponent({
  name: 'PortalWrapper',
  inheritAttrs: false,
  props: {
    wrapperClassName: PropTypes.string,
    forceRender: PropTypes.looseBool,
    getContainer: PropTypes.any,
    visible: PropTypes.looseBool,
  },
  setup(props, { slots }) {
    const container = ref<HTMLElement>();
    const componentRef = ref();

    const attachToParent = (force = false) => {
      if (force || (container.value && !container.value.parentNode)) {
        const parent = getParent(props.getContainer);
        if (parent) {
          parent.appendChild(container.value);
          return true;
        }
        return false;
      }
      true;
    };
    const getContainer = () => {
      if (!container.value) {
        container.value = document.createElement('div');
        attachToParent(true);
      }
      setWrapperClassName();
      return container.value;
    };
    const setWrapperClassName = () => {
      const { wrapperClassName } = props;
      if (container.value && wrapperClassName && wrapperClassName !== container.value.className) {
        container.value.className = wrapperClassName;
      }
    };

    return () => {
      const { forceRender, visible } = props;
      let portal = null;
      const childProps = {};
      if (forceRender || visible || componentRef.value) {
        portal = (
          <Portal
            getContainer={getContainer}
            ref={componentRef}
            v-slots={{ default: () => slots.default?.(childProps) }}
          ></Portal>
        );
      }
      return portal;
    };
  },
});
