import { onCleanup, $PROXY, For, children } from 'solid-js';
import { createMutable } from 'solid-js/store';
import type {
  ListenerObject,
  TooltipDirectiveAccessorArg,
  TooltipDirectiveFunction,
  TooltipDirectiveOption,
  TooltipPosition,
  ListenerCallback,
  TooltipOption,
} from './tooltip.directive.types';
import type { DeepRequired } from '../../types';

var tooltipMarginX_CssVar = '--tooltip-margin-x' as const;
var tooltipMarginY_CssVar = '--tooltip-margin-y' as const;
var tooltipableWidth_CssVar = '--tooltipable-width' as const;
var tooltipableHeight_CssVar = '--tooltipable-height' as const;

var unwrapElement = (element: HTMLElement | (() => HTMLElement)) => {
  return typeof element === 'function' ? element() : element;
};

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

var createDefaultTooltipOption = (option: TooltipOption<HTMLElement>) => {
  const position = option?.position || 'top-left';

  option.element.setAttribute('data-tooltip-position', position);

  return {
    element: option.element,
    position,
    displayOnHover:
      option?.displayOnHover != null ? option.displayOnHover : true,
    displayOnFocus:
      option?.displayOnFocus != null ? option.displayOnFocus : true,
  };
};

type CreateTranslate3dStyle = (tx: string, ty: string) => string;
var createTranslate3dStyle: CreateTranslate3dStyle = (tx, ty) => {
  return `translate3d(${tx}, ${ty}, 0)`;
};

var setTooltipPosition = (
  tooltip: HTMLElement,
  position: TooltipPosition,
  tooltipable: HTMLElement
) => {
  const tooltipableRect = tooltipable.getBoundingClientRect();

  tooltip.style.top = `${tooltipableRect.top + window.scrollY}px`;
  tooltip.style.left = `${tooltipableRect.left + window.scrollX}px`;
  tooltip.style.willChange = 'transform';

  const tooltipableWidth = `${tooltipableRect.width}px` as const;
  const tooltipableHeight = `${tooltipableRect.height}px` as const;
  const tooltipDefaultMargin = '0px';

  tooltip.style.setProperty(tooltipMarginX_CssVar, tooltipDefaultMargin);
  tooltip.style.setProperty(tooltipMarginY_CssVar, tooltipDefaultMargin);
  tooltip.style.setProperty(tooltipableWidth_CssVar, tooltipableWidth);
  tooltip.style.setProperty(tooltipableHeight_CssVar, tooltipableHeight);

  if (position === 'top-left-corner') {
    tooltip.style.transform = createTranslate3dStyle(
      `calc(-100% + var(${tooltipMarginX_CssVar}))`,
      `calc(-100% - var(${tooltipMarginY_CssVar}))`
    );
  }

  if (position === 'top-left') {
    tooltip.style.transform = createTranslate3dStyle(
      `var(${tooltipMarginX_CssVar})`,
      `calc(-100% - var(${tooltipMarginY_CssVar}))`
    );
  }

  if (position === 'top-center') {
    tooltip.style.transform = createTranslate3dStyle(
      `calc(-50% + (var(${tooltipableWidth_CssVar}) / 2) + var(${tooltipMarginX_CssVar}))`,
      `calc(-100% - var(${tooltipMarginY_CssVar}))`
    );
  }

  if (position === 'top-right') {
    tooltip.style.transform = createTranslate3dStyle(
      `calc(-100% + var(${tooltipableWidth_CssVar}) + var(${tooltipMarginX_CssVar}))`,
      `calc(-100% - var(${tooltipMarginY_CssVar}))`
    );
  }

  if (position === 'top-right-corner') {
    tooltip.style.transform = createTranslate3dStyle(
      `calc(var(${tooltipableWidth_CssVar}) + var(${tooltipMarginX_CssVar}))`,
      `calc(-100% - var(${tooltipMarginY_CssVar}))`
    );
  }

  if (position === 'right-top') {
    tooltip.style.transform = createTranslate3dStyle(
      `calc(var(${tooltipableWidth_CssVar}) + var(${tooltipMarginX_CssVar}))`,
      `calc(-1 * var(${tooltipMarginY_CssVar}))`
    );
  }

  if (position === 'right-center') {
    tooltip.style.transform = createTranslate3dStyle(
      `calc(var(${tooltipableWidth_CssVar}) + var(${tooltipMarginX_CssVar}))`,
      `calc(-50% + (var(${tooltipableHeight_CssVar}) / 2) - var(${tooltipMarginY_CssVar}))`
    );
  }

  if (position === 'right-bottom') {
    tooltip.style.transform = createTranslate3dStyle(
      `calc(var(${tooltipableWidth_CssVar}) + var(${tooltipMarginX_CssVar}))`,
      `calc((var(${tooltipableHeight_CssVar}) - 100%) - var(${tooltipMarginY_CssVar}))`
    );
  }

  if (position === 'bottom-right-corner') {
    tooltip.style.transform = createTranslate3dStyle(
      `calc(var(${tooltipableWidth_CssVar}) - var(${tooltipMarginX_CssVar}))`,
      `calc(var(${tooltipableHeight_CssVar}) - var(${tooltipMarginY_CssVar}))`
    );
  }

  if (position === 'bottom-right') {
    tooltip.style.transform = createTranslate3dStyle(
      `calc(-100% + var(${tooltipableWidth_CssVar}) - var(${tooltipMarginX_CssVar}))`,
      `calc(var(${tooltipableHeight_CssVar}) - var(${tooltipMarginY_CssVar}))`
    );
  }

  if (position === 'bottom-center') {
    tooltip.style.transform = createTranslate3dStyle(
      `calc(-50% + (var(${tooltipableWidth_CssVar}) / 2) - var(${tooltipMarginX_CssVar}))`,
      `calc(var(${tooltipableHeight_CssVar}) - var(${tooltipMarginY_CssVar}))`
    );
  }

  if (position === 'bottom-left') {
    tooltip.style.transform = createTranslate3dStyle(
      `var(${tooltipMarginX_CssVar})`,
      `calc(var(${tooltipableHeight_CssVar}) - var(${tooltipMarginY_CssVar}))`
    );
  }

  if (position === 'bottom-left-corner') {
    tooltip.style.transform = createTranslate3dStyle(
      `calc(-100% - var(${tooltipMarginX_CssVar}))`,
      `calc(var(${tooltipableHeight_CssVar}) - var(${tooltipMarginY_CssVar}))`
    );
  }

  if (position === 'left-bottom') {
    tooltip.style.transform = createTranslate3dStyle(
      `calc(-100% - var(${tooltipMarginX_CssVar}))`,
      `calc((var(${tooltipableHeight_CssVar}) - 100%) - var(${tooltipMarginY_CssVar}))`
    );
  }

  if (position === 'left-center') {
    tooltip.style.transform = createTranslate3dStyle(
      `calc(-100% - var(${tooltipMarginX_CssVar}))`,
      `calc(-50% + (var(${tooltipableHeight_CssVar}) / 2) - var(${tooltipMarginY_CssVar}))`
    );
  }

  if (position === 'left-top') {
    tooltip.style.transform = createTranslate3dStyle(
      `calc(-100% - var(${tooltipMarginX_CssVar}))`,
      `var(${tooltipMarginY_CssVar})`
    );
  }
};

export const tooltip = ((element, accessor) => {
  element.setAttribute('data-is-tooltipable', 'true');

  const option = accessor() as DeepRequired<TooltipDirectiveAccessorArg>;

  (option.tooltips as unknown) = (
    option.tooltips as TooltipDirectiveAccessorArg['tooltips']
  ).map((tooltipOption) => {
    return createDefaultTooltipOption({
      element: children(
        () => tooltipOption.element as HTMLElement
      )() as HTMLElement,
      position: tooltipOption.position,
      displayOnHover: tooltipOption.displayOnHover,
      displayOnFocus: tooltipOption.displayOnFocus,
    });
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
        // document.body.removeChild(tooltip);
      } catch {}
    }
  };

  const onMouseEnter: NonNullable<
    TooltipDirectiveOption['onMouseEnter']
  >['listener'] = function (event) {
    option.tooltips.forEach((tooltipOption) => {
      if (tooltipOption.displayOnHover === false) {
        return;
      }

      inEvent(event, tooltipOption as any);
    });
  };

  const onMouseLeave: NonNullable<
    TooltipDirectiveOption['onMouseLeave']
  >['listener'] = function () {
    option.tooltips.forEach((tooltipOption) => {
      if (tooltipOption.displayOnHover === false) {
        return;
      }

      outEvent(tooltipOption as any);
    });
  };

  const onFocusIn: NonNullable<
    TooltipDirectiveOption['onFocusIn']
  >['listener'] = function (event) {
    option.tooltips.forEach((tooltipOption) => {
      if (tooltipOption.displayOnFocus === false) {
        return;
      }

      inEvent(event, tooltipOption as any);
    });
  };

  const onFocusOut: NonNullable<
    TooltipDirectiveOption['onFocusOut']
  >['listener'] = function (event) {
    option.tooltips.forEach((tooltipOption) => {
      if (tooltipOption.displayOnFocus === false) {
        return;
      }

      outEvent(tooltipOption as any);
    });
  };

  const onMouseenterEventListener = setDefaultEventListener(
    onMouseEnter,
    option?.onMouseEnter?.listener as any
  );
  const onMouseleaveEventListener = setDefaultEventListener(
    onMouseLeave,
    option?.onMouseLeave?.listener as any
  );
  const onFocusinEventListener = setDefaultEventListener(
    onFocusIn,
    option?.onFocusIn?.listener as any
  );
  const onFocusoutEventListener = setDefaultEventListener(
    onFocusOut,
    option?.onFocusOut?.listener as any
  );

  element.addEventListener(
    'mouseenter',
    onMouseenterEventListener as any,
    option?.onMouseEnter
      ?.addEventListenerOptions as ListenerObject<'mouseenter'>['addEventListenerOptions']
  );
  element.addEventListener(
    'mouseleave',
    onMouseleaveEventListener as any,
    option?.onMouseLeave
      ?.addEventListenerOptions as ListenerObject<'mouseleave'>['addEventListenerOptions']
  );
  element.addEventListener(
    'focusin',
    onFocusinEventListener as any,
    option?.onFocusIn
      ?.addEventListenerOptions as ListenerObject<'focusin'>['addEventListenerOptions']
  );
  element.addEventListener(
    'focusout',
    onFocusoutEventListener as any,
    option?.onFocusOut
      ?.addEventListenerOptions as ListenerObject<'focusout'>['addEventListenerOptions']
  );

  onCleanup(() => {
    element.removeEventListener(
      'mouseenter',
      onMouseenterEventListener as any,
      option?.onMouseEnter
        ?.addEventListenerOptions as ListenerObject<'mouseenter'>['removeEventListenerOptions']
    );
    element.removeEventListener(
      'mouseleave',
      onMouseleaveEventListener as any,
      option?.onMouseLeave
        ?.addEventListenerOptions as ListenerObject<'mouseleave'>['removeEventListenerOptions']
    );
    element.removeEventListener(
      'focusin',
      onFocusinEventListener as any,
      option?.onFocusIn
        ?.addEventListenerOptions as ListenerObject<'focusin'>['removeEventListenerOptions']
    );
    element.removeEventListener(
      'focusout',
      onFocusoutEventListener as any,
      option?.onFocusOut
        ?.addEventListenerOptions as ListenerObject<'focusout'>['removeEventListenerOptions']
    );
  });
}) as TooltipDirectiveFunction;
