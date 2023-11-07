import { type JSX } from 'solid-js';
import type { RequireAtLeastOne } from '../types';

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

export type TooltipDirectiveOption = {
  // keepVisibleWhenHover: boolean;
  // displayOnFocus: boolean;
  // displayOnMouseenter: boolean;
  // cacheRender: boolean;
  position: TooltipPosition;
};

export type TooltipElement<TElement extends any> = TElement | (() => TElement);

export type TooltipDirectiveAccessor = () => {
  element: TooltipElement<HTMLElement>;
  position?: TooltipPosition;
};

export type TooltipDirective = (
  element: HTMLElement,
  accessor: TooltipDirectiveAccessor
) => void;

export type TooltipDirectiveDeclaration = {
  tooltip: RequireAtLeastOne<{
    element: TooltipElement<JSX.Element>;
    position?: TooltipPosition;
  }>;
};

/*
  // programmatically toggle tooltip
  {
    showTooltip: () => void;
    hideTooltip: () => void;
  }
*/
