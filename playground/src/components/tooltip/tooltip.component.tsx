import { type Component, type JSX } from 'solid-js';
import './tooltip.styles.css';

export const Tooltip: Component<JSX.HTMLAttributes<HTMLDivElement>> = (
  props
) => {
  return (
    <div {...props} class={`${props?.class || ''} tltp`}>
      {props?.children}
    </div>
  );
};
