import { onCleanup } from 'solid-js';
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

var toDefault = (option: ReturnType<Parameters<TooltipsDirective>[1]>[0]) => {
  const tooltipElement =
    typeof option.element === 'function' ? option.element() : option.element;
  // ????
  const tooltipDisplayOnHover = option?.displayOnHover ?? true;
  // ????
  const tooltipDisplayOnFocus = option?.displayOnFocus ?? true;
  const tooltipPosition = option?.position || 'top-left';

  option = {
    element: tooltipElement,
    displayOnHover: tooltipDisplayOnHover,
    displayOnFocus: tooltipDisplayOnFocus,
    position: tooltipPosition,
  };
};

var unwrapElement = (element: HTMLElement | (() => HTMLElement)) =>
  typeof element === 'function' ? element() : element;

var positionTooltipRelativeToElement = (
  tooltipable: HTMLElement,
  tooltip: HTMLElement
) => {
  const rect = tooltipable.getBoundingClientRect();

  tooltip.style.top = `${rect.top + window.scrollY}px`;
  tooltip.style.left = `${rect.left + window.scrollX}px`;
};

export var tooltips1 = ((element, accessor) => {
  const options = accessor() as Required<
    ReturnType<Parameters<TooltipsDirective>[1]>
  >;

  const log = (event: Event): void => {
    console.group(event.type);
    console.log('target:', event.target);
    console.log('rect:', (event.target as HTMLElement).getBoundingClientRect());
    console.groupEnd();
  };

  options.forEach((option) => {
    const tooltipElement = unwrapElement(option.element);
    // ????
    const tooltipDisplayOnHover = option?.displayOnHover ?? true;
    // ????
    const tooltipDisplayOnFocus = option?.displayOnFocus ?? true;
    const tooltipPosition = option?.position || 'top-left';

    tooltipElement.classList.add('solid-js-tooltip');
    tooltipElement.setAttribute('role', 'tooltip');
    tooltipElement.setAttribute('aria-labelledby', 'tooltip');
    tooltipElement.setAttribute('inert', '');
    tooltipElement.setAttribute('aria-hidden', '');
    tooltipElement.setAttribute('tabindex', '-1');

    tooltipElement.style.position = 'absolute';
    tooltipElement.style.visibility = 'visible';

    option = {
      element: tooltipElement,
      displayOnHover: tooltipDisplayOnHover,
      displayOnFocus: tooltipDisplayOnFocus,
      position: tooltipPosition,
    };
  });

  const onMouseenter = (event: HTMLElementEventMap['mouseenter']): void => {
    log(event);

    options.forEach((option) => {
      if (option.displayOnHover === false) {
        return;
      }

      const tooltip = unwrapElement(option.element);
      const tooltipableRect = (
        event.target as HTMLElement
      ).getBoundingClientRect();

      tooltip.style.top = `${tooltipableRect.top + window.scrollY}px`;
      tooltip.style.left = `${tooltipableRect.left + window.scrollX}px`;

      tooltip.style.setProperty('--margin-x', '0px');
      tooltip.style.setProperty('--margin-y', '0px');

      if (option.position === 'top-left-corner') {
        tooltip.style.translate =
          'calc(-100% - var(--margin-x)) calc(-100% - var(--margin-y))';
      }

      if (option.position === 'top-left') {
        tooltip.style.translate =
          'calc(var(--margin-x)) calc(-100% - var(--margin-y))';
      }

      if (option.position === 'top-center') {
        //
      }

      if (option.position === 'top-right') {
        //
      }

      if (option.position === 'top-right-corner') {
        //
      }

      if (option.position === 'right-top') {
        //
      }

      if (option.position === 'right-center') {
        //
      }

      if (option.position === 'right-bottom') {
        //
      }

      if (option.position === 'bottom-right-corner') {
        //
      }

      if (option.position === 'bottom-right') {
        //
      }

      if (option.position === 'bottom-center') {
        //
      }

      if (option.position === 'bottom-left') {
        //
      }

      if (option.position === 'bottom-left-corner') {
        //
      }

      if (option.position === 'left-bottom') {
        //
      }

      if (option.position === 'left-center') {
        //
      }

      if (option.position === 'left-top') {
        //
      }

      // positionTooltipRelativeToElement(event.target as HTMLElement, tooltip);
      // tooltipContainer.appendChild(tooltip);
      document.body.appendChild(tooltip);
    });
  };

  const onMouseleave = (event: HTMLElementEventMap['mouseleave']): void => {
    log(event);

    options.forEach((option) => {
      if (option.displayOnHover === false) {
        return;
      }

      // tooltipContainer.removeChild(unwrapElement(option.element));
    });
  };

  const onFocusin = (event: HTMLElementEventMap['focusin']): void => {
    log(event);

    options.forEach((option) => {
      if (option.displayOnFocus === false) {
        return;
      }

      tooltipContainer.appendChild(unwrapElement(option.element));
    });
  };

  const onFocusout = (event: HTMLElementEventMap['focusout']): void => {
    log(event);

    options.forEach((option) => {
      if (option.displayOnFocus === false) {
        return;
      }

      tooltipContainer.removeChild(unwrapElement(option.element));
    });
  };

  element.addEventListener('mouseenter', onMouseenter);
  element.addEventListener('mouseleave', onMouseleave);
  element.addEventListener('focusin', onFocusin);
  element.addEventListener('focusout', onFocusout);

  onCleanup(() => {
    element.removeEventListener('mouseenter', onMouseenter);
    element.removeEventListener('mouseleave', onMouseleave);
    element.removeEventListener('focusin', onFocusin);
    element.removeEventListener('focusout', onFocusout);
  });
}) as TooltipsDirective;
