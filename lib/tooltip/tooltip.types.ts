import { type JSX } from 'solid-js';
import type { RequireAtLeastOne } from '../types';

// type TooltipAccessor<TElement extends HTMLElement> = () => {
//   element: TElement;
// };

export type TooltipDirective = (
  element: HTMLElement,
  accessor: () => {
    element: HTMLElement;
    option?: {
      optionString?: string;
      optionNumber?: number;
      optionFunction?: Function;
    };
  }
) => void;

// type TooltipElement = JSX.Element | (() => JSX.Element);

export type TooltipDirectiveDeclaration = {
  tooltip: {
    element: JSX.Element | (() => JSX.Element);
    option?: RequireAtLeastOne<{
      optionString?: string;
      optionNumber?: number;
      optionFunction?: Function;
    }>;
  };
};
