/// <reference lib="dom" />

import { describe, expect, beforeEach, afterEach, it, mock } from 'bun:test';

import NavItem from '../src/NavItem';

describe('NavItem', () => {

  let navItem: NavItem;

  beforeEach(() => {
    navItem = document.createElement('nav-item');
    document.body.appendChild(navItem);

    if (navItem == null) return;
  });

  afterEach(() => {
    document.body.removeChild(navItem);
  });

  it('should initialize correctly', () => {
    expect(navItem).toBeTruthy();
  });

  it('should not render if not connected to DOM', () => {
    const test = document.createElement('nav-item');
    const item = test.querySelector('li');
    expect(item).not.toBeTruthy();
  });

  it('should invoke click event when the user clicks on it and it is connected to DOM', () => {
    const clickHandler = mock(e => e.preventDefault());
    navItem.addEventListener('click', clickHandler);

    navItem.click();

    expect(clickHandler).toHaveBeenCalled();
  });

  it('should throw an error if the user clicks and it is not connected to DOM', () => {
    const test = document.createElement('nav-item');

    const cb = (): void => {
      test.click();
    };

    expect(cb).toThrow(NavItem.CHILD_NOT_FOUND_ERR);
  });
});
