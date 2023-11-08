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

export type TooltipDirectiveDisplayOnHoverOption = {
  displayOnHover: boolean;
};

export type TooltipDirectiveDisplayOnFocusOption = {
  displayOnFocus: boolean;
};

export type TooltipDirectivePositionOption = {
  position: TooltipPosition;
};

export type TooltipDirectiveOption = {
  displayOnHover: boolean;
  displayOnFocus: boolean;
  position: TooltipPosition;
};

export type TooltipElement<TElement extends any> = TElement | (() => TElement);

export type TooltipDirectiveAccessor = () => {
  element: TooltipElement<HTMLElement>;
} & Partial<TooltipDirectiveDisplayOnHoverOption> &
  Partial<TooltipDirectiveDisplayOnFocusOption> &
  Partial<TooltipDirectivePositionOption>;

export type TooltipDirective = (
  element: HTMLElement,
  accessor: TooltipDirectiveAccessor
) => void;

export type TooltipDirectiveDeclaration = {
  tooltip: RequireAtLeastOne<
    {
      element: TooltipElement<JSX.Element>;
    } & Partial<TooltipDirectiveDisplayOnHoverOption> &
      Partial<TooltipDirectiveDisplayOnFocusOption> &
      Partial<TooltipDirectivePositionOption>
  >;
};
