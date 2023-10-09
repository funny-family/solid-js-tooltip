import { onCleanup } from 'solid-js';
import { type TooltipDirective } from './tooltip.types';

const tooltipContainer = document.createElement('div');
// tooltipContainer.setAttribute('id', 'solid-js-tooltips');
tooltipContainer.classList.add('solid-js-tooltips');
document.body.appendChild(tooltipContainer);

const debounce = <TCallback extends (...args: any[]) => any>(
  callback: TCallback,
  ms: number
) => {
  let timerID: number | null = null;

  return function (this: any, ...args: any[]) {
    if (timerID == null) {
      callback.apply(this, args);
    }

    window.clearTimeout(timerID as number);
    timerID = window.setTimeout(() => callback.apply(this, args), ms);
    // return timerID;
  };
};

export const tooltip: TooltipDirective = (element, accessor) => {
  const accessorValue = accessor();

  console.group();
  console.log('arguments:', { element, accessor });
  console.log('v:', { element, accessor, accessorValue });
  console.groupEnd();

  accessorValue.element.classList.add('solid-js-tooltip');

  const onMouseenter = function (this: HTMLElement, event: MouseEvent) {
    console.log('onMouseenter:', event);

    const parentElRect = element.getBoundingClientRect();
    const parentElComputedStyle = getComputedStyle(element);

    accessorValue.element.style.setProperty(
      '--tooltip-parent-position-y',
      `${parentElRect.top}px`
    );
    accessorValue.element.style.setProperty(
      '--tooltip-parent-position-x',
      `${parentElRect.left}px`
    );

    accessorValue.element.style.setProperty(
      '--tooltip-parent-width',
      parentElComputedStyle.width
    );
    accessorValue.element.style.setProperty(
      '--tooltip-parent-height',
      parentElComputedStyle.height
    );

    accessorValue.element.style.setProperty(
      '--tooltip-parent-margin-top',
      parentElComputedStyle.marginTop
    );
    accessorValue.element.style.setProperty(
      '--tooltip-parent-margin-right',
      parentElComputedStyle.marginRight
    );
    accessorValue.element.style.setProperty(
      '--tooltip-parent-margin-bottom',
      parentElComputedStyle.marginBottom
    );
    accessorValue.element.style.setProperty(
      '--tooltip-parent-margin-left',
      parentElComputedStyle.marginLeft
    );

    // element.parentElement?.appendChild(accessorValue.element);
    tooltipContainer?.appendChild(accessorValue.element);

    if (accessorValue.option?.onMouseenter != null) {
      accessorValue.option.onMouseenter.call(this, event);
    }
  };

  const onMouseleave = function (this: HTMLElement, event: MouseEvent) {
    console.log('onMouseleave:', event);

    tooltipContainer?.removeChild(accessorValue.element);

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
