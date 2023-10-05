import type { Component } from 'solid-js';
import {
  type TooltipDirective,
  type TooltipDirectiveDeclaration,
  // tooltip as __tooltip,
  tooltip,
} from './solid-js-tooltip';
import './solid-js-tooltip/styles.css';
import './app.styles.css';

// https://github.com/solidjs/solid/discussions/845 (BE AWARE!!!)
// const tooltip = __tooltip;
tooltip;

declare module 'solid-js' {
  namespace JSX {
    interface Directives {
      // tooltip: TooltipDirective;
      // tooltip: [any, any];
    }

    interface Directives extends TooltipDirectiveDeclaration {}
  }
}

export const App: Component = () => {
  return (
    <main>
      <section style={{ margin: '0em' }}>
        <h1>Example 1</h1>
        <p
          // use:tooltip={() => {
          //   //
          // }}
          use:tooltip={{
            element: <div>Heeeeeey!</div>,
            option: {
              optionString: '',
              optionNumber: 69,
              optionFunction: () => {},
            },
          }}
          style={{
            display: 'inline-block',
          }}
        >
          <a href="#">This is playground (hover me)</a>
        </p>
      </section>
      <section style={{ margin: '0em' }}>
        <h1>Example 2</h1>
        <input
          type="text"
          placeholder="Type here..."
          use:tooltip={{
            element: <div>This is text input!</div>,
          }}
        />
      </section>
      <section
        style={{ margin: '0em' }}
        use:tooltip={{
          element: <div>This is text input!</div>,
        }}
      >
        <h1>Example 3</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut similique
          dolores eveniet consequatur! Minima ipsum dolorem unde, distinctio
          sint vero perspiciatis mollitia tempora rem repellendus? Fugiat
          possimus eaque minima optio.
        </p>
      </section>
    </main>
  );
};
