class AnswerForm extends HTMLElement {
  static FORM_NOT_FOUND_ERROR = 'Form element not found';
  static INPUT_NOT_FOUND_ERROR = 'Input element not found';
  static HTML = `
  <form>
    <fieldset>
      <legend>Put Your Answer Below ⬇️</legend>
      <input
        required
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
  }

  unrender(): void {
    this.innerHTML = '';
  }

  submit(): void {
    if (this.#form == null) throw new Error(AnswerForm.FORM_NOT_FOUND_ERROR);

    const input = this.#form.querySelector('input');
    if (input == null) throw new Error(AnswerForm.INPUT_NOT_FOUND_ERROR);

    // validate input value
    if (input.value === '') return;

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
