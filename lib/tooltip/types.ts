import { type JSX } from 'solid-js';

export type TooltipPosition =
  | 'top-left-corner'
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'top-right-corner'
  | 'right-top'
  | 'right-center'
  | 'right-bottom'
  | 'bottom-right-corner'
  | 'bottom-right'
  | 'bottom-center'
  | 'bottom-left'
  | 'bottom-left-corner'
  | 'left-bottom'
  | 'left-center'
  | 'left-top';

type TooltipDirectiveOption_tooltip<TElement extends unknown> = {
  element: TElement;
  position?: TooltipPosition;
  displayOnHover?: boolean;
  displayOnFocus?: boolean;
};

type TooltipableEventCallback<TEventName extends keyof GlobalEventHandlersEventMap> = (
  this: HTMLElement,
  event: HTMLElementEventMap[TEventName]
) => void;

export type TooltipDirectiveOption = {
  tooltips: TooltipDirectiveOption_tooltip<JSX.Element>[];
  onMouseenter?: TooltipableEventCallback<'mouseenter'>;
  onMouseleave?: TooltipableEventCallback<'mouseleave'>;
  onFocusin?: TooltipableEventCallback<'focusin'>;
  onFocusout?: TooltipableEventCallback<'focusout'>;
};

// "use:tooltip={...}"
export type TooltipDirective = {
  tooltip: TooltipDirectiveOption;
};

export type TooltipDirectiveFunction = (
  element: HTMLElement,
  accessor: () => Omit<TooltipDirectiveOption, 'tooltips'> & {
    tooltips: TooltipDirectiveOption_tooltip<
      HTMLElement | (() => HTMLElement)
    >[];
  }
) => void;
