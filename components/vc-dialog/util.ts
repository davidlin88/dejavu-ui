// offset
/**
 * 获取window滚动值
 * @param w Window
 * @param top 是否返回top
 * @returns 滚动值
 */
function getScroll(w: Window, top?: boolean): number {
  let ret = w[`[page${top ? 'Y' : 'X'}]offset`];
  const method = `scroll${top ? 'Top' : 'Left'}`;
  if (typeof ret !== 'number') {
    const d = w.document;
    ret = d.documentElement[method];
    if (typeof ret !== 'number') {
      ret = d.body[method];
    }
  }
  return ret;
}

type CompatibleDocument = {
  parentWindow?: Window;
} & Document;

/**
 * 返回dom元素滚动位置
 * @param el dom对象
 * @returns 滚动位置
 */
export function offset(el: Element) {
  const rect = el.getBoundingClientRect();
  const pos = {
    left: rect.left,
    top: rect.top,
  };
  // 通过el获取document
  const doc = el.ownerDocument as CompatibleDocument;
  // 通过document获取window
  // doc.defaultView 兼容低版本firefox
  // doc.parentWindow 兼容IE8-
  const w = doc.defaultView || doc.parentWindow;
  pos.left += getScroll(w);
  pos.top += getScroll(w, true);
  return pos;
}

export function getMotionName(prefixCls: string, transitionName?: string, animationName?: string) {
  let motionName = transitionName;
  if (!motionName && animationName) {
    motionName = `${prefixCls}-${animationName}`;
  }
  return motionName;
}
