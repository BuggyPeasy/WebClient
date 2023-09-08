class SearchBar extends HTMLElement {
  submit(): void {}
}

customElements.define('answer-form', SearchBar);

declare global {
  interface HTMLElementTagNameMap {
    'search-bar': SearchBar;
  }
}

export default SearchBar;