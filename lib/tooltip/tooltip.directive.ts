import { onCleanup } from 'solid-js';
import type {
  TooltipDirectiveOption,
  TooltipDirective,
  TooltipDirectiveAccessor,
} from './tooltip.types';

const tooltipsContainer = document.createElement('div');
tooltipsContainer.classList.add('solid-js-tooltips');
document.body.appendChild(tooltipsContainer);

var tooltipSharedZIndex = 1;

export const tooltip: TooltipDirective = (element, accessor) => {
  const accessorValue = accessor() as Required<
    ReturnType<TooltipDirectiveAccessor>
  >;

  const _keepVisibleWhenHover = accessorValue?.option?.keepVisibleWhenHover;
  const _displayOnMouseenter = accessorValue?.option?.displayOnMouseenter;
  const _displayOnFocus = accessorValue?.option?.displayOnFocus;
  const _position = accessorValue?.option?.position;
  const _cacheRender = accessorValue?.option?.cacheRender;
  const _onMouseenter = accessorValue?.option?.onMouseenter;
  const _onMouseleave = accessorValue?.option?.onMouseleave;

  (accessorValue.option as TooltipDirectiveOption) = {
    keepVisibleWhenHover:
      _keepVisibleWhenHover == null ? true : _keepVisibleWhenHover,
    displayOnMouseenter:
      _displayOnMouseenter == null ? true : _displayOnMouseenter,
    displayOnFocus: _displayOnFocus == null ? true : _displayOnFocus,
    cacheRender: _cacheRender == null ? false : _cacheRender,
    position: _position == null ? 'top-center' : _position,
    onMouseenter: _onMouseenter == null ? null : _onMouseenter,
    onMouseleave: _onMouseleave == null ? null : _onMouseenter,
  } as TooltipDirectiveOption;

  accessorValue.element.classList.add('solid-js-tooltip');
  accessorValue.element.setAttribute('role', 'tooltip');
  accessorValue.element.setAttribute('aria-labelledby', 'tooltip');
  accessorValue.element.setAttribute('inert', '');
  accessorValue.element.setAttribute('tabindex', '-1');
  accessorValue.element.style.zIndex = `${tooltipSharedZIndex}`;
  tooltipSharedZIndex += 1;

  // const getElementBoundingClientRect = <TElement extends HTMLElement>(
  //   element: TElement
  // ) => {
  //   return {
  //     top: element.offsetTop + element.scrollTop + element.clientTop,
  //     left: element.offsetLeft + element.scrollLeft + element.clientLeft,
  //   };
  // };

  // let parentRect: DOMRect;
  let parentStyle: CSSStyleDeclaration;

  const onMouseenter = function (this: HTMLElement, event: MouseEvent) {
    const parentRect = element.getBoundingClientRect();
    parentStyle = getComputedStyle(element);

    // const tooltipRect = accessorValue.element.getBoundingClientRect();

    console.log({
      // tooltipRect,
      parentRect,
      that: this,
      event,
      e: this.getBoundingClientRect(),
      tltsize: {
        width: accessorValue.element.offsetWidth,
        height: accessorValue.element.offsetHeight,
      },
    });

    // console.group();
    // console.log('arguments:', { element, accessor });
    // console.log('v:', {
    //   element,
    //   accessor,
    //   accessorValue,
    //   tooltipElement: accessorValue.element,
    //   parentStyle,
    //   tooltipStyle,
    //   parentRect,
    // });
    // console.groupEnd();

    console.log(parentRect);

    if (accessorValue.option.position === 'top-center') {
      accessorValue.element.style.top = `${parentRect.top}px`;
      accessorValue.element.style.left = `${parentRect.left}px`;
      accessorValue.element.style.transform = `translate(calc((${parentRect.width}px / 2) - 50%), 0)`;
    }

    if (accessorValue.option.position === 'right-center') {
      //
    }

    if (accessorValue.option.position === 'bottom-center') {
      accessorValue.element.style.top = `${parentRect.top}px`;
      accessorValue.element.style.left = `${parentRect.left}px`;
      accessorValue.element.style.transform = `translate(calc((${parentRect.width}px / 2) - 50%), calc(${parentRect.height}px + 100%))`;
    }

    if (accessorValue.option.position === 'left-center') {
      accessorValue.element.style.top = `${parentRect.top}px`;
      accessorValue.element.style.left = `${
        parentRect.left + parentRect.width
      }px`;
      accessorValue.element.style.transform = `translate(0, calc(${parentRect.width}px / 2))`;
      // accessorValue.element.style.transform = `translate(calc((${parentRect.width}px / 2) - 50%), ${parentRect.height}px)`;
    }

    tooltipsContainer?.appendChild(accessorValue.element);

    if (accessorValue.option?.onMouseenter != null) {
      accessorValue.option.onMouseenter.call(this, event);
    }
  };

  const onMouseleave = function (this: HTMLElement, event: MouseEvent) {
    // console.log({ that: this, event });
    // console.log('onMouseleave:', event);

    // tooltipsContainer?.removeChild(tooltipWrapper);

    if (accessorValue.option?.onMouseleave != null) {
      accessorValue.option.onMouseleave.call(this, event);
    }
  };

  // debounce(onMouseleave, 2000)

  element.addEventListener('mouseenter', onMouseenter);
  element.addEventListener('mouseleave', onMouseleave);

  onCleanup(() => {
    element.removeEventListener('mouseenter', onMouseenter);
    element.removeEventListener('mouseleave', onMouseleave);
  });
};
