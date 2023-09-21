/// <reference lib="dom" />

import { describe, expect, beforeEach, afterEach, it, mock } from 'bun:test';

import EditableText from '../src/EditableText';

describe.skip('EditableText', () => {
  const newText = 'new text';

  let input: HTMLInputElement;
  let editable_text: EditableText;

  beforeEach(() => {
    editable_text = document.createElement('editable-text');
    document.body.appendChild(editable_text);

    if (editable_text === null) return;
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
    const label = test.querySelector('label');
    expect(label).not.toBeTruthy();
  });

  it('should invoke save event when the save() is called when connected to the DOM', () => {
    expect(editable_text).toBeTruthy();
    expect(editable_text.is_editing).toBeFalse();

    const saveHandler = mock(e => e.preventDefault());
    editable_text.addEventListener('save', saveHandler);

    editable_text.click();

    expect(editable_text.is_editing).toBeTrue();

    input.value = newText;

    editable_text.save();

    expect(saveHandler).toHaveBeenCalled();
  });

  it('should exit input mode when the save() is called when connected to the DOM', () => {
    expect(editable_text).toBeTruthy();
    expect(editable_text.is_editing).toBeFalse();

    const saveHandler = mock(e => e.preventDefault());
    editable_text.addEventListener('save', saveHandler);

    editable_text.click();

    expect(editable_text.is_editing).toBeTrue();

    input.value = newText;

    editable_text.save();

    expect(editable_text.is_editing).toBeFalse();
  });

  it('should not invoke save event when the user clicks on the save button but not enter anything', () => {
    expect(editable_text).toBeTruthy();
    expect(editable_text.is_editing).toBeFalse();

    const saveHandler = mock(e => e.preventDefault());
    editable_text.addEventListener('save', saveHandler);

    editable_text.click();

    expect(editable_text.is_editing).toBeTrue();

    input.value = '';

    editable_text.save();

    expect(saveHandler).not.toHaveBeenCalled();
  });

  it('should throw an error when save() is called but it is not connected to the DOM', () => {
    const test = document.createElement('editable-text');

    const cb = (): void => {
      test.save();
    };

    expect(cb).toThrow(EditableText.CHILD_NOT_FOUND_ERROR);

    test.remove();
  });

  it('should invoke cancel event when the cancel() is called when connected to the DOM', () => {
    expect(editable_text).toBeTruthy();
    expect(editable_text.is_editing).toBeFalse();

    const cancelHandler = mock(e => e.preventDefault());
    editable_text.addEventListener('cancel', cancelHandler);

    editable_text.click();

    expect(editable_text.is_editing).toBeTrue();

    input.value = newText;

    editable_text.cancel();

    expect(cancelHandler).toHaveBeenCalled();
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
});
