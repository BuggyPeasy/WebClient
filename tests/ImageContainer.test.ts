/// <reference lib="dom" />

import { describe, it, expect, beforeEach, afterEach, mock } from 'bun:test';

import ImageContainer from '../src/ImageContainer';

describe.skip('ImageContainer Component', () => {
  let img: HTMLImageElement;
  let image_container: ImageContainer;

  beforeEach(() => {
    image_container = document.createElement('image-container');

    img = document.createElement('img');
    img.setAttribute('slot', 'image');

    image_container.appendChild(img);
    document.body.appendChild(image_container);
  });

  afterEach(() => {
    document.body.removeChild(image_container);
  });

  it('should initialize everything correctly', () => {
    expect(image_container).toBeTruthy();
    expect(image_container.shadowRoot).toBeTruthy();
  });

  it('should throw an error if the slot is not an img element', () => {
    const p = document.createElement('p');
    const test = document.createElement('image-container');

    test.appendChild(p);

    const cb = (): void => {
      document.body.appendChild(test);
    };

    expect(cb).toThrow(ImageContainer.SLOT_ELEMENT_ERROR);
    test.remove();
  });

  it('should not render if not connected to the DOM', () => {
    const test = document.createElement('image-container');
    const slot = test.querySelector('slot');
    expect(slot).not.toBeTruthy();
  });

  it('should not attach shadowRoot if not connected to the DOM', () => {
    const test = document.createElement('image-container');
    expect(test.shadowRoot).not.toBeTruthy();
  });

  it('should invoke click event when the user clicks on it', () => {
    const clickHander = mock(e => e.preventDefault());

    image_container.addEventListener('click', clickHander);

    image_container.click();

    expect(clickHander).toHaveBeenCalled();
  });

  it('should enter full-screen mode when the user clicks on the image container or the image', () => {
    image_container.click();
    expect(document.fullscreenElement).toBeTruthy();
  });

  it('should throw an error when click() is called but it is not connected to the DOM', () => {
    const test = document.createElement('image-container');

    const cb = (): void => {
      test.click();
    };

    expect(cb).toThrow(ImageContainer.IMG_NOT_FOUND_ERROR);
  });
});
