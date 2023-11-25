import type { TooltipDirectiveAccessor } from './types';

var tooltipContainer = document.createElement('div');
tooltipContainer.setAttribute('class', 'solid-js-tooltip-container');
tooltipContainer.style.position = 'absolute';
tooltipContainer.style.display = 'block';
tooltipContainer.style.pointerEvents = 'none';
// tooltipContainer.style.width = 'inherit';
// tooltipContainer.style.height = 'inherit';
document.body.appendChild(tooltipContainer);

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

var injectTooltip = (args: {
  tooltipable: HTMLElement;
  option: TooltipDirectiveOption & {
    element: HTMLElement;
  };
}) => {
  args.option.element.classList.add(tooltipClassName);
  args.option.element.setAttribute('role', 'tooltip');
  args.option.element.setAttribute('aria-labelledby', 'tooltip');
  args.option.element.setAttribute('inert', '');
  args.option.element.setAttribute('aria-hidden', '');
  args.option.element.setAttribute('tabindex', '-1');

  args.tooltipable.classList.add(tooltipContainerClassName);
  args.tooltipable.appendChild(args.option.element);

  args.tooltipable.classList.add(
    `${tooltipContainerClassName}_${args.option.position}`
  );
  args.option.element.classList.add(
    `${tooltipClassName}_${args.option.position}`
  );

  if (args.option.displayOnHover) {
    args.option.element.classList.add('solid-js-tooltip_hoverable');
  }

  if (args.option.displayOnFocus) {
    args.option.element.classList.add('solid-js-tooltip_focusable');
  }
};

var createDefaultOption = (
  option: TooltipDirectiveOption & {
    element: HTMLElement | (() => HTMLElement);
  }
) => {
  const tooltipElement =
    typeof option.element === 'function' ? option.element() : option.element;
  // ????
  const tooltipDisplayOnHover = option?.displayOnHover ?? true;
  // ????
  const tooltipDisplayOnFocus = option?.displayOnFocus ?? true;
  const tooltipPosition = option?.position || 'top-left';

  return {
    element: tooltipElement,
    displayOnHover: tooltipDisplayOnHover,
    displayOnFocus: tooltipDisplayOnFocus,
    position: tooltipPosition,
  };
};

export var tooltips = ((element, accessor) => {
  const options = accessor() as Required<
    ReturnType<Parameters<TooltipsDirective>[1]>
  >;

  if (options.length === 1) {
    const option = createDefaultOption(options[0]);

    injectTooltip({
      tooltipable: element,
      option,
    });
  }

  options.forEach((_option) => {
    const option = createDefaultOption(_option);

    injectTooltip({
      tooltipable: element,
      option,
    });
  });
}) as TooltipsDirective;
