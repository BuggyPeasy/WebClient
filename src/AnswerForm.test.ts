import AnswerForm from './AnswerForm';

describe('AnswerForm', () => {
  const answerInputName = 'user-answer';
  const answerInputValue = 'answer';

  let form: HTMLFormElement;
  let answerForm: AnswerForm;
  let input: HTMLInputElement;
  let button: HTMLButtonElement;

  beforeEach(() => {
    answerForm = document.createElement('answer-form');
    document.body.append(answerForm);

    expect(answerForm).toBeTruthy();
    if (answerForm == null) return; // TODO: research this

    const _form = answerForm.querySelector('form');
    if (_form != null) form = _form;
    expect(form).toBeTruthy();

    const _button = answerForm.querySelector('button');
    if (_button != null) button = _button;
    expect(button).toBeTruthy();

    const _input = answerForm.querySelector('input');
    if (_input != null) input = _input;
    expect(input).toBeTruthy();
  });

  afterEach(() => {
    document.body.removeChild(answerForm);
  });

  it('should initialize correctly', () => {
    expect(answerForm).toBeTruthy();
  });

  it('should add event listeners correctly', () => {
    const test = document.createElement('answer-form');
    document.body.appendChild(test);

    test.handleSubmit = jest.fn();
    test.addEventListeners();
    test.submit();

    expect(test.handleSubmit).toHaveBeenCalled();

    test.remove();
  });

  it('should throw an error if calling addEventListeners when not connected to DOM', () => {
    const test = document.createElement('answer-form');

    const cb = (): void => {
      test.addEventListeners();
    };

    expect(cb).toThrow(AnswerForm.FORM_NOT_FOUND_ERROR);

    test.remove();
  });

  it('should remove event listeners correctly', () => {
    const test = document.createElement('answer-form');
    document.body.appendChild(test);

    test.handleSubmit = jest.fn();
    test.addEventListeners();
    test.submit();

    expect(test.handleSubmit).toHaveBeenCalled();

    test.remove();
  });

  it('should throw an error if calling removeEventListeners when not connected to DOM', () => {
    const test = document.createElement('answer-form');

    const cb = (): void => {
      test.removeEventListeners();
    };

    expect(cb).toThrow(AnswerForm.FORM_NOT_FOUND_ERROR);

    test.remove();
  });

  it('should handle submit event', () => {
    expect(answerForm).toBeTruthy();

    const submitHandler = jest.fn();
    answerForm.addEventListener('submit', submitHandler);

    answerForm.submit();

    expect(submitHandler).toHaveBeenCalled();
  });

  it('should throw an error if calling submit when not connected to DOM', () => {
    const test = document.createElement('answer-form');

    const cb = (): void => {
      test.submit();
    };

    expect(cb).toThrow(AnswerForm.FORM_NOT_FOUND_ERROR);

    test.remove();
  });

  it('should handle submit event if the button is clicked', () => {
    expect(button).toBeTruthy();

    const submitHandler = jest.fn();
    answerForm.addEventListener('submit', submitHandler);

    button.click();

    expect(submitHandler).toHaveBeenCalled();
  });

  it('should read the answer the user enters when form is submitted', () => {
    expect(input).toBeTruthy();
    expect(answerForm).toBeTruthy();

    input.value = answerInputValue;

    answerForm.submit();

    const formData = new FormData(form);

    expect(formData.get(answerInputName)).toEqual(answerInputValue);
  });

  it('should read the answer the user enters when button is clicked', () => {
    expect(input).toBeTruthy();
    expect(button).toBeTruthy();
    expect(answerForm).toBeTruthy();

    input.value = answerInputValue;

    button.click();

    const formData = new FormData(form);

    expect(formData.get(answerInputName)).toEqual(answerInputValue);
  });
});
