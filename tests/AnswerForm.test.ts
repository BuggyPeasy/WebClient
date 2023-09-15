/// <reference lib="dom" />

import { describe, expect, beforeEach, afterEach, it, mock } from 'bun:test';

import AnswerForm from '../src/AnswerForm';

describe('AnswerForm', () => {
  const answerInputName = 'user-answer';
  const answerInputValue = 'answer';

  let form: HTMLFormElement;
  let answerForm: AnswerForm;
  let input: HTMLInputElement;
  let button: HTMLButtonElement;

  beforeEach(() => {
    answerForm = document.createElement('answer-form');
    document.body.appendChild(answerForm);

    if (answerForm == null) return; // TODO: research this

    const _form = answerForm.querySelector('form');
    if (_form != null) form = _form;
    form.submit = () => {
      form.dispatchEvent(new SubmitEvent('submit', { bubbles: true }));
    };

    const _button = answerForm.querySelector('button');
    if (_button != null) button = _button;

    const _input = answerForm.querySelector('input');
    if (_input != null) input = _input;
  });

  afterEach(() => {
    document.body.removeChild(answerForm);
  });

  it('should initialize correctly', () => {
    expect(answerForm).toBeTruthy();
  });

  it('should call submit event handler', () => {
    expect(answerForm).toBeTruthy();

    const submitHandler = mock(e => e.preventDefault());
    answerForm.addEventListener('submit', submitHandler);

    input.value = answerInputValue;
    answerForm.submit();

    expect(submitHandler).toHaveBeenCalled();
  });

  it('should not call the submit event handler if user inputs nothing', () => {
    expect(answerForm).toBeTruthy();

    const submitHandler = mock(e => e.preventDefault());
    answerForm.addEventListener('submit', submitHandler);

    input.value = '';
    answerForm.submit();

    expect(submitHandler).not.toHaveBeenCalled();
  });

  it('should read the answer the user enters when form is submitted', done => {
    expect(input).toBeTruthy();
    expect(answerForm).toBeTruthy();

    input.value = answerInputValue;

    answerForm.addEventListener('submit', e => {
      e.preventDefault();
      const formData = new window.FormData(form);
      expect(formData.get(answerInputName)).toEqual(answerInputValue);
      done();
    });

    answerForm.submit();
  });

  it('should throw an error if calling submit when not connected to DOM', () => {
    const test = document.createElement('answer-form');

    const cb = (): void => {
      test.submit();
    };

    expect(cb).toThrow(AnswerForm.FORM_NOT_FOUND_ERROR);

    test.remove();
  });

  it('should not call the submit event handler if input element is not in DOM', () => {
    const test = document.createElement('answer-form');
    document.body.appendChild(test);

    const input = test.querySelector('input');
    if (input != null) input?.remove();

    const cb = (): void => {
      test.submit();
    };

    expect(cb).toThrow(AnswerForm.INPUT_NOT_FOUND_ERROR);

    test.remove();
  });

  it('should call submit event handler if the button is clicked', () => {
    expect(button).toBeTruthy();

    const submitHandler = mock(e => e.preventDefault());
    answerForm.addEventListener('submit', submitHandler);

    input.value = 'hello';
    button.click();

    expect(submitHandler).toHaveBeenCalled();
  });

  it('should read the answer the user enters when button is clicked', done => {
    expect(input).toBeTruthy();
    expect(button).toBeTruthy();
    expect(answerForm).toBeTruthy();

    input.value = answerInputValue;

    answerForm.addEventListener('submit', e => {
      e.preventDefault();
      const formData = new window.FormData(form);
      expect(formData.get(answerInputName)).toEqual(answerInputValue);
      done();
    });

    button.click();
  });
});
