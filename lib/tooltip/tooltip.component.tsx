import { type JSX, type Component, splitProps } from 'solid-js';
import type { TooltipPosition } from './types';

export type TooltipAttrs = Omit<JSX.HTMLElementTags['div'], 'children'> & {
  children?: Node | (string & {}) | number | boolean;
};

export type TooltipProps = {
  element: JSX.Element;
  position?: TooltipPosition;
};

export type TooltipAttrsAndProps = TooltipAttrs & TooltipProps;

export type TooltipComponent = Component<TooltipAttrsAndProps>;

type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

// const tooltipContainerClassName = 'solid-js-tooltip-container';
//   const tooltipClassName = 'solid-js-tooltip';

export const Tooltip: TooltipComponent = (attrsAndProps) => {
  const { 0: props, 1: attrs } = splitProps(
    attrsAndProps as WithRequired<TooltipAttrsAndProps, 'position'>,
    ['element', 'position']
  );
  props.position ||= 'top-left';

  const tooltipName = 'tooltip';

  console.log({ props, attrs });

  return (
    <div
      {...attrs}
      class={`${attrs?.class} solid-js-tooltip`}
      role={attrs?.role || tooltipName}
      aria-labelledby={attrs?.['aria-labelledby'] || tooltipName}
      tabIndex={-1}
      inert={attrs?.inert == null ? true : attrs.inert}
      aria-hidden={attrs?.['aria-hidden'] == null ? true : attrs['aria-hidden']}
    />
  );
};
