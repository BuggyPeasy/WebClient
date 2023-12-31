class SearchBar extends HTMLElement {
  static FORM_NOT_FOUND_ERROR = 'Form Not Found';
  static INPUT_NOT_FOUND_ERROR = 'Input Not Found';
  static HTML = `
  <form>
    <input
      required
      type="text"
      id="user-search"
      name="user-search"
      value=""
      placeholder="Search"
    />
  </form>
  `;

  connectedCallback(): void {
    this.render();
  }

  disconnectedCallback(): void {
    this.unrender();
  }

  render(): void {
    this.innerHTML = SearchBar.HTML;
  }

  unrender(): void {
    this.innerHTML = '';
  }

  submit(): void {
    if (this.#form == null) throw new Error(SearchBar.FORM_NOT_FOUND_ERROR);

    const input = this.#form.querySelector('input');
    if (input == null) throw new Error(SearchBar.INPUT_NOT_FOUND_ERROR);

    // validate input value
    if (input.value === '') return;

    this.#form.submit();
  }

  get #form(): HTMLFormElement | null {
    return this.querySelector('form');
  }
}

customElements.define('search-bar', SearchBar);

declare global {
  interface HTMLElementTagNameMap {
    'search-bar': SearchBar;
  }
}

export default SearchBar;
