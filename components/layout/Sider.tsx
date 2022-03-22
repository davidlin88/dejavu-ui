import { CSSProperties, defineComponent, ref } from 'vue';
import classNames from '../_util/classNames';
import useConfigInject from '../_util/hooks/useConfigInject';
import isNumeric from '../_util/isNumeric';
import { initDefaultProps } from '../_util/props-util';
import PropTypes from '../_util/vue-types';
import RightOutlined from '@ant-design/icons-vue/RightOutlined';
import LeftOutlined from '@ant-design/icons-vue/LeftOutlined';

const siderProps = {
  defaultCollapsed: PropTypes.looseBool,
  trigger: PropTypes.any,
  collapsed: PropTypes.looseBool,
  collapsible: PropTypes.looseBool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  collapsedWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

const Sider = defineComponent({
  name: 'ALayoutSider',
  inheritAttrs: false,
  props: initDefaultProps(siderProps, {
    defaultCollapsed: false,
    width: 200,
    collapsedWidth: 80,
    collapsible: false,
  }),
  emits: ['update:collapsed'],
  setup(props, { emit, attrs, slots }) {
    const { trigger, collapsible } = props;
    const { prefixCls } = useConfigInject('layout-sider');
    const collapsed = ref(
      !!(props.collapsed !== undefined ? props.collapsed : props.defaultCollapsed),
    );

    const handleSetCollapsed = (value: boolean) => {
      if (props.collapsed === undefined) {
        collapsed.value = value;
      }
      emit('update:collapsed', value);
    };
    const toggle = () => {
      handleSetCollapsed(!collapsed.value);
    };

    return () => {
      const pre = prefixCls.value;
      const { width, collapsedWidth } = props;
      const rawWidth = collapsed.value ? collapsedWidth : width;
      const siderWidth = isNumeric(rawWidth) ? `${rawWidth}px` : String(rawWidth);

      const iconObj = {
        expanded: <LeftOutlined />,
        collapsed: <RightOutlined />,
      };
      const status = collapsed.value ? 'collapsed' : 'expanded';
      const defaultTrigger = iconObj[status];
      const triggerDom =
        trigger !== null ? (
          <div class={`${pre}__trigger`} onClick={toggle} style={{ width: siderWidth }}>
            {trigger || defaultTrigger}
          </div>
        ) : null;

      const siderStyle = {
        ...(attrs.style as CSSProperties),
        width: siderWidth,
      };
      const siderCls = classNames(pre, {
        [`${pre}--has-trigger`]: collapsible && trigger !== null,
      });
      return (
        <aside class={siderCls} style={siderStyle}>
          <div class={`${pre}__children`}>{slots.default?.()}</div>
          {collapsible ? triggerDom : null}
        </aside>
      );
    };
  },
});

export default Sider;
