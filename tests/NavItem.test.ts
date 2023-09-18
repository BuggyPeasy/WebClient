/// <reference lib="dom" />

import { describe, expect, beforeEach, afterEach, it, mock } from 'bun:test';

import NavItem from '../src/NavItem';

describe.skip('NavItem', () => {

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
    const href = test.querySelector('a');
    expect(href).not.toBeTruthy();
  });

  it('should invoke click event when the user clicks on it', () => {
    const cb = mock(e => e.preventDefault());

    navItem.click();

    expect(cb).toHaveBeenCalled();
  });

  it('should throw an error if the user clicks and it is not connected to DOM', () => {
    const test = document.createElement('nav-item');

    const cb = (): void => {
      test.click();
    };

    expect(cb).toThrow(NavItem.NAV_ITEM_NOT_FOUND_ERR);
  });
});
