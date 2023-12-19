import {
  type TooltipComponent,
  Tooltip as BaseTooltip,
} from '../../solid-js-tooltip';
import './tooltip.styles.css';

export const Tooltip: TooltipComponent = (attrsAndProps) => {
  return (
    <BaseTooltip
      {...attrsAndProps}
      class={`${attrsAndProps?.class || ''} tltp`}
    />
  );
};
