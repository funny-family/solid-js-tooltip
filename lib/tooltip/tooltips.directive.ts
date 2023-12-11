import { onCleanup, children } from 'solid-js';
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

// ===============================================================================

var tooltipMarginX_CssVar = '--tooltip-margin-x' as const;
var tooltipMarginY_CssVar = '--tooltip-margin-y' as const;
var tooltipableWidth_CssVar = '--tooltipable-width' as const;
var tooltipableHeight_CssVar = '--tooltipable-height' as const;

// var insertTooltip = (options)

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

export var tooltips1 = (
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

  console.log({ element, option });

  const log = (event: Event): void => {
    console.group(event.type);
    console.log('target:', event.target);
    console.log('rect:', (event.target as HTMLElement).getBoundingClientRect());
    console.groupEnd();
  };

  const defaultTooltipsOption = option.tooltips.map((tooltipOption) => {
    const tooltipElement = children(
      tooltipOption.element as any
    ) as unknown as () => HTMLElement;
    // ????
    const tooltipDisplayOnHover = tooltipOption?.displayOnHover ?? true;
    // ????
    const tooltipDisplayOnFocus = tooltipOption?.displayOnFocus ?? true;
    const tooltipPosition = tooltipOption?.position || 'top-left';

    tooltipElement().style.position = 'absolute';
    tooltipElement().style.visibility = 'visible';
    tooltipElement().classList.add('solid-js-tooltip');
    tooltipElement().setAttribute('role', 'tooltip');
    tooltipElement().setAttribute('aria-labelledby', 'tooltip');
    tooltipElement().setAttribute('inert', '');
    tooltipElement().setAttribute('aria-hidden', '');
    tooltipElement().setAttribute('tabindex', '-1');

    return {
      element: tooltipElement,
      displayOnHover: tooltipDisplayOnHover,
      displayOnFocus: tooltipDisplayOnFocus,
      position: tooltipPosition,
    };
  });
  // // @ts-ignore
  // option = null;
  // option = defaultOption;

  // @ts-ignore
  option.tooltips = defaultTooltipsOption;

  // console.log({ options });

  const inEvent = <TEvent extends Event>(
    event: TEvent,
    option: Required<ReturnType<Parameters<TooltipsDirective>[1]>>[0]
  ) => {
    const tooltip = unwrapElement(option.element);

    setTooltipPosition(tooltip, option.position, event.target as HTMLElement);

    document.body.appendChild(tooltip);
  };

  const outEvent = (
    option: Required<ReturnType<Parameters<TooltipsDirective>[1]>>[0]
  ) => {
    document.body.removeChild(unwrapElement(option.element));
  };

  const onMouseenter = function (
    this: HTMLElement,
    event: HTMLElementEventMap['mouseenter']
  ): void {
    // log(event);
    option.tooltips.forEach((tooltipOption) => {
      if (tooltipOption.displayOnHover === false) {
        return;
      }

      // @ts-ignore
      inEvent(event, tooltipOption);
    });

    if (option?.onMouseenter != null) {
      option.onMouseenter!.bind(this)(event);
    }
  };

  const onMouseleave = function (
    this: HTMLElement,
    event: HTMLElementEventMap['mouseleave']
  ): void {
    // log(event);
    option.tooltips.forEach((tooltipOption) => {
      if (tooltipOption.displayOnHover === false) {
        return;
      }

      // @ts-ignore
      outEvent(tooltipOption);
    });

    if (option?.onMouseleave != null) {
      option.onMouseleave!.bind(this)(event);
    }
  };

  const onFocusin = function (
    this: HTMLElement,
    event: HTMLElementEventMap['focusin']
  ): void {
    // log(event);
    option.tooltips.forEach((tooltipOption) => {
      if (tooltipOption.displayOnFocus === false) {
        return;
      }

      // @ts-ignore
      inEvent(event, tooltipOption);
    });

    if (option?.onFocusin != null) {
      option.onFocusin!.bind(this)(event);
    }
  };

  const onFocusout = function (
    this: HTMLElement,
    event: HTMLElementEventMap['focusout']
  ): void {
    // log(event);
    option.tooltips.forEach((tooltipOption) => {
      if (tooltipOption.displayOnFocus === false) {
        return;
      }

      // @ts-ignore
      outEvent(tooltipOption);
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

// ===============================================================================
