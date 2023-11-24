import type { TooltipDirectiveAccessor } from './types';

type TooltipPosition =
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

type TooltipDirectiveOption = {
  displayOnHover: boolean;
  displayOnFocus: boolean;
  position: TooltipPosition;
};

type TooltipsDirective = (
  element: HTMLElement,
  accessor: () => (TooltipDirectiveOption & {
    element: HTMLElement | (() => HTMLElement);
  })[]
) => void;

var tooltipContainerClassName = 'solid-js-tooltip-container' as const;
var tooltipClassName = 'solid-js-tooltip' as const;

const injectTooltip = (
  tooltipable: HTMLElement,
  option: TooltipDirectiveOption & {
    element: HTMLElement | (() => HTMLElement);
  }
) => {
  const tooltipElement =
    typeof option.element === 'function' ? option.element() : option.element;
  const tooltipDisplayOnHover = option?.displayOnHover || true;
  const tooltipDisplayOnFocus = option?.displayOnFocus || true;
  const tooltipPosition = option?.position || 'top-left';

  option = {
    element: tooltipElement,
    displayOnHover: tooltipDisplayOnHover,
    displayOnFocus: tooltipDisplayOnFocus,
    position: tooltipPosition,
  };

  tooltipElement.classList.add(tooltipClassName);
  tooltipElement.setAttribute('role', 'tooltip');
  tooltipElement.setAttribute('aria-labelledby', 'tooltip');
  tooltipElement.setAttribute('inert', '');
  tooltipElement.setAttribute('aria-hidden', '');
  tooltipElement.setAttribute('tabindex', '-1');

  tooltipable.classList.add(tooltipContainerClassName);
  tooltipable.appendChild(tooltipElement);

  tooltipable.classList.add(`${tooltipContainerClassName}_${option.position}`);
  tooltipElement.classList.add(`${tooltipClassName}_${option.position}`);

  if (option.displayOnHover) {
    tooltipElement.classList.add('solid-js-tooltip_hoverable');
  }

  if (option.displayOnFocus) {
    tooltipElement.classList.add('solid-js-tooltip_focusable');
  }
};

export const tooltips = ((element, accessor) => {
  let options = accessor() as Required<
    ReturnType<Parameters<TooltipsDirective>[1]>
  >;

  if (options.length === 1) {
    injectTooltip(element, options[0]);
  }

  options.forEach((option) => {
    injectTooltip(element, option);
  });
}) as TooltipsDirective;
