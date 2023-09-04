import type AnswerForm from './AnswerForm';

import './AnswerForm';

describe('AnswerForm', () => {
  let form: HTMLFormElement;
  let answerForm: AnswerForm;
  let button: HTMLButtonElement;

  beforeEach(() => {
    answerForm = document.createElement('answer-form');
    form = answerForm.querySelector('form');
    button = answerForm.querySelector('button');
    document.body.append(answerForm);
  });

  afterEach(() => {
    document.body.removeChild(answerForm);
  });

  it('should initialize correctly', () => {
    expect(answerForm).toBeTruthy();
  });

  it('should handle submit event', done => {
    const submitHandler = jest.fn();

    answerForm.addEventListener('submit', submitHandler);

    answerForm.querySelector('form').submit();

    setTimeout(() => {
      expect(submitHandler).toHaveBeenCalled();
      done();
    });
  });

  it('should handle submit event if the button is clicked', done => {
    const submitHandler = jest.fn();

    answerForm.querySelector('button').click();

    setTimeout(() => {
      expect(submitHandler).toHaveBeenCalled();
      done();
    });
  });

  it('should read the answer the user enters when form is submitted', () => {
    answerForm.querySelector('input').value = 'answer';

    form.submit();

    const formData = new FormData(form);

    expect(formData.get('answer')).toEqual('answer');
  });

  it('should read the answer the user enters when button is clicked', () => {
    answerForm.querySelector('input').value = 'answer';

    button.click();

    const formData = new FormData(form);

    expect(formData.get('answer')).toEqual('answer');
  });
});
