import { computed, createVNode, defineComponent, ref } from 'vue';
import useConfigInject from '../_util/hooks/useConfigInject';
import PropTypes from '../_util/vue-types';

type generatorArgument = {
  suffixCls: string;
  tagName: 'header' | 'footer' | 'main' | 'section';
  name: string;
};
export const basicProps = {
  prefixCls: PropTypes.string,
  hasSider: PropTypes.looseBool,
  tagName: PropTypes.string,
};
const Basic = defineComponent({
  props: basicProps,
  setup(props, { slots }) {
    return () => createVNode(props.tagName, { class: props.prefixCls }, slots);
  },
});
function generator({ suffixCls, tagName, name }: generatorArgument) {
  return (BasicComponent: typeof Basic) => {
    const Adapter = defineComponent({
      name,
      props: basicProps,
      setup(props, { slots }) {
        const { prefixCls } = useConfigInject(suffixCls);
        return () => {
          const basicComponentProps = {
            ...props,
            prefixCls: prefixCls.value,
            tagName,
          };
          return <BasicComponent {...basicComponentProps} v-slots={slots}></BasicComponent>;
        };
      },
    });
    return Adapter;
  };
}

const BasicLayout = defineComponent({
  props: basicProps,
  setup(props, { slots }) {
    const siders = ref<string[]>([]);
    const divCls = computed(() => {
      const { prefixCls, hasSider } = props;
      return {
        [`${prefixCls}`]: true,
        [`${prefixCls}--has-sider`]:
          typeof hasSider === 'boolean' ? hasSider : siders.value.length > 0,
      };
    });
    return () => {
      const { tagName } = props;
      return createVNode(tagName, { class: divCls.value }, slots);
    };
  },
});

const Layout = generator({
  suffixCls: 'layout',
  tagName: 'section',
  name: 'ALayout',
})(BasicLayout);

const Header = generator({
  suffixCls: 'layout-header',
  tagName: 'header',
  name: 'ALayoutHeader',
})(Basic);
const Footer = generator({
  suffixCls: 'layout-footer',
  tagName: 'footer',
  name: 'ALayoutFooter',
})(Basic);
const Content = generator({
  suffixCls: 'layout-content',
  tagName: 'main',
  name: 'ALayoutContent',
})(Basic);

export { Header, Footer, Content };

export default Layout;
