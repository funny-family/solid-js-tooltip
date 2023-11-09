import type {
  TooltipDirective,
  TooltipDirectiveAccessor,
} from './tooltip.types';

export const tooltip = ((element, accessor) => {
  let accessorValue = accessor() as Required<
    ReturnType<TooltipDirectiveAccessor>
  >;

  const tooltipElement =
    typeof accessorValue.element === 'function'
      ? accessorValue.element()
      : accessorValue.element;
  const tooltipDisplayOnHover = accessorValue?.displayOnHover || true;
  const tooltipDisplayOnFocus = accessorValue?.displayOnFocus || true;
  const tooltipPosition = accessorValue?.position || 'top-left';

  accessorValue = {
    element: tooltipElement,
    displayOnHover: tooltipDisplayOnHover,
    displayOnFocus: tooltipDisplayOnFocus,
    position: tooltipPosition,
  };

  console.log({ accessorValue, tooltipElement });

  const tooltipContainerClassName = 'solid-js-tooltip-container';
  const tooltipClassName = 'solid-js-tooltip';

  tooltipElement.classList.add(tooltipClassName);
  tooltipElement.setAttribute('role', 'tooltip');
  tooltipElement.setAttribute('aria-labelledby', 'tooltip');
  tooltipElement.setAttribute('inert', '');
  tooltipElement.setAttribute('aria-hidden', '');
  tooltipElement.setAttribute('tabindex', '-1');

  element.classList.add(tooltipContainerClassName);
  element.appendChild(tooltipElement);

  element.classList.add(
    `${tooltipContainerClassName}_${accessorValue.position}`
  );
  tooltipElement.classList.add(`${tooltipClassName}_${accessorValue.position}`);

  if (accessorValue.displayOnHover) {
    tooltipElement.classList.add('solid-js-tooltip_hoverable');
  }

  if (accessorValue.displayOnFocus) {
    tooltipElement.classList.add('solid-js-tooltip_focusable');
  }
}) as TooltipDirective;
