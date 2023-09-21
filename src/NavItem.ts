class NavItem extends HTMLElement {
  static LI_NOT_FOUND_ERR = 'Li Not Found';

  click(): void{}
}

customElements.define('nav-item', NavItem);

declare global {
  interface HTMLElementTagNameMap {
    'nav-item': NavItem;
  }
}

export default NavItem;
