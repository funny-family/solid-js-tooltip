import type {
  TooltipDirective,
  TooltipDirectiveAccessor,
} from './tooltip.types';

var tooltipSharedZIndex = 0;

export const tooltip = ((element, accessor) => {
  tooltipSharedZIndex += 1;

  let accessorValue = accessor() as Required<
    ReturnType<TooltipDirectiveAccessor>
  >;

  const tooltipElement =
    typeof accessorValue.element === 'function'
      ? accessorValue.element()
      : accessorValue.element;
  const tooltipPosition = accessorValue?.position || 'top-left';

  accessorValue = {
    element: tooltipElement,
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
  tooltipElement.style.zIndex = `${tooltipSharedZIndex}`;

  element.classList.add(tooltipContainerClassName);
  element.appendChild(tooltipElement);

  if ((accessorValue.position as string) !== '') {
    element.classList.add(
      `${tooltipContainerClassName}_${accessorValue.position}`
    );
    tooltipElement.classList.add(
      `${tooltipClassName}_${accessorValue.position}`
    );
  }
}) as TooltipDirective;
