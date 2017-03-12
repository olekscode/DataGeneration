// class CodeEdit extends HTMLElement {
//     constructor() {
//         console.log('Constructing CodeEdit');
//         super();
//         this.textContent = 'Lorem ipsum dolor sit amet';
//     }
// }

class HelloElement extends HTMLElement {
  // Monitor the 'name' attribute for changes.
  static get observedAttributes() {return ['name']; }

  // Respond to attribute changes.
  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr == 'name') {
      this.textContent = `Hello, ${newValue}`;
    }
  }
}

// Define the new element
customElements.define('hello-element', HelloElement);
