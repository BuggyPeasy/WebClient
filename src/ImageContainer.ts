class ImageContainer extends HTMLElement {
  static IMG_NOT_FOUND_ERROR = 'Image element not found';
  static SLOT_ELEMENT_ERROR = '<slot> with image name must be an img element';

  connectedCallback() {}
}

customElements.define('image-container', ImageContainer);

declare global {
  interface HTMLElementTagNameMap {
    'image-container': ImageContainer;
  }
}

export default ImageContainer;
