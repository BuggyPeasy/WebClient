class AnswerForm extends HTMLElement {
  static FORM_NOT_FOUND_ERROR = 'Form element not found';
  static HTML = `
  <form>
    <fieldset>
      <legend>Put Your Answer Below ⬇️</legend>
      <input
        type="text"
        id="user-answer"
        name="user-answer"
        value=""
        placeholder="your answer 📝"
      />
      <button type="submit">
        <i class="fa-solid fa-check"></i>
      </button>
    </fieldset>
  </form>
  `;

  connectedCallback(): void {
    this.render();
  }

  disconnectedCallback(): void {
    this.unrender();
  }

  render(): void {
    this.innerHTML = AnswerForm.HTML;
    this.addEventListeners();
  }

  unrender(): void {
    this.removeEventListeners();
    this.innerHTML = '';
  }

  addEventListeners(): void {
    if (this.#form == null) throw new Error(AnswerForm.FORM_NOT_FOUND_ERROR);
    this.#form.addEventListener('submit', this.handleSubmit);
  }

  removeEventListeners(): void {
    if (this.#form == null) throw new Error(AnswerForm.FORM_NOT_FOUND_ERROR);
    this.#form.removeEventListener('submit', this.handleSubmit);
  }

  handleSubmit(e: Event): void {
    e.preventDefault();
    document.dispatchEvent(new Event('submit'));
  }

  submit(): void {
    if (this.#form == null) throw new Error(AnswerForm.FORM_NOT_FOUND_ERROR);
    this.#form.submit();
  }

  get #form(): HTMLFormElement | null {
    return this.querySelector('form');
  }
}

customElements.define('answer-form', AnswerForm);

declare global {
  interface HTMLElementTagNameMap {
    'answer-form': AnswerForm;
  }
}

export default AnswerForm;
