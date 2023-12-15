import { onCleanup } from 'solid-js';
import type { TooltipDirectiveFunction, TooltipPosition } from './types';

var tooltipMarginX_CssVar = '--tooltip-margin-x' as const;
var tooltipMarginY_CssVar = '--tooltip-margin-y' as const;
var tooltipableWidth_CssVar = '--tooltipable-width' as const;
var tooltipableHeight_CssVar = '--tooltipable-height' as const;

var unwrapElement = (element: HTMLElement | (() => HTMLElement)) =>
  typeof element === 'function' ? element() : element;

var createDefaultTooltipOption = (tooltipOption: {
  element: HTMLElement | (() => HTMLElement);
  position?: string;
  displayOnHover?: false;
  displayOnFocus?: false;
}) => {
  const tooltipElement = unwrapElement(tooltipOption.element);
  const tooltipDisplayOnHover =
    tooltipOption?.displayOnHover != null ? tooltipOption.displayOnHover : true;
  const tooltipDisplayOnFocus =
    tooltipOption?.displayOnFocus != null ? tooltipOption.displayOnFocus : true;
  const tooltipPosition = tooltipOption?.position || 'top-left';

  tooltipElement.style.position = 'absolute';
  tooltipElement.style.visibility = 'visible';
  tooltipElement.classList.add('solid-js-tooltip');
  tooltipElement.setAttribute('role', 'tooltip');
  tooltipElement.setAttribute('aria-labelledby', 'tooltip');
  tooltipElement.setAttribute('inert', '');
  tooltipElement.setAttribute('aria-hidden', '');
  tooltipElement.setAttribute('tabindex', '-1');

  return {
    element: tooltipElement,
    displayOnHover: tooltipDisplayOnHover,
    displayOnFocus: tooltipDisplayOnFocus,
    position: tooltipPosition,
  };
};

var setTooltipPosition = (
  tooltip: HTMLElement,
  position: TooltipPosition,
  tooltipable: HTMLElement
) => {
  const tooltipableRect = tooltipable.getBoundingClientRect();

  tooltip.style.top = `${tooltipableRect.top + window.scrollY}px`;
  tooltip.style.left = `${tooltipableRect.left + window.scrollX}px`;

  const tooltipableWidth = `${tooltipableRect.width}px` as const;
  const tooltipableHeight = `${tooltipableRect.height}px` as const;
  const tooltipDefaultMargin = '0px';

  tooltip.style.setProperty(tooltipMarginX_CssVar, tooltipDefaultMargin);
  tooltip.style.setProperty(tooltipMarginY_CssVar, tooltipDefaultMargin);
  tooltip.style.setProperty(tooltipableWidth_CssVar, tooltipableWidth);
  tooltip.style.setProperty(tooltipableHeight_CssVar, tooltipableHeight);

  if (position === 'top-left-corner') {
    tooltip.style.translate = `calc(-100% - var(${tooltipMarginX_CssVar})) calc(-100% - var(${tooltipMarginY_CssVar}))`;
  }

  if (position === 'top-left') {
    tooltip.style.translate = `calc(var(${tooltipMarginX_CssVar})) calc(-100% - var(${tooltipMarginY_CssVar}))`;
  }

  if (position === 'top-center') {
    tooltip.style.translate = `calc(-50% + (var(${tooltipableWidth_CssVar}) / 2) - var(${tooltipMarginX_CssVar})) calc(-100% - var(${tooltipMarginY_CssVar}))`;
  }

  if (position === 'top-right') {
    tooltip.style.translate = `calc(-100% + var(${tooltipableWidth_CssVar}) - var(${tooltipMarginX_CssVar})) calc(-100% - var(${tooltipMarginY_CssVar}))`;
  }

  if (position === 'top-right-corner') {
    tooltip.style.translate = `calc(var(${tooltipableWidth_CssVar}) - var(${tooltipMarginX_CssVar})) calc(-100% - var(${tooltipMarginY_CssVar}))`;
  }

  if (position === 'right-top') {
    tooltip.style.translate = `calc(var(${tooltipableWidth_CssVar}) - var(${tooltipMarginX_CssVar})) var(${tooltipMarginY_CssVar})`;
  }

  if (position === 'right-center') {
    tooltip.style.translate = `calc(var(${tooltipableWidth_CssVar}) - var(${tooltipMarginX_CssVar})) calc(-50% + (var(${tooltipableHeight_CssVar}) / 2) - var(${tooltipMarginY_CssVar}))`;
  }

  if (position === 'right-bottom') {
    tooltip.style.translate = `calc(var(${tooltipableWidth_CssVar}) - var(${tooltipMarginX_CssVar})) calc((var(${tooltipableHeight_CssVar}) - 100%) - var(${tooltipMarginY_CssVar}))`;
  }

  if (position === 'bottom-right-corner') {
    tooltip.style.translate = `calc(var(${tooltipableWidth_CssVar}) - var(${tooltipMarginX_CssVar})) calc(var(${tooltipableHeight_CssVar}) - var(${tooltipMarginY_CssVar}))`;
  }

  if (position === 'bottom-right') {
    tooltip.style.translate = `calc(-100% + var(${tooltipableWidth_CssVar}) - var(${tooltipMarginX_CssVar})) calc(var(${tooltipableHeight_CssVar}) - var(${tooltipMarginY_CssVar}))`;
  }

  if (position === 'bottom-center') {
    tooltip.style.translate = `calc(-50% + (var(${tooltipableWidth_CssVar}) / 2) - var(${tooltipMarginX_CssVar})) calc(var(${tooltipableHeight_CssVar}) - var(${tooltipMarginY_CssVar}))`;
  }

  if (position === 'bottom-left') {
    tooltip.style.translate = `calc(var(${tooltipMarginX_CssVar})) calc(var(${tooltipableHeight_CssVar}) - var(${tooltipMarginY_CssVar}))`;
  }

  if (position === 'bottom-left-corner') {
    tooltip.style.translate = `calc(-100% - var(${tooltipMarginX_CssVar})) calc(var(${tooltipableHeight_CssVar}) - var(${tooltipMarginY_CssVar}))`;
  }

  if (position === 'left-bottom') {
    tooltip.style.translate = `calc(-100% - var(${tooltipMarginX_CssVar})) calc((var(${tooltipableHeight_CssVar}) - 100%) - var(${tooltipMarginY_CssVar}))`;
  }

  if (position === 'left-center') {
    tooltip.style.translate = `calc(-100% - var(${tooltipMarginX_CssVar})) calc(-50% + (var(${tooltipableHeight_CssVar}) / 2) - var(${tooltipMarginY_CssVar}))`;
  }

  if (position === 'left-top') {
    tooltip.style.translate = `calc(-100% - var(${tooltipMarginX_CssVar})) calc(var(${tooltipMarginY_CssVar}))`;
  }
};

export const tooltip = (
  element: HTMLElement,
  accessor: () => {
    tooltips: {
      element: HTMLElement | (() => HTMLElement);
      position?: string;
      displayOnHover?: false;
      displayOnFocus?: false;
    }[];
    onMouseenter?: (event: Event) => void;
    onMouseleave?: (event: Event) => void;
    onFocusin?: (event: Event) => void;
    onFocusout?: (event: Event) => void;
  }
) => {
  const option = accessor();

  (option.tooltips as unknown) = option.tooltips.map((tooltipOption) => {
    return createDefaultTooltipOption(tooltipOption);
  });

  const inEvent = <TEvent extends Event>(
    event: TEvent,
    option: Required<
      ReturnType<Parameters<TooltipDirectiveFunction>[1]>['tooltips'][0]
    >
  ) => {
    const tooltip = unwrapElement(option.element);

    setTooltipPosition(tooltip, option.position, event.target as HTMLElement);

    document.body.appendChild(tooltip);
  };

  const outEvent = (
    option: Required<
      ReturnType<Parameters<TooltipDirectiveFunction>[1]>['tooltips'][0]
    >
  ) => {
    document.body.removeChild(unwrapElement(option.element));
  };

  const onMouseenter = function (
    this: HTMLElement,
    event: HTMLElementEventMap['mouseenter']
  ): void {
    option.tooltips.forEach((tooltipOption) => {
      if (tooltipOption.displayOnHover === false) {
        return;
      }

      inEvent(event, tooltipOption as any);
    });

    if (option?.onMouseenter != null) {
      option.onMouseenter!.bind(this)(event);
    }
  };

  const onMouseleave = function (
    this: HTMLElement,
    event: HTMLElementEventMap['mouseleave']
  ): void {
    option.tooltips.forEach((tooltipOption) => {
      if (tooltipOption.displayOnHover === false) {
        return;
      }

      outEvent(tooltipOption as any);
    });

    if (option?.onMouseleave != null) {
      option.onMouseleave!.bind(this)(event);
    }
  };

  const onFocusin = function (
    this: HTMLElement,
    event: HTMLElementEventMap['focusin']
  ): void {
    option.tooltips.forEach((tooltipOption) => {
      if (tooltipOption.displayOnFocus === false) {
        return;
      }

      inEvent(event, tooltipOption as any);
    });

    if (option?.onFocusin != null) {
      option.onFocusin!.bind(this)(event);
    }
  };

  const onFocusout = function (
    this: HTMLElement,
    event: HTMLElementEventMap['focusout']
  ): void {
    option.tooltips.forEach((tooltipOption) => {
      if (tooltipOption.displayOnFocus === false) {
        return;
      }

      outEvent(tooltipOption as any);
    });

    if (option?.onFocusout != null) {
      option.onFocusout!.bind(this)(event);
    }
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
};
