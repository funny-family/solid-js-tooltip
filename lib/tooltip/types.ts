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

export type TooltipsDirectiveDisplayOnHoverOption = {
  displayOnHover: boolean;
};

export type TooltipsDirectiveDisplayOnFocusOption = {
  displayOnFocus: boolean;
};

export type TooltipDirectivePositionOption = {
  position: TooltipPosition;
};

export type TooltipsDirectiveOption = {
  displayOnHover: boolean;
  displayOnFocus: boolean;
  position: TooltipPosition;
};

export type TooltipElement<TElement extends any> = TElement | (() => TElement);

export type TooltipDirectiveAccessor = () => Array<
  {
    element: TooltipElement<HTMLElement>;
  } & Partial<TooltipsDirectiveDisplayOnHoverOption> &
    Partial<TooltipsDirectiveDisplayOnFocusOption> &
    Partial<TooltipDirectivePositionOption>
>;

export type TooltipsDirective = (
  element: HTMLElement,
  accessor: TooltipDirectiveAccessor
) => void;

export type TooltipsDirectiveDeclaration = {
  tooltips: Array<
    RequireAtLeastOne<
      {
        element: TooltipElement<JSX.Element>;
      } & Partial<TooltipsDirectiveDisplayOnHoverOption> &
        Partial<TooltipsDirectiveDisplayOnFocusOption> &
        Partial<TooltipDirectivePositionOption>
    >
  >;
};
