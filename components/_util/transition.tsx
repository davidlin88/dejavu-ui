import { Transition } from 'vue';
import type { TransitionProps } from 'vue';

export const getTransitionProps = (transitonName: string, opt: TransitionProps = {}) => {
  if (process.env.NODE_ENV === 'test') {
    return opt;
  }
  const transitionProps: TransitionProps = transitonName
    ? {
        appear: true,
        enterFromClass: `${transitonName}-enter ${transitonName}-enter-prepare`,
        enterActiveClass: `${transitonName}-enter ${transitonName}-enter-prepare`,
        enterToClass: `${transitonName}-enter ${transitonName}-enter-active`,
        leaveFromClass: `${transitonName}-leave`,
        leaveActiveClass: `${transitonName}-leave ${transitonName}-leave-active`,
        leaveToClass: `${transitonName}-leave ${transitonName}-leave-active`,
        ...opt,
      }
    : { css: false, ...opt };
  return transitionProps;
};

export default Transition;
