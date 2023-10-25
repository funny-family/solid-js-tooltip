import { type Component, type JSX } from 'solid-js';
import {
  type TooltipDirective,
  type TooltipDirectiveDeclaration,
  // tooltip as __tooltip,
  tooltip,
} from './solid-js-tooltip';
import './solid-js-tooltip/styles.css';
import './app.styles.css';
import './native-tooltip.styles.css';

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
  'background-color': 'bisque',
  'padding': '0.4em',
  'border-radius': '0.4rem',
  'color': 'black',
  'width': 'max-content',
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
                <div style={{ ...tooltipStyle, width: '150px' }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
                  est magnam aliquid at cumque ipsam architecto cupiditate eum
                  consequatur quam.
                </div>
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

      <section
        style={{
          'position': 'relative',
          'max-width': '900px',
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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut similique
          dolores eveniet consequatur! Minima ipsum dolorem unde, distinctio
          sint vero perspiciatis mollitia tempora rem repellendus? Fugiat
          possimus eaque minima optio.
        </p>
      </section>

      <section
        style={{
          'max-width': '400px',
        }}
        use:tooltip={{
          element: (
            <div>
              <div style={{ ...tooltipStyle }}>Left centered tooltip!</div>
            </div>
          ),
          option: {
            position: 'left-center',
          },
        }}
      >
        <h1>Example 5 (Tooltip has "left-center" position.)</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam ad
          dignissimos, iure doloribus inventore porro aperiam sequi voluptates.
          Exercitationem, hic!
        </p>
      </section>

      <br />

      <section class="section-6">
        <h1>Native tooltips (CSS anchor positioning)</h1>

        <section style={{ 'border': '2px solid red', 'margin-block': '6em' }}>
          <h1>top-left-corner</h1>
          <a
            class="tooltipable tooltipable_top-left-corner"
            href="#top-left-corner"
            style={{
              'display': 'block',
              'max-width': '300px',
              'outline': '2px solid brown',
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam ad
            dignissimos, iure doloribus inventore porro aperiam sequi
            voluptates. Exercitationem, hic!
            <div
              class="native-tooltip native-tooltip_top-left-corner"
              style={{
                ...tooltipStyle,
              }}
            >
              Native tooltip! (top-left-corner)
            </div>
          </a>
        </section>

        <br />

        <section style={{ 'border': '2px solid red', 'margin-block': '6em' }}>
          <h1>top-left</h1>
          <a
            class="tooltipable tooltipable_top-left"
            href="#top-left"
            style={{
              'display': 'block',
              'max-width': '300px',
              'outline': '2px solid brown',
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam ad
            dignissimos, iure doloribus inventore porro aperiam sequi
            voluptates. Exercitationem, hic!
            <div
              class="native-tooltip native-tooltip_top-left"
              style={{
                ...tooltipStyle,
              }}
            >
              Native tooltip! (top-left)
            </div>
          </a>
        </section>

        <br />

        <section style={{ 'border': '2px solid red', 'margin-block': '6em' }}>
          <h1>top-center</h1>
          <a
            class="tooltipable tooltipable_top-center"
            href="#top-center"
            style={{
              'display': 'block',
              'max-width': '300px',
              'outline': '2px solid brown',
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam ad
            dignissimos, iure doloribus inventore porro aperiam sequi
            voluptates. Exercitationem, hic!
            <div
              class="native-tooltip native-tooltip_top-center"
              style={{
                ...tooltipStyle,
              }}
            >
              Native tooltip! (top-center)
              <br />
              1
              <br />
              1
              <br />1
            </div>
          </a>
        </section>

        <br />

        <section style={{ 'border': '2px solid red', 'margin-block': '6em' }}>
          <h1>top-right</h1>
          <a
            class="tooltipable tooltipable_top-right"
            href="#top-right"
            style={{
              'display': 'block',
              'max-width': '300px',
              'outline': '2px solid brown',
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam ad
            dignissimos, iure doloribus inventore porro aperiam sequi
            voluptates. Exercitationem, hic!
            <div
              class="native-tooltip native-tooltip_top-right"
              style={{
                ...tooltipStyle,
              }}
            >
              Native tooltip! (top-right)
            </div>
          </a>
        </section>

        <br />

        <section style={{ 'border': '2px solid red', 'margin-block': '6em' }}>
          <h1>top-right-corner</h1>
          <a
            class="tooltipable tooltipable_top-right-corner"
            href="#top-right-corner"
            style={{
              'display': 'block',
              'max-width': '300px',
              'outline': '2px solid brown',
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam ad
            dignissimos, iure doloribus inventore porro aperiam sequi
            voluptates. Exercitationem, hic!
            <div
              class="native-tooltip native-tooltip_top-right-corner"
              style={{
                ...tooltipStyle,
              }}
            >
              Native tooltip! (top-right-corner)
            </div>
          </a>
        </section>

        <br />

        <section style={{ 'border': '2px solid red', 'margin-block': '6em' }}>
          <h1>right-top</h1>
          <a
            class="tooltipable tooltipable_right-top"
            href="#right-top"
            style={{
              'display': 'block',
              'max-width': '300px',
              'outline': '2px solid brown',
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam ad
            dignissimos, iure doloribus inventore porro aperiam sequi
            voluptates. Exercitationem, hic!
            <div
              class="native-tooltip native-tooltip_right-top"
              style={{
                ...tooltipStyle,
                'margin-left': '0.4em',
              }}
            >
              Native tooltip! (right-top)
            </div>
          </a>
        </section>

        <br />

        <section style={{ 'border': '2px solid red', 'margin-block': '6em' }}>
          <h1>right-center</h1>
          <a
            class="tooltipable tooltipable_right-center"
            href="#right-center"
            style={{
              'display': 'block',
              'max-width': '300px',
              'outline': '2px solid brown',
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam ad
            dignissimos, iure doloribus inventore porro aperiam sequi
            voluptates. Exercitationem, hic!
            <div
              class="native-tooltip native-tooltip_right-center"
              style={{
                ...tooltipStyle,
                'margin-left': '0.4em',
              }}
            >
              Native tooltip! (right-center)
            </div>
          </a>
        </section>

        <br />

        <section style={{ 'border': '2px solid red', 'margin-block': '6em' }}>
          <h1>right-bottom</h1>
          <a
            class="tooltipable tooltipable_right-bottom"
            href="#right-bottom"
            style={{
              'display': 'block',
              'max-width': '300px',
              'outline': '2px solid brown',
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam ad
            dignissimos, iure doloribus inventore porro aperiam sequi
            voluptates. Exercitationem, hic!
            <div
              class="native-tooltip native-tooltip_right-bottom"
              style={{
                ...tooltipStyle,
                'margin-left': '0.4em',
              }}
            >
              Native tooltip! (right-bottom)
            </div>
          </a>
        </section>

        <br />

        <section style={{ 'border': '2px solid red', 'margin-block': '6em' }}>
          <h1>bottom-right</h1>
          <a
            class="tooltipable tooltipable_bottom-right"
            href="#bottom-right"
            style={{
              'display': 'block',
              'max-width': '300px',
              'outline': '2px solid brown',
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam ad
            dignissimos, iure doloribus inventore porro aperiam sequi
            voluptates. Exercitationem, hic!
            <div
              class="native-tooltip native-tooltip_bottom-right"
              style={{
                ...tooltipStyle,
              }}
            >
              Native tooltip! (bottom-right)
            </div>
          </a>
        </section>

        <br />

        <section style={{ 'border': '2px solid red', 'margin-block': '6em' }}>
          <h1>bottom-right-corner</h1>
          <a
            class="tooltipable tooltipable_bottom-right-corner"
            href="#bottom-right-corner"
            style={{
              'display': 'block',
              'max-width': '300px',
              'outline': '2px solid brown',
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam ad
            dignissimos, iure doloribus inventore porro aperiam sequi
            voluptates. Exercitationem, hic!
            <div
              class="native-tooltip native-tooltip_bottom-right-corner"
              style={{
                ...tooltipStyle,
              }}
            >
              Native tooltip! (bottom-right-corner)
            </div>
          </a>
        </section>

        <br />

        <section style={{ 'border': '2px solid red', 'margin-block': '6em' }}>
          <h1>bottom-center</h1>
          <a
            class="tooltipable tooltipable_bottom-center"
            href="#bottom-center"
            style={{
              'display': 'block',
              'max-width': '300px',
              'outline': '2px solid brown',
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam ad
            dignissimos, iure doloribus inventore porro aperiam sequi
            voluptates. Exercitationem, hic!
            <div
              class="native-tooltip native-tooltip_bottom-center"
              style={{
                ...tooltipStyle,
                'margin-top': '0.4em',
              }}
            >
              Native tooltip! (bottom-center)
            </div>
          </a>
        </section>

        <br />

        <section style={{ 'border': '2px solid red', 'margin-block': '6em' }}>
          <h1>bottom-left</h1>
          <a
            class="tooltipable tooltipable_bottom-left"
            href="#bottom-left"
            style={{
              'display': 'block',
              'max-width': '300px',
              'outline': '2px solid brown',
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam ad
            dignissimos, iure doloribus inventore porro aperiam sequi
            voluptates. Exercitationem, hic!
            <div
              class="native-tooltip native-tooltip_bottom-left"
              style={{
                ...tooltipStyle,
                'margin-top': '0.4em',
              }}
            >
              Native tooltip! (bottom-left)
            </div>
          </a>
        </section>

        <br />

        <section style={{ 'border': '2px solid red', 'margin-block': '6em' }}>
          <h1>bottom-left-corner</h1>
          <a
            class="tooltipable tooltipable_bottom-left-corner"
            href="#bottom-left-corner"
            style={{
              'display': 'block',
              'max-width': '300px',
              'outline': '2px solid brown',
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam ad
            dignissimos, iure doloribus inventore porro aperiam sequi
            voluptates. Exercitationem, hic!
            <div
              class="native-tooltip native-tooltip_bottom-left-corner"
              style={{
                ...tooltipStyle,
                'margin-top': '0.4em',
              }}
            >
              Native tooltip! (bottom-left-corner)
            </div>
          </a>
        </section>

        <br />

        <section style={{ 'border': '2px solid red', 'margin-block': '6em' }}>
          <h1>left-center</h1>
          <a
            class="tooltipable tooltipable_left-center"
            href="#left-center"
            style={{
              'display': 'block',
              'max-width': '300px',
              'outline': '2px solid brown',
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam ad
            dignissimos, iure doloribus inventore porro aperiam sequi
            voluptates. Exercitationem, hic!
            <div
              class="native-tooltip native-tooltip_left-center"
              style={{
                ...tooltipStyle,
                'margin-right': '0.4em',
              }}
            >
              Native tooltip! (left-center)
            </div>
          </a>
        </section>
      </section>
    </main>
  );
};
