class SearchBar extends HTMLElement {
  submit (): void {}
}

customElements.define('search-bar', SearchBar);

declare global {
  interface HTMLElementTagNameMap {
    'search-bar': SearchBar
  }
}

export default SearchBar;
