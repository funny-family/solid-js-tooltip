import { type JSX } from 'solid-js';
import './native-tooltip.styles.css';

const tooltipStyle: JSX.CSSProperties = {
  'background-color': 'bisque',
  'padding': '0.4em',
  'border-radius': '0.4rem',
  'color': 'black',
  'width': 'max-content',
};

export const NativeTooltips = () => {
  return (
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
            'border': '2px solid brown',
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam ad
          dignissimos, iure doloribus inventore porro aperiam sequi voluptates.
          Exercitationem, hic!
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
            'border': '2px solid brown',
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam ad
          dignissimos, iure doloribus inventore porro aperiam sequi voluptates.
          Exercitationem, hic!
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
            'border': '2px solid brown',
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam ad
          dignissimos, iure doloribus inventore porro aperiam sequi voluptates.
          Exercitationem, hic!
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
            'border': '2px solid brown',
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam ad
          dignissimos, iure doloribus inventore porro aperiam sequi voluptates.
          Exercitationem, hic!
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
            'border': '2px solid brown',
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam ad
          dignissimos, iure doloribus inventore porro aperiam sequi voluptates.
          Exercitationem, hic!
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
            'border': '2px solid brown',
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam ad
          dignissimos, iure doloribus inventore porro aperiam sequi voluptates.
          Exercitationem, hic!
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
            'border': '2px solid brown',
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam ad
          dignissimos, iure doloribus inventore porro aperiam sequi voluptates.
          Exercitationem, hic!
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
            'border': '2px solid brown',
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam ad
          dignissimos, iure doloribus inventore porro aperiam sequi voluptates.
          Exercitationem, hic!
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
        <h1>bottom-right-corner</h1>
        <a
          class="tooltipable tooltipable_bottom-right-corner"
          href="#bottom-right-corner"
          style={{
            'display': 'block',
            'max-width': '300px',
            'border': '2px solid brown',
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam ad
          dignissimos, iure doloribus inventore porro aperiam sequi voluptates.
          Exercitationem, hic!
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
        <h1>bottom-right</h1>
        <a
          class="tooltipable tooltipable_bottom-right"
          href="#bottom-right"
          style={{
            'display': 'block',
            'max-width': '300px',
            'border': '2px solid brown',
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam ad
          dignissimos, iure doloribus inventore porro aperiam sequi voluptates.
          Exercitationem, hic!
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
        <h1>bottom-center</h1>
        <a
          class="tooltipable tooltipable_bottom-center"
          href="#bottom-center"
          style={{
            'display': 'block',
            'max-width': '300px',
            'border': '2px solid brown',
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam ad
          dignissimos, iure doloribus inventore porro aperiam sequi voluptates.
          Exercitationem, hic!
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
            'border': '2px solid brown',
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam ad
          dignissimos, iure doloribus inventore porro aperiam sequi voluptates.
          Exercitationem, hic!
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
            'border': '2px solid brown',
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam ad
          dignissimos, iure doloribus inventore porro aperiam sequi voluptates.
          Exercitationem, hic!
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
        <h1>left-bottom</h1>
        <a
          class="tooltipable tooltipable_left-bottom"
          href="#left-bottom"
          style={{
            'display': 'block',
            'max-width': '300px',
            'border': '2px solid brown',
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam ad
          dignissimos, iure doloribus inventore porro aperiam sequi voluptates.
          Exercitationem, hic!
          <div
            class="native-tooltip native-tooltip_left-bottom"
            style={{
              ...tooltipStyle,
              'margin-right': '0.4em',
            }}
          >
            Native tooltip! (left-bottom)
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
            'border': '2px solid brown',
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam ad
          dignissimos, iure doloribus inventore porro aperiam sequi voluptates.
          Exercitationem, hic!
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

      <br />

      <section style={{ 'border': '2px solid red', 'margin-block': '6em' }}>
        <h1>left-top</h1>
        <a
          class="tooltipable tooltipable_left-top"
          href="#left-top"
          style={{
            'display': 'block',
            'max-width': '300px',
            'border': '2px solid brown',
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam ad
          dignissimos, iure doloribus inventore porro aperiam sequi voluptates.
          Exercitationem, hic!
          <div
            class="native-tooltip native-tooltip_left-top"
            style={{
              ...tooltipStyle,
              'margin-right': '0.4em',
            }}
          >
            Native tooltip! (left-top)
          </div>
        </a>
      </section>
    </section>
  );
};
