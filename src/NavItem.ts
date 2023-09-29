class NavItem extends HTMLElement {
  static CHILD_NOT_FOUND_ERR = 'CHILD Not Found';

  static get observedAttributes() {
    return ['data-text', 'data-icon-class', ];
  }

  static HTML = `
  <li>
    <a>
      <i></i>
      <span></span>
    </a>
  </li>
  `;

  get #text(): string {
    return this.getAttribute('data-text') || '';
  }

  set #text(value: string) {
    this.setAttribute('data-text', value);
  }

  get #icon_class(): string {
    return this.getAttribute('data-icon-class') || '';
  }

  set #icon_class(value: string) {
    this.setAttribute('data-icon-class', value);
  }

  get #route(): string {
    return this.getAttribute('data-route') || '';
  }

  set #route(value: string) {
    this.setAttribute('data-route', value);
  }

  connectedCallback() {
    this.innerHTML = NavItem.HTML;

    this.render();

    this.addEventListeners();
  }

  render() {
    const li = this.querySelector('li');
    const i = this.querySelector('i');
    const a = this.querySelector('a');
    const span = this.querySelector('span');

    if (li == null || a == null || i == null || span == null)
      throw new Error(NavItem.CHILD_NOT_FOUND_ERR);

    li.style.display = 'block';

    a.href =  this.#route;
    i.className = this.#icon_class;
    i.style.display = 'block';
    span.textContent = this.#text;
    span.style.display = 'block';
  }

  addEventListeners() {

  }

  click(): void{
    
  }
}

customElements.define('nav-item', NavItem);

declare global {
  interface HTMLElementTagNameMap {
    'nav-item': NavItem;
  }
}

export default NavItem;
