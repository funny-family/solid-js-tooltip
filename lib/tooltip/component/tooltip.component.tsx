import type { TooltipComponent } from './tooltip.component.types';
import './tooltip.styles.css';

export const Tooltip: TooltipComponent = (attrs) => {
  const labelName = 'tooltip' as const;

  return (
    <div
      {...attrs}
      data-tooltip-sr-notification={
        attrs?.['data-tooltip-sr-notification'] || '; Has tooltip: '
      }
      class={`${attrs?.class || ''} solid-js-tooltip`}
      role={attrs?.role || labelName}
      aria-labelledby={attrs?.['aria-labelledby'] || labelName}
      tabIndex={attrs?.tabIndex || -1}
      aria-hidden={attrs?.['aria-hidden'] == null ? true : attrs['aria-hidden']}
      inert={attrs?.inert == null ? true : attrs.inert}
    />
  );
};
