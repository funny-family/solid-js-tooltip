import { onCleanup } from 'solid-js';
import type {
  ListenerObject,
  TooltipDirectiveAccessorArg,
  TooltipDirectiveFunction,
  TooltipDirectiveOption,
  TooltipPosition,
  ListenerCallback,
} from './tooltip.directive.types';
import type { DeepRequired } from '../../types';

var tooltipMarginX_CssVar = '--tooltip-margin-x' as const;
var tooltipMarginY_CssVar = '--tooltip-margin-y' as const;
var tooltipableWidth_CssVar = '--tooltipable-width' as const;
var tooltipableHeight_CssVar = '--tooltipable-height' as const;

var unwrapElement = (element: HTMLElement | (() => HTMLElement)) =>
  typeof element === 'function' ? element() : element;

var setDefaultEventListener = <
  TDefaultListener extends (...args: any[]) => void,
  TIncomingListener extends ListenerCallback<any>
>(
  defaultListener: TDefaultListener,
  incomingListener?: TIncomingListener
) => {
  return incomingListener == null
    ? defaultListener
    : function <TEvent extends Event>(this: HTMLElement, event: TEvent) {
        return incomingListener.apply(this, [event, defaultListener]);
      };
};

var createDefaultTooltipOption = (
  tooltipOption: TooltipDirectiveAccessorArg['tooltips'][0]
) => {
  const tooltipElement = unwrapElement(tooltipOption.element);
  const tooltipDisplayOnHover =
    tooltipOption?.displayOnHover != null ? tooltipOption.displayOnHover : true;
  const tooltipDisplayOnFocus =
    tooltipOption?.displayOnFocus != null ? tooltipOption.displayOnFocus : true;
  const tooltipPosition = tooltipOption?.position || 'top-left';

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

export const tooltip = ((element, accessor) => {
  element.setAttribute('data-tooltipable', 'true');

  const option = accessor() as DeepRequired<TooltipDirectiveAccessorArg>;

  (option.tooltips as unknown) = (
    option.tooltips as TooltipDirectiveAccessorArg['tooltips']
  ).map((tooltipOption) => {
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
    const tooltip = unwrapElement(option.element);

    if (tooltip != null) {
      try {
        document.body.removeChild(tooltip);
      } catch {}
    }
  };

  const onMouseenter: NonNullable<
    TooltipDirectiveOption['onMouseenter']
  >['listener'] = function (event) {
    option.tooltips.forEach((tooltipOption) => {
      if (tooltipOption.displayOnHover === false) {
        return;
      }

      inEvent(event, tooltipOption as any);
    });
  };

  const onMouseleave: NonNullable<
    TooltipDirectiveOption['onMouseleave']
  >['listener'] = function () {
    option.tooltips.forEach((tooltipOption) => {
      if (tooltipOption.displayOnHover === false) {
        return;
      }

      outEvent(tooltipOption as any);
    });
  };

  const onFocusin: NonNullable<
    TooltipDirectiveOption['onFocusin']
  >['listener'] = function (event) {
    option.tooltips.forEach((tooltipOption) => {
      if (tooltipOption.displayOnFocus === false) {
        return;
      }

      inEvent(event, tooltipOption as any);
    });
  };

  const onFocusout: NonNullable<
    TooltipDirectiveOption['onFocusout']
  >['listener'] = function (event) {
    option.tooltips.forEach((tooltipOption) => {
      if (tooltipOption.displayOnFocus === false) {
        return;
      }

      outEvent(tooltipOption as any);
    });
  };

  const onMouseenterEventListener = setDefaultEventListener(
    onMouseenter,
    option?.onMouseenter?.listener as any
  );
  const onMouseleaveEventListener = setDefaultEventListener(
    onMouseleave,
    option?.onMouseleave?.listener as any
  );
  const onFocusinEventListener = setDefaultEventListener(
    onFocusin,
    option?.onFocusin?.listener as any
  );
  const onFocusoutEventListener = setDefaultEventListener(
    onFocusout,
    option?.onFocusout?.listener as any
  );

  element.addEventListener(
    'mouseenter',
    onMouseenterEventListener as any,
    option?.onMouseenter
      ?.addEventListenerOptions as ListenerObject<'mouseenter'>['addEventListenerOptions']
  );
  element.addEventListener(
    'mouseleave',
    onMouseleaveEventListener as any,
    option?.onMouseenter
      ?.addEventListenerOptions as ListenerObject<'mouseleave'>['addEventListenerOptions']
  );
  element.addEventListener(
    'focusin',
    onFocusinEventListener as any,
    option?.onMouseenter
      ?.addEventListenerOptions as ListenerObject<'focusin'>['addEventListenerOptions']
  );
  element.addEventListener(
    'focusout',
    onFocusoutEventListener as any,
    option?.onMouseenter
      ?.addEventListenerOptions as ListenerObject<'focusout'>['addEventListenerOptions']
  );

  onCleanup(() => {
    element.removeEventListener(
      'mouseenter',
      onMouseenterEventListener as any,
      option?.onMouseenter
        ?.addEventListenerOptions as ListenerObject<'mouseenter'>['removeEventListenerOptions']
    );
    element.removeEventListener(
      'mouseleave',
      onMouseleaveEventListener as any,
      option?.onMouseenter
        ?.addEventListenerOptions as ListenerObject<'mouseleave'>['removeEventListenerOptions']
    );
    element.removeEventListener(
      'focusin',
      onFocusinEventListener as any,
      option?.onMouseenter
        ?.addEventListenerOptions as ListenerObject<'focusin'>['removeEventListenerOptions']
    );
    element.removeEventListener(
      'focusout',
      onFocusoutEventListener as any,
      option?.onMouseenter
        ?.addEventListenerOptions as ListenerObject<'focusout'>['removeEventListenerOptions']
    );
  });
}) as TooltipDirectiveFunction;
