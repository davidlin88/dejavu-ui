import { defineComponent, onBeforeMount, Teleport } from 'vue';
import { useInjectPortal } from '../vc-trigger/context';
import PropTypes from './vue-types';

export default defineComponent({
  name: 'Portal',
  inheritAttrs: false,
  props: {
    getContainer: PropTypes.func.isRequired,
  },
  setup(props, { slots }) {
    const { shouldRender } = useInjectPortal();
    let container: HTMLElement;
    onBeforeMount(() => {
      if (shouldRender.value) {
        container = props.getContainer();
      }
    });

    return () => {
      if (!shouldRender) return null;
      return container ? <Teleport to={container} v-slot={slots}></Teleport> : null;
    };
  },
});
