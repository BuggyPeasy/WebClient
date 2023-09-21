/// <reference lib="dom" />

import { describe, expect, beforeEach, afterEach, it, mock } from 'bun:test';

import EditableText from '../src/EditableText';

describe('EditableText', () => {
  const newText = 'new text';

  let input: HTMLInputElement;
  let editable_text: EditableText;

  beforeEach(() => {
    editable_text = document.createElement('editable-text');
    document.body.appendChild(editable_text);

    if (editable_text === null) return;

    const _input = editable_text.querySelector('input');
    if (_input != null) input = _input;

    const form = editable_text.querySelector('form');
    if (form != null) {
      form.submit = () => {
        form.dispatchEvent(new SubmitEvent('submit', { bubbles: true }));
      };
    }
  });

  afterEach(() => {
    document.body.removeChild(editable_text);
  });

  it('should initialize successfully', () => {
    expect(editable_text).toBeTruthy();
    expect(editable_text.is_editing).toBeFalse();
  });

  it('should not render if not connected to the DOM', () => {
    const test = document.createElement('editable-text');
    const form = test.querySelector('form');
    expect(form).not.toBeTruthy();
  });

  it('should invoke submi event when the save() is called when connected to the DOM', () => {
    expect(editable_text).toBeTruthy();
    expect(editable_text.is_editing).toBeFalse();

    const submitHandler = mock(() => {});
    editable_text.addEventListener('submit', submitHandler);

    editable_text.click();

    expect(editable_text.is_editing).toBeTrue();

    input.value = newText;

    editable_text.save();

    expect(submitHandler).toHaveBeenCalled();
  });

  it('should exit input mode when the save() is called when connected to the DOM', () => {
    expect(editable_text).toBeTruthy();
    expect(editable_text.is_editing).toBeFalse();

    const submitHandler = mock(e => e.preventDefault());
    editable_text.addEventListener('submit', submitHandler);

    editable_text.click();

    expect(editable_text.is_editing).toBeTrue();

    input.value = newText;

    editable_text.save();

    expect(editable_text.is_editing).toBeFalse();
  });

  it('should not invoke submit event when the user clicks on the save button but not enter anything', () => {
    expect(editable_text).toBeTruthy();
    expect(editable_text.is_editing).toBeFalse();

    const submitHandler = mock(e => e.preventDefault());
    editable_text.addEventListener('submit', submitHandler);

    editable_text.click();

    expect(editable_text.is_editing).toBeTrue();

    input.value = '';

    editable_text.save();

    expect(submitHandler).not.toHaveBeenCalled();
  });

  it('should throw an error when save() is called but it is not connected to the DOM', () => {
    const test = document.createElement('editable-text');

    const cb = (): void => {
      test.save();
    };

    expect(cb).toThrow(EditableText.CHILD_NOT_FOUND_ERROR);

    test.remove();
  });

  it('should exit input mode when the cancel() is called when connected to the DOM', () => {
    expect(editable_text).toBeTruthy();
    expect(editable_text.is_editing).toBeFalse();

    const cancelHandler = mock(e => e.preventDefault());
    editable_text.addEventListener('cancel', cancelHandler);

    editable_text.click();

    expect(editable_text.is_editing).toBeTrue();

    input.value = newText;

    editable_text.cancel();

    expect(editable_text.is_editing).toBeFalse();
  });

  it('should throw an error when cancel() is called but it is not connected to the DOM', () => {
    const test = document.createElement('editable-text');

    const cb = (): void => {
      test.cancel();
    };

    expect(cb).toThrow(EditableText.CHILD_NOT_FOUND_ERROR);

    test.remove();
  });

  it('should enter the input mode when the user clicks on it if not in the input mode', () => {
    expect(editable_text).toBeTruthy();
    expect(editable_text.is_editing).toBeFalse();

    editable_text.click();

    expect(editable_text.is_editing).toBeTrue();
  });

  it('should not exit or enter the input mode when the user clicks on it if not in the input mode', () => {
    expect(editable_text).toBeTruthy();
    expect(editable_text.is_editing).toBeFalse();

    editable_text.enterEdit();

    expect(editable_text.is_editing).toBeTrue();

    editable_text.click();

    expect(editable_text.is_editing).toBeTrue();
  });
});
