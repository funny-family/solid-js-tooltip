<p>
  <img width="100%" src="https://assets.solidjs.com/banner?type=solid-js-tooltip&background=tiles&project=%20" alt="solid-js-tooltip">
</p>

# solid-js-tooltip

[![pnpm](https://img.shields.io/badge/maintained%20with-pnpm-cc00ff.svg?style=for-the-badge&logo=pnpm)](https://pnpm.io/)

<img width="100%" src="./public/tooltip-position.png" alt="Tooltip position explain.">

## Quick start

### Installation:

```bash
npm i solid-js-tooltip
# or
yarn solid-js-tooltip
# or
pnpm add solid-js-tooltip
```

### [Demo here!](111)

---

### Setup:

```ts
import { type TooltipDirective, tooltip } from 'solid-js-tooltip';
import 'solid-js-tooltip/styles.css';

// https://github.com/solidjs/solid/discussions/845
tooltip;

declare module 'solid-js' {
  namespace JSX {
    interface Directives extends TooltipDirective {}
  }
}
```

### Examples:

```tsx
import { tooltip, Tooltip } from 'solid-js-tooltip';

...

<p
  use:tooltip={{
    tooltips: [
      {
        element: (
          <Tooltip class="tooltip">
            Is this lorem?
          </Tooltip>
        ),
      },
    ],
  }}
  tabIndex={0}
>
  Maecenas blandit arcu eget rutrum sodales. Vestibulum tempor mi nec metus
  elementum fermentum. Aenean a gravida justo, nec pharetra massa.
</p>
```

```tsx
import { tooltip, Tooltip } from 'solid-js-tooltip';

...

<p
  use:tooltip={{
    tooltips: [
      {
        element: (
          <Tooltip class="tooltip">
            What...
          </Tooltip>
        ),
        position: 'top-center',
      },
      {
        element: (
          <Tooltip class="tooltip">
            is ... this...
          </Tooltip>
        ),
        position: 'right-center',
      },
    ],
  }}
  tabIndex={0}
>
  Etiam dictum eleifend justo, sit amet porttitor lectus ullamcorper eget. Morbi
  aliquet, nibh non porta euismod, metus est tincidunt ex, id vehicula massa
  metus id arcu. Nunc quis tincidunt metus, eu dapibus ligula.
</p>
```

```tsx
import { tooltip, Tooltip } from 'solid-js-tooltip';

...

<p
  class="highlight-text"
  use:tooltip={{
    tooltips: [
      {
        element: (
          <Tooltip class="tooltip">
            Hey! I am describing something...
          </Tooltip>
        ),
        displayOnHover: false,
      },
    ],
    onFocusin: (event) => {
      console.log('"focusin" event:"', event);
    },
  }}
  tabIndex={0}
>
  Maecenas blandit arcu eget rutrum sodales. Vestibulum tempor mi nec metus
  elementum fermentum. Aenean a gravida justo, nec pharetra massa.
</p>
```

```tsx
import { type TooltipComponent, Tooltip as BaseTooltip } from 'solid-js-tooltip';
import 'styles.css';

// You can use "Tooltip" component as base for your custom tooltip.
export const Tooltip: TooltipComponent = (props) => {
  return (
    <BaseTooltip {...props} class={`${props?.class || ''} tooltip`}>
      <div>
        <div>
          ...
        </div>
      </div>
    </BaseTooltip>
  )
};

...

import { tooltip } from 'solid-js-tooltip';
import { Tooltip } from './custom-tooltip-component-from-somewhere';

<p
  use:tooltip={{
    tooltips: [
      {
        element: (
          <Tooltip>
            Hey! I am describing something...
          </Tooltip>
        ),
        displayOnHover: false,
      },
    ],
    onFocusin: (event) => {
      console.log('"focusin" event:"', event);
    },
  }}
  tabIndex={0}
>
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, suscipit?
</p>
```

### Directive API:

1

### Directive options:

- `tooltips`: Required. Array of options for tooltip:
  - `element`: Required. Element used as a tooltip.
  - `position`: Optional. Tooltip position. Available positions: `top-left-corner`, `top-left`,
    `top-center`, `top-right`, `top-right-corner`, `right-top`, `right-center`, `right-bottom`, `bottom-right-corner`, `bottom-right`, `bottom-center`, `bottom-left`, `bottom-left-corner`, `left-bottom`, `left-center`, `left-top`.
  - `displayOnHover`: Optional. Controls whether a tooltip is displayed when hovering over an element.
  - `displayOnFocus`: Optional. Controls whether a tooltip is displayed when focusing over an element.
- `onMouseEnter`: Optional. Event that occurs when the mouse pointer enters an element.
  - 1
  - 1
  - 2
- `onMouseLeave`: Optional. Event that occurs when the mouse pointer leaves an element.
- `onFocusIn`: Optional. Event that occurs when an element gets focus.
- `onFocusOut`: Optional. Event that occurs when an element loses focus.

### Component props:
The `Tooltip` component has all the same attributes and events as the `HTMLDivElement`.
