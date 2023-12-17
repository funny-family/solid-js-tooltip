import { type JSX } from 'solid-js';
import type { NonEmpty } from '../types';

export type TooltipPosition =
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

type TooltipOption<TElement = HTMLElement> = {
  /**
   * @description
   * Element used as a tooltip.
   */
  element: TElement;
  /**
   * @description
   * Tooltip position.
   */
  position?: TooltipPosition;
  /**
   * @description
   * Controls whether a tooltip is displayed when hovering over an element.
   */
  displayOnHover?: boolean;
  /**
   * @description
   * Controls whether a tooltip is displayed when focusing over an element.
   */
  displayOnFocus?: boolean;
};

type TooltipableEventCallback<
  TEventName extends keyof GlobalEventHandlersEventMap
> = (this: HTMLElement, event: HTMLElementEventMap[TEventName]) => void;

export type TooltipDirectiveOption<TElement = JSX.Element> = {
  /**
   * @description
   * Array of options for tooltip.
   */
  tooltips: NonEmpty<TooltipOption<TElement>[]>;
  /**
   * @description
   * Event that occurs when the mouse pointer enters an element.
   */
  onMouseenter?: TooltipableEventCallback<'mouseenter'>;
  /**
   * @description
   * Event that occurs when the mouse pointer leaves an element.
   */
  onMouseleave?: TooltipableEventCallback<'mouseleave'>;
  /**
   * @description
   * Event that occurs when an element gets focus.
   */
  onFocusin?: TooltipableEventCallback<'focusin'>;
  /**
   * @description
   * Event that occurs when an element loses focus.
   */
  onFocusout?: TooltipableEventCallback<'focusout'>;
};

export type TooltipDirective = {
  /**
   * @example
   * <p
   *  use:tooltip={{
   *    tooltips: [
   *      {
   *        element: (
   *          <div class="tooltip">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, ut?</div>
   *        ),
   *      }
   *    ],
   * }}
   * >
   *   Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores a
   *   amet alias temporibus quas molestiae doloribus non maxime maiores
   *   laudantium.
   * </p>
   */
  tooltip: TooltipDirectiveOption;
};

export type TooltipDirectiveAccessorArg = Omit<
  TooltipDirectiveOption,
  'tooltips'
> & {
  tooltips: TooltipOption<HTMLElement | (() => HTMLElement)>[];
};

export type TooltipDirectiveFunction = (
  element: HTMLElement,
  accessor: () => TooltipDirectiveAccessorArg
) => void;
