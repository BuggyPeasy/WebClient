class ImageContainer extends HTMLElement {
  static IMG_NOT_FOUND_ERROR = 'Image element not found';
  static SHADOW_ROOT_NOT_FOUND_ERROR = 'Shadow Root not found';
  static SLOT_ELEMENT_ERROR = '<slot> with image name must be an img element';

  HTML = `
  <div>
    <slot name="image">Something went wrong</slot>
  </div>
  `;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  get #img() {
    if (this.shadowRoot === null)
      throw new Error(ImageContainer.SHADOW_ROOT_NOT_FOUND_ERROR);

    const img = this.querySelector('[slot="image"]');
    if (img === null) throw new Error(ImageContainer.IMG_NOT_FOUND_ERROR);

    if (!(img instanceof HTMLImageElement))
      throw new Error(ImageContainer.SLOT_ELEMENT_ERROR);

    return img;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    if (this.shadowRoot === null)
      throw new Error(ImageContainer.SHADOW_ROOT_NOT_FOUND_ERROR);

    this.shadowRoot.innerHTML = this.HTML;

    this.#img.addEventListener('click', this.clickHandler);
  }

  clickHandler(e: Event) {
    if (e.target === null || !(e.target instanceof HTMLImageElement)) return;

    if (!document.fullscreenElement) e.target.requestFullscreen();
  }

  click() {
    this.#img.click();
  }
}

customElements.define('image-container', ImageContainer);

declare global {
  interface HTMLElementTagNameMap {
    'image-container': ImageContainer;
  }
}

export default ImageContainer;
