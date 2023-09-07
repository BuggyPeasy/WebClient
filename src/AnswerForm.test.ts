import type AnswerForm from './AnswerForm';

import './AnswerForm';

describe.skip('AnswerForm', () => {
  let form: HTMLFormElement;
  let answerForm: AnswerForm;
  let button: HTMLButtonElement;
  let input: HTMLInputElement;

  beforeEach(() => {
    answerForm = document.createElement('answer-form');

    const _form = answerForm.querySelector('form');
    if (_form != null) form = _form;

    const _button = answerForm.querySelector('button');
    if (_button != null) button = _button;

    document.body.append(answerForm);
  });

  afterEach(() => {
    document.body.removeChild(answerForm);
  });

  it('should initialize correctly', () => {
    expect(answerForm).toBeTruthy();
  });

  it('should handle submit event', done => {
    if (form == null) return;

    const submitHandler = jest.fn();
    answerForm.addEventListener('submit', submitHandler);

    form.submit();

    setTimeout(() => {
      expect(submitHandler).toHaveBeenCalled();
      done();
    });
  });

  it('should handle submit event if the button is clicked', done => {
    if (button == null) return;

    const submitHandler = jest.fn();

    button.click();

    setTimeout(() => {
      expect(submitHandler).toHaveBeenCalled();
      done();
    });
  });

  it('should read the answer the user enters when form is submitted', () => {
    if (form == null) return;
    if (input == null) return;

    input.value = 'answer';

    form.submit();

    const formData = new FormData(form);

    expect(formData.get('answer')).toEqual('answer');
  });

  it('should read the answer the user enters when button is clicked', () => {
    if (form == null) return;
    if (input == null) return;
    if (button == null) return;

    input.value = 'answer';

    button.click();

    const formData = new FormData(form);

    expect(formData.get('answer')).toEqual('answer');
  });
});
