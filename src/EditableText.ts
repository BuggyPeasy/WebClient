class EditableText extends HTMLElement {
  static CHILD_NOT_FOUND_ERROR =
    'child element not found in editable-text element';

  get is_editing(): boolean {
    return false;
  }

  get text(): string {
    return '';
  }

  save(): void {}

  cancel(): void {}
}

customElements.define('editable-text', EditableText);

declare global {
  interface HTMLElementTagNameMap {
    'editable-text': EditableText;
  }
}

export default EditableText;
