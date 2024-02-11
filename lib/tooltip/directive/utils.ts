import type {
  ListenerCallback,
  TooltipOption,
  TooltipPosition,
} from './tooltip.directive.types';

var tooltipMarginX_CssVar = '--tooltip-margin-x' as const;
var tooltipMarginY_CssVar = '--tooltip-margin-y' as const;
var tooltipableWidth_CssVar = '--tooltipable-width' as const;
var tooltipableHeight_CssVar = '--tooltipable-height' as const;

export var unwrapElement = (element: HTMLElement | (() => HTMLElement)) => {
  return typeof element === 'function' ? element() : element;
};

export var setDefaultEventListener = <
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

export var createDefaultTooltipOption = (
  option: TooltipOption<HTMLElement>
) => {
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
export var createTranslate3dStyle: CreateTranslate3dStyle = (tx, ty) => {
  return `translate3d(${tx}, ${ty}, 0)`;
};

export var setTooltipPosition = (
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
      `calc(var(${tooltipableWidth_CssVar}) + var(${tooltipMarginX_CssVar}))`,
      `calc(var(${tooltipableHeight_CssVar}) - var(${tooltipMarginY_CssVar}))`
    );
  }

  if (position === 'bottom-right') {
    tooltip.style.transform = createTranslate3dStyle(
      `calc(-100% + var(${tooltipableWidth_CssVar}) + var(${tooltipMarginX_CssVar}))`,
      `calc(var(${tooltipableHeight_CssVar}) - var(${tooltipMarginY_CssVar}))`
    );
  }

  if (position === 'bottom-center') {
    tooltip.style.transform = createTranslate3dStyle(
      `calc(-50% + (var(${tooltipableWidth_CssVar}) / 2) + var(${tooltipMarginX_CssVar}))`,
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
      `calc(-100% + var(${tooltipMarginX_CssVar}))`,
      `calc(var(${tooltipableHeight_CssVar}) - var(${tooltipMarginY_CssVar}))`
    );
  }

  if (position === 'left-bottom') {
    tooltip.style.transform = createTranslate3dStyle(
      `calc(-100% + var(${tooltipMarginX_CssVar}))`,
      `calc((var(${tooltipableHeight_CssVar}) - 100%) - var(${tooltipMarginY_CssVar}))`
    );
  }

  if (position === 'left-center') {
    tooltip.style.transform = createTranslate3dStyle(
      `calc(-100% + var(${tooltipMarginX_CssVar}))`,
      `calc(-50% + (var(${tooltipableHeight_CssVar}) / 2) - var(${tooltipMarginY_CssVar}))`
    );
  }

  if (position === 'left-top') {
    tooltip.style.transform = createTranslate3dStyle(
      `calc(-100% + var(${tooltipMarginX_CssVar}))`,
      `calc(-1 * var(${tooltipMarginY_CssVar}))`
    );
  }
};
