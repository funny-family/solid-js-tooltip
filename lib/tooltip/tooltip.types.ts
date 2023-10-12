import { type JSX } from 'solid-js';
import type { RequireAtLeastOne } from '../types';

// type TooltipAccessor<TElement extends HTMLElement> = () => {
//   element: TElement;
// };

export type TooltipDirectiveOption = {
  keepVisibleWhenHover: boolean;
  displayOnFocus: boolean;
  displayOnMouseenter: boolean;
  onMouseenter: (this: HTMLElement, event: MouseEvent) => void;
  onMouseleave: (this: HTMLElement, event: MouseEvent) => void;
};

export type TooltipDirective = (
  element: HTMLElement,
  accessor: () => {
    element: HTMLElement;
    option?: TooltipDirectiveOption;
  }
) => void;

// type TooltipElement = JSX.Element | (() => JSX.Element);

export type TooltipDirectiveDeclaration = {
  tooltip: {
    element: JSX.Element | (() => JSX.Element);
    option?: RequireAtLeastOne<TooltipDirectiveOption>;
  };
};
