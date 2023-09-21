class EditableText extends HTMLElement {
  static CHILD_NOT_FOUND_ERROR =
    'child element not found in editable-text element';

  static HTML = `
    <p></p>
    <form>
      <input type="text" name="input" required/>
      <button>
        <i class="fa-solid fa-check"></i>
      </button>
      <button type="button">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </form>
  `;

  #mode: 'edit' | 'normal' = 'normal';

  get mode() {
    return this.#mode;
  }

  set mode(value: 'edit' | 'normal') {
    this.#mode = value;
    this.render();
  }

  get #text(): string {
    return this.getAttribute('data-text') || '';
  }

  get is_editing(): boolean {
    return this.mode == 'edit';
  }

  connectedCallback() {
    this.innerHTML = EditableText.HTML;

    this.render();

    this.addEventListeners();
  }

  render() {
    const p = this.querySelector('p');
    const form = this.querySelector('form');
    const input = this.querySelector('input');
    const cancel_btn = this.querySelector('button[type="button"]');

    if (p == null || form == null || cancel_btn == null || input == null)
      throw new Error(EditableText.CHILD_NOT_FOUND_ERROR);

    // markup
    p.textContent = this.#text;
    input.value = this.#text;

    // styling
    p.style.display = this.mode == 'edit' ? 'none' : 'block';
    form.style.display = this.mode == 'edit' ? 'block' : 'none';
  }

  addEventListeners() {
    const p = this.querySelector('p');
    const form = this.querySelector('form');
    const input = this.querySelector('input');
    const cancel_btn = this.querySelector('button[type="button"]');

    if (p == null || form == null || cancel_btn == null || input == null)
      throw new Error(EditableText.CHILD_NOT_FOUND_ERROR);

    const p_handler = () => this.enterEdit();
    const cancel_btn_handler = () => this.exitEdit();
    const form_handler = (e: SubmitEvent) => {
      e.preventDefault();
      this.exitEdit();
    };

    p.addEventListener('click', p_handler);
    form.addEventListener('submit', form_handler);
    cancel_btn.addEventListener('click', cancel_btn_handler);
  }

  enterEdit() {
    this.mode = 'edit';
  }

  exitEdit() {
    this.mode = 'normal';
  }

  click() {
    if (this.mode != 'normal') return;

    const p = this.querySelector('p');

    if (p == null) throw new Error(EditableText.CHILD_NOT_FOUND_ERROR);

    p.click();
  }

  save() {
    const form = this.querySelector('form');
    const input = this.querySelector('input');
    if (form == null || input == null)
      throw new Error(EditableText.CHILD_NOT_FOUND_ERROR);

    // check if in edit mode
    if (this.mode != 'edit') return;

    // validate input value
    if (input.value === '') return;

    form.submit();
  }

  cancel() {
    const cancel_btn = this.querySelector(
      'button[type="button"]'
    ) as HTMLButtonElement | null;

    if (cancel_btn == null) throw new Error(EditableText.CHILD_NOT_FOUND_ERROR);

    // check if in edit mode
    if (this.mode != 'edit') return;

    cancel_btn.click();
  }
}

customElements.define('editable-text', EditableText);

declare global {
  interface HTMLElementTagNameMap {
    'editable-text': EditableText;
  }
}

export default EditableText;
