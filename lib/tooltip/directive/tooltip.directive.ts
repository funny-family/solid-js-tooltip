import { onCleanup, children } from 'solid-js';
import type {
  ListenerObject,
  TooltipDirectiveAccessorArg,
  TooltipDirectiveFunction,
  TooltipDirectiveOption,
} from './tooltip.directive.types';
import type { DeepRequired } from '../../types';
import {
  createDefaultTooltipOption,
  setDefaultEventListener,
  setTooltipPosition,
  unwrapElement,
} from './utils';

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

  var inEvent = <TEvent extends Event>(
    event: TEvent,
    option: Required<
      ReturnType<Parameters<TooltipDirectiveFunction>[1]>['tooltips'][0]
    >
  ) => {
    const tooltip = unwrapElement(option.element);

    setTooltipPosition(tooltip, option.position, event.target as HTMLElement);

    document.body.appendChild(tooltip);
  };

  var outEvent = <TEvent extends Event>(
    event: TEvent,
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
  >['listener'] = function (event) {
    option.tooltips.forEach((tooltipOption) => {
      if (tooltipOption.displayOnHover === false) {
        return;
      }

      outEvent(event, tooltipOption as any);
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

      outEvent(event, tooltipOption as any);
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
