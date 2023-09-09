class AnswerForm extends HTMLElement {
  submit(): void {}
}

customElements.define('answer-form', AnswerForm);

declare global {
  interface HTMLElementTagNameMap {
    'answer-form': AnswerForm;
  }
}

export default AnswerForm;
