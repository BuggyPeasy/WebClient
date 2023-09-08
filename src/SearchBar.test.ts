import type SearchBar from './SearchBar';

import './SearchBar';

describe.skip('SearchBar Component', () => {

  const answerInputName = 'answer';
  const answerInputValue = 'answer';

  let form: HTMLFormElement;
  let searchBar: SearchBar;
  let input: HTMLInputElement;
  let button: HTMLButtonElement;

  beforeEach(() => {
    searchBar = document.createElement('search-bar');

    const _form = searchBar.querySelector('form');
    if (_form != null) form = _form;
    expect(form).toBeTruthy();

    const _button = searchBar.querySelector('button');
    if (_button != null) button = _button;
    expect(button).toBeTruthy();

    document.body.append(searchBar);
  });

  afterEach(() => {
    document.body.removeChild(searchBar);
  });

  it('should initialize correctly', () => {
    expect(searchBar).toBeTruthy();
  });

  it('should handle submit event', done => {
    expect(form).toBeTruthy();

    const submitHandler = jest.fn();
    searchBar.addEventListener('submit', submitHandler);

    form.submit();

    setTimeout(() => {
      expect(submitHandler).toHaveBeenCalled();
      done();
    });
  });

  it('should handle submit event if the button is clicked', done => {
    expect(button).toBeTruthy();

    const submitHandler = jest.fn();

    button.click();

    setTimeout(() => {
      expect(submitHandler).toHaveBeenCalled();
      done();
    });
  });

  it('should read the answer the user enters when form is submitted', () => {
    expect(form).toBeTruthy();
    expect(input).toBeTruthy();

    input.value = answerInputValue;

    form.submit();

    const formData = new FormData(form);

    expect(formData.get(answerInputName)).toEqual(answerInputValue);
  });

  it('should read the answer the user enters when button is clicked', () => {
    expect(form).toBeTruthy();
    expect(input).toBeTruthy();
    expect(button).toBeTruthy();

    input.value = answerInputValue;

    button.click();

    const formData = new FormData(form);

    expect(formData.get(answerInputName)).toEqual(answerInputValue);
  });

});


