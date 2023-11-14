import type { TooltipDirectiveAccessor } from './tooltip.types';

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

export const tooltips = ((element, accessor) => {
  let accessorValue = accessor() as Required<
    ReturnType<Parameters<TooltipsDirective>[1]>
  >;

  const tooltipContainerClassName = 'solid-js-tooltip-container';
  const tooltipClassName = 'solid-js-tooltip';

  accessorValue.forEach((tooltip) => {
    const tooltipElement =
      typeof tooltip.element === 'function'
        ? tooltip.element()
        : tooltip.element;
    const tooltipDisplayOnHover = tooltip?.displayOnHover || true;
    const tooltipDisplayOnFocus = tooltip?.displayOnFocus || true;
    const tooltipPosition = tooltip?.position || 'top-left';

    tooltip = {
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

    element.classList.add(tooltipContainerClassName);
    element.appendChild(tooltipElement);

    element.classList.add(`${tooltipContainerClassName}_${tooltip.position}`);
    tooltipElement.classList.add(`${tooltipClassName}_${tooltip.position}`);

    if (tooltip.displayOnHover) {
      tooltipElement.classList.add('solid-js-tooltip_hoverable');
    }

    if (tooltip.displayOnFocus) {
      tooltipElement.classList.add('solid-js-tooltip_focusable');
    }
  });
}) as TooltipsDirective;
