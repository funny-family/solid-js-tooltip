import { type Component, type JSX } from 'solid-js';
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
    // interface Directives {
    //   // tooltip: TooltipDirective;
    //   // tooltip: [any, any];
    // }

    interface Directives extends TooltipDirectiveDeclaration {}
  }
}

const tooltipStyle: JSX.CSSProperties = {
  // 'display': 'inline-block',
  'background-color': 'bisque',
  'padding': '0.4em',
  'border-radius': '0.4rem',
};

export const App: Component = () => {
  return (
    <main>
      <section style={{ margin: '0em' }}>
        <h1>Example 1</h1>
        <p
          use:tooltip={{
            element: (
              <div>
                <div style={{ ...tooltipStyle }}>Heeeeeey!</div>
              </div>
            ),
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
            element: (
              <div>
                <div style={{ ...tooltipStyle }}>This is text input!</div>
              </div>
            ),
          }}
        />
      </section>
      <section
        style={{
          'max-width': '400px',
          'margin-block-start': '10em',
          'border': '1px solid green',
        }}
        use:tooltip={{
          element: (
            <div>
              <div
                style={{
                  ...tooltipStyle,
                }}
              >
                Example 3!
              </div>
            </div>
          ),
          option: {
            position: 'left-center',
            // keepVisibleWhenHover: false,
            onMouseenter: (event) => {
              // console.log(1111);
            },
            onMouseleave: (event) => {
              // console.log(2222);
            },
          },
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

      <div
        style={{
          'margin-block': '6em',
        }}
      >
        <section
          style={{
            position: 'relative',
          }}
        >
          <h1
            use:tooltip={{
              element: (
                <div>
                  <div style={{ ...tooltipStyle }}>
                    <p>This is tooltip!</p>
                    <form action="">
                      <input type="text" />
                      <button type="submit">submit</button>
                    </form>
                  </div>
                </div>
              ),
              option: {
                position: 'bottom-center',
              },
            }}
          >
            Example 4
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
            similique dolores eveniet consequatur! Minima ipsum dolorem unde,
            distinctio sint vero perspiciatis mollitia tempora rem repellendus?
            Fugiat possimus eaque minima optio.
          </p>
        </section>
      </div>
    </main>
  );
};
