export type TooltipDirective = <
  TElement extends HTMLElement,
  TValue extends any
>(
  el: TElement,
  value: TValue
) => void;
