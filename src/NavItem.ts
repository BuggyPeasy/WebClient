class NavItem extends HTMLElement {
  static NAV_ITEM_NOT_FOUND_ERR = 'Nav Item Not Found';
  static HTML = `
  <li>
    <a href=data.route>
      <i class=data.icon_class></i>
      <span>data.text</span>
    </a>
  </li>
  `;

  click(): void{}
}

customElements.define('nav-item', NavItem);

declare global {
  interface HTMLElementTagNameMap {
    'nav-item': NavItem;
  }
}

export default NavItem;
