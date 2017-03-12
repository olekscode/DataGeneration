"use strict";
// class CodeEdit extends HTMLElement {
//   constructor() {
//     super();
//     this._countryCode = null;
//   }
//
//   static get observedAttributes() { return ["country"]; }
//
//   attributeChangedCallback(name, oldValue, newValue) {
//     // name will always be "country" due to observedAttributes
//     this._countryCode = newValue;
//     this._updateRendering();
//   }
//   connectedCallback() {
//     this._updateRendering();
//   }
//
//   get country() {
//     return this._countryCode;
//   }
//   set country(v) {
//     this.setAttribute("country", v);
//   }
//
//   _updateRendering() {
//     // Left as an exercise for the reader. But, you'll probably want to
//     // check this.ownerDocument.defaultView to see if we've been
//     // inserted into a document with a browsing context, and avoid
//     // doing any work if not.
//   }
// }
//
// customElements.define('code-edit', CodeEdit);

class CustomProgressBar extends HTMLElement {
  constructor() {
      super();
      const shadowRoot = this.attachShadow({mode: 'closed'});
      shadowRoot.innerHTML = `
          <style>
              :host { display: inline-block; width: 5rem; height: 1rem; }
              .progress { display: inline-block; position: relative; border: solid 1px #000; padding: 1px; width: 100%; height: 100%; }
              .progress > .bar { background: #9cf; height: 100%; }
              .progress > .label { position: absolute; top: 0; left: 0; width: 100%;
                  text-align: center; font-size: 0.8rem; line-height: 1.1rem; }
          </style>
          <div class="progress" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
              <div class="bar" style="width: 0px;"></div>
              <div class="label">0%</div>
          </div>
      `;
      this._progressElement = shadowRoot.querySelector('.progress');
      this._label = shadowRoot.querySelector('.label');
      this._bar = shadowRoot.querySelector('.bar');
  }

  get progress() { return this._progressElement.getAttribute('aria-valuenow'); }
  set progress(newPercentage) {
      this._progressElement.setAttribute('aria-valuenow', newPercentage);
      this._label.textContent = newPercentage + '%';
      this._bar.style.width = newPercentage + '%';
  }
};
customElements.define('custom-progress-bar', CustomProgressBar);
